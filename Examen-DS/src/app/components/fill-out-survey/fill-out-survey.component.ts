import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fill-out-survey',
  templateUrl: './fill-out-survey.component.html',
  styleUrls: ['./fill-out-survey.component.scss']
})
export class FillOutSurveyComponent implements OnInit {

  
  public getPollIdVar: any;
  public idPoll: any;
  constructor(
    private fmBuilder: FormBuilder, 
    private resultService: ResultService,  
    private pollService: PollService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((dataRoute) => {
      this.idPoll = dataRoute.get('id');
    })
    this.serchPollAndAddInputs(this.idPoll);
  }

  fields: FormGroup = this.fmBuilder.group({
    fields: this.fmBuilder.array([], Validators.required)
  })

  createInput(){
    return this.fmBuilder.group({
      nameField: ['', Validators.required],
      titleField: ['', Validators.required],
      required: [Boolean, Validators.required],
      typeField: ['', Validators.required],
      responseText: [''],
      responseNumber: [0],
      responseDate: [Date]
    })
  }


  serchPollAndAddInputs(id: string){
    this.pollService.getPollId(id).subscribe(
      response =>{
        this.getPollIdVar = response;
        const fields = response.fields;
        const formArray = this.fields.get('fields') as FormArray;
        for (let i = 0; i < fields.length; i++) {
          formArray.push(this.createInput());
        }
  
        for (let i = 0; i < fields.length; i++) {
          const formGroup = formArray.controls[i] as FormGroup;
          formGroup.setValue({
            nameField: fields[i].nameField,
            titleField: fields[i].titleField,
            required: fields[i].required,
            typeField: fields[i].typeField,
            responseText: null,
            responseNumber: null,
            responseDate: null
          })
        }
      }
    )
  }

  getInputs() {
    return this.fields.get('fields') as FormArray;
  }

  verification(){
    let fields = this.fields.value.fields;
    var verification = 0;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].required === true) {
        if (fields[i].typeField === 'Numero') {
          if (fields[i].responseNumber === null) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Rellena los campos Requeridos',
              showConfirmButton: false,
              timer: 1500
            })
            verification = 1;
          }else{
            verification = 0;
          }
        }
        if (fields[i].typeField === 'Texto') {
          if (fields[i].responseText === null || fields[i].responseText === "") {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Rellena los campos Requeridos',
              showConfirmButton: false,
              timer: 1500
            })
            verification = 1;
          }else{
            verification = 0;
          }
        }
        if (fields[i].typeField === 'Fecha') {
          if (fields[i].responseDate === null) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Rellena los campos Requeridos',
              showConfirmButton: false,
              timer: 1500
            })
            verification = 1;
          }else{
            verification = 0;
          }
        }
      }
      
    }
    
    if (verification === 0) {
      this.addResult();
    }
  }
  
  addResult(){
    const field = {...this.fields.value};
    this.resultService.addResult(field, this.idPoll).subscribe(
      response =>{
        this.router.navigate(['/pageOfThanks']);
      }
    )
  }

}
