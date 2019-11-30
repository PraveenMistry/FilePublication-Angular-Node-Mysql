import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/user/profile/profile.component';
import {Error401Intercepter} from "./services/error401/error401-intercepter";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FilesComponent } from './components/user/files/files.component';
import { AddComponent } from './components/user/files/add/add.component';
import { EditComponent } from './components/user/files/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';
import { AngularFileViewerModule } from '@taldor-ltd/angular-file-viewer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NotFoundComponent,
    FilesComponent,
    AddComponent,
    EditComponent,
    HomeComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFileViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Error401Intercepter,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
