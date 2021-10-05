import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FillOutSurveyComponent } from './components/fill-out-survey/fill-out-survey.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  { path: 'homePage', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'poll/:id', component: FillOutSurveyComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
