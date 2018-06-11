import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from '../login-screen/login-screen.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { UserHomePageComponent } from '../user-home-page/user-home-page.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { ProjectUploadScreenComponent } from '../project-upload-screen/project-upload-screen.component';
import { MsgScreenComponent } from '../msg-screen/msg-screen.component';
import { AuthGuardService } from './auth-guard.service'
import { ProjectsUpdatePageComponent } from '../projects-update-page/projects-update-page.component';
import { TableComponent } from '../table/table.component'
import { CheckersPageComponent } from '../checkers-page/checkers-page.component';
import { ManagerHomePageComponent } from '../manager-home-page/manager-home-page.component';
import { CompetitionSettingsPageComponent } from '../competition-settings-page/competition-settings-page.component';


//routing links to navigate through the web-app
const appRouets: Routes = [
  { path: '', redirectTo: '/loginScreen', pathMatch: 'full' },
  { path: 'loginScreen', component: LoginScreenComponent },
  { path: 'registrationForm', component: RegistrationFormComponent },
  { path: 'homepage', component: UserHomePageComponent/*, canActivate: [AuthGuardService]*/ }, //calling canActivate function from the AuthGuardService class to handle security
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'projectUpload', component: ProjectUploadScreenComponent },
  { path: 'msgpage', component: MsgScreenComponent },
  { path: 'viewproject', component: ProjectsUpdatePageComponent },
  { path: 'tablePage', component: TableComponent },
  { path: 'checker', component: CheckersPageComponent },
  { path: 'manager', component: ManagerHomePageComponent },
  { path: 'compsettings', component: CompetitionSettingsPageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRouets)],
  exports: [RouterModule]
})

export class AppRoutingModule { }