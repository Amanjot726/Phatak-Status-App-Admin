import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { InchargesComponent } from './incharges/incharges.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: 'navbar', component: NavbarComponent},
  // { path: 'body', component: BodyComponent},
  // { path: '', component: HomeComponent,},
  { path: '', component: HomeComponent,},
  { path: 'Phatak-Incharge', component: InchargesComponent},
  // { path: '**', redirectTo: 'Error404'},   // If there is no routing url exists then it will redirect to the url you provide to error 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
