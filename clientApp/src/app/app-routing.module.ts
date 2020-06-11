import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticesComponent } from './ui-components/practices/practices.component';


const routes: Routes = [
  {path: '/practices', component: PracticesComponent},
  {path: '/practices', component: PracticesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
