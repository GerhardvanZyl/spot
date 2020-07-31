import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticesComponent } from './ui-components/practices/practices.component';
import { PracticeComponent } from './ui-components/practice/practice.component';
import { LoginComponent } from './ui-components/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { DonorComponent } from './ui-components/donor/donor.component';
import { DonorsComponent } from './ui-components/donors/donors.component';

const routes: Routes = [
  {path: '', redirectTo: '/practices', pathMatch: 'full'},
  {path: 'practices', component: PracticesComponent, canActivate: [AuthGuard]},
  {path: 'practice', component: PracticeComponent, canActivate: [AuthGuard]},
  {path: 'practice/:id', component: PracticeComponent, canActivate: [AuthGuard]},
  {path: 'donors', component: DonorsComponent, canActivate: [AuthGuard]},
  {path: 'donor', component: DonorComponent, canActivate: [AuthGuard]},
  {path: 'donor/:id', component: DonorComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
