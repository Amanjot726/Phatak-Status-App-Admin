import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BodyComponent } from './body/body.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: 'navbar', component: NavbarComponent},
  // { path: 'body', component: BodyComponent},
  // { path: '', component: HomeComponent,},
  { path: '', component: HomeComponent,},
  { path: 'About', component: AboutComponent},
  { path: 'Contact', component: ContactComponent},
  // { path: '**', redirectTo: 'Error404'},   // If there is no routing url exists then it will redirect to the url you provide to error 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
