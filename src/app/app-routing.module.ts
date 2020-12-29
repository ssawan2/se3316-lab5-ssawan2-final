import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAccessComponent } from './components/admin-access/admin-access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AupComponent } from './components/policies/aup/aup.component';
import { DmcaComponent } from './components/policies/dmca/dmca.component';
import { SAndCComponent } from './components/policies/s-and-c/s-and-c.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewCreateComponent } from './components/reviews/review-create/review-create.component';
import { ReviewListComponent } from './components/reviews/review-list/review-list.component';
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
  { path: 'add', component: TimetableCreateComponent },
  { path: 'timetable-list', component: TimetableListComponent },
  { path: 'timetable/timetable-list', component: TimetableListComponent },
  { path: 'timetable/add', component: TimetableCreateComponent },

  { path: 'review', component: ReviewComponent },
  { path: 'addReview', component: ReviewCreateComponent },
  { path: 'review-list', component: ReviewListComponent },
  { path: 'review/review-list', component: ReviewListComponent },
  { path: 'review/addReview', component: ReviewCreateComponent },

  { path: 'aup', component:AupComponent},
  { path: 'dmca', component:DmcaComponent},
  { path: 's-and-c', component:SAndCComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
