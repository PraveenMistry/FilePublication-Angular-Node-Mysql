import { LoginComponent } from './components/user/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from "./components/user/profile/profile.component";
import { FilesComponent } from "./components/user/files/files.component";
import { AddComponent } from "./components/user/files/add/add.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthGuard } from "./guards/auth.guard";
import { EditComponent } from './components/user/files/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'public/home', component: HomeComponent },
  { path: 'public/file/:name', component: ViewComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/files', component: FilesComponent, canActivate: [AuthGuard] },
  { path: 'user/file/add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'user/file/edit', component: EditComponent, canActivate: [AuthGuard] },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})], // inicializa el router e inicia este para que escuche cambios de ubicacion en el broswer
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
