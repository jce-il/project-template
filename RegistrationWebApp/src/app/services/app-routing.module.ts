import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from '../login-screen/login-screen.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { UserHomePageComponent } from '../user-home-page/user-home-page.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component'
import { AuthGuardService } from './auth-guard.service'
//routing links to navigate through the web-app
const appRouets: Routes = [
  { path: '', redirectTo: '/loginScreen', pathMatch: 'full' },
  { path: 'loginScreen', component: LoginScreenComponent },
  { path: 'registrationForm', component: RegistrationFormComponent },
  { path: 'homepage', component: UserHomePageComponent },//calling canActivate function from the AuthGuardService class to handle security
  { path: 'resetPassword', component: ResetPasswordComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRouets)],
  exports: [RouterModule]
})

export class AppRoutingModule { }