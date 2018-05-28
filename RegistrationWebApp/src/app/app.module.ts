import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import {DatabaseService} from './services/database.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './services/app-routing.module';
import { AuthService } from './services/auth.service'
import { FormsModule, FormGroup,FormBuilder ,Validators,ReactiveFormsModule  } from '@angular/forms';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UploadFileService } from './services/upload-file.service';
import { ProjectUploadScreenComponent } from './project-upload-screen/project-upload-screen.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StepsBarComponent } from './steps-bar/steps-bar.component';
import { HeaderComponent } from './header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { MsgScreenComponent } from './msg-screen/msg-screen.component';
import { ProjectsUpdatePageComponent } from './projects-update-page/projects-update-page.component';
import { MessageService } from '../app/services/message.service';
import { TableComponent } from './table/table.component'
import { CheckersPageComponent } from './checkers-page/checkers-page.component';
import { ManagerHomePageComponent } from './manager-home-page/manager-home-page.component'


@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginScreenComponent,
    FooterComponent,
    UserHomePageComponent,
    ResetPasswordComponent,
    ProjectUploadScreenComponent,
    ContactUsComponent,
    StepsBarComponent,
    HeaderComponent,
    MsgScreenComponent,
    ProjectsUpdatePageComponent,
    TableComponent,
    CheckersPageComponent,
    ManagerHomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule, 
    AngularFireDatabaseModule,
    AppRoutingModule
    ],
  providers: [
    DatabaseService,
    AuthService,
    AuthGuardService,
    UploadFileService,
    CookieService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
