import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAccessComponent } from './components/admin-access/admin-access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SearchComponent } from './components/search/search.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { TimetableCreateComponent } from './timetable/timetable-create/timetable-create.component';
import { TimetableListComponent } from './timetable/timetable-list/timetable-list.component';
import { TimetableComponent } from './timetable/timetable/timetable.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'search', component: SearchComponent},
  { path: 'admin', component: AdminAccessComponent},
  
  { path: 'timetable', component: TimetableComponent },
  
  { path: 'timetable/timetable-list', component: TimetableListComponent },
  { path: 'timetable/add', component: TimetableCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
