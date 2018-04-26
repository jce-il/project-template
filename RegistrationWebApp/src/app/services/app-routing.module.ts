import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from '../login-screen/login-screen.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { UserHomePageComponent } from '../user-home-page/user-home-page.component';


const appRouets: Routes= [
  { path:'', redirectTo:'/loginScreen', pathMatch:'full'},
  { path:'loginScreen', component: LoginScreenComponent},
  { path:'registrationForm', component:RegistrationFormComponent},
  { path:'homepage', component:UserHomePageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRouets)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}