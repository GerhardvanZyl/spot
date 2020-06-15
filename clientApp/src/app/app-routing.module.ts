import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticesComponent } from './ui-components/practices/practices.component';
import { PracticeComponent } from './ui-components/practice/practice.component';


const routes: Routes = [
  {path: '', redirectTo: '/practices', pathMatch: 'full'},
  {path: 'practices', component: PracticesComponent},
  {path: 'practice', component: PracticeComponent},
  {path: 'practice/:id', component: PracticeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
