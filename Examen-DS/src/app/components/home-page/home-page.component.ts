import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PollService } from 'src/app/services/poll.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [UserService, PollService]
})
export class HomePageComponent implements OnInit {

  userLogged: any;
  showProfileModal: boolean = false;
  showCreatePoll: boolean = false;
  showLink: boolean = false;
  showViewPoll: boolean = false;
  showDeletePoll: boolean = false;
  public token: any = "";
  public getPollsUserVar: any;
  public getPollIdVar: any;
  public link = "";


  constructor(private userService: UserService, private router: Router, private pollService: PollService, private fmBuilder: FormBuilder) {
    this.userLogged = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.getPollsUser();
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  getPollsUser(){
    this.pollService.getPolls(this.token).subscribe(data =>{this.getPollsUserVar = data});
  }


  //ENCUESTAS//////////////////////////////////////////
  firstForm: FormGroup = this.fmBuilder.group({
    namePoll: ['',Validators.required],
    descriptionPoll: ['', Validators.required],
    idUser: ['', Validators.required]
  })
  fields: FormGroup = this.fmBuilder.group({
    fields: this.fmBuilder.array([], Validators.required)
  })


  createInput(){
    return this.fmBuilder.group({
      nameField: ['', Validators.required],
      titleField: ['', Validators.required],
      required: [Boolean, Validators.required],
      typeField: ['', Validators.required]
    })
  }

  addInput(){
    const formArray = this.fields.get('fields') as FormArray;
    if (formArray.controls.length === 0) return formArray.push(this.createInput());
    const lastFormGroup = formArray.controls[formArray.controls.length - 1] as FormGroup;
    if (lastFormGroup.valid) formArray.push(this.createInput());
    else this.fields.markAllAsTouched();
  }

  getInputs() {
    return this.fields.get('fields') as FormArray;
  }

  deleteInput(index: number) {
    const formArray = this.fields.get('fields') as FormArray;
    formArray.removeAt(index);
  }


  addField(){
    const field = { ...this.firstForm.value, ...this.fields.value};
    this.pollService.addPoll(field, this.token).subscribe(
      response =>{
        this.link = `http://localhost:4200/poll/${response.addPoll._id}`
        this.showLink = true;

        this.resetForms();
        this.showCreatePoll = false;
        this.getPollsUser(); 
      }
    )
  }

  getPollById(id: string){
    this.pollService.getPollId(id).subscribe(
      response =>{
        this.getPollIdVar = response;
      }
    )
  }


  deletePollId(id: string){
    this.pollService.deletePollId(id, this.token).subscribe(
      response=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Encuesta Eliminada',
          showConfirmButton: false,
          timer: 1500
        })
        this.showDeletePoll = false;
        this.getPollsUser();


      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo Eliminar la Encuesta',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }
/////////////////////////////////////////////////////////////
  

  copyLink(){
    Swal.fire({
      position: 'center',
      title: 'Link Copiado',
      showConfirmButton: false,
      timer: 1500
    })
  }

  resetForms(){
    this.firstForm.reset();
    this.fields.reset();
    const formArray = this.fields.get('fields') as FormArray;
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

}
