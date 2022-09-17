import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { InchargesComponent } from './incharges/incharges.component';
import { LoginComponent } from './login/login.component';
import { IsLoggedInGuard } from './services/is-logged-in.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: 'navbar', component: NavbarComponent},
  // { path: 'body', component: BodyComponent},
  // { path: '', component: HomeComponent,},
  { path: '', component: HomeComponent, canActivate:[IsLoggedInGuard]},
  { path: 'Phatak-Incharge', component: InchargesComponent, canActivate:[IsLoggedInGuard]},
  { path: 'Login', component: LoginComponent},
  { path: '**', component: Error404Component},   // If there is no routing url exists then it will redirect to the url you provide to error 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
