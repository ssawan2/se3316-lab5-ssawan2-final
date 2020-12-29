import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from './service/auth.service';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminAccessComponent } from './components/admin-access/admin-access.component';
import { TimetableDetailsComponent } from './timetable/timetable-details/timetable-details.component';
import { TimetableListComponent } from './timetable/timetable-list/timetable-list.component';
import { TimetableCreateComponent } from './timetable/timetable-create/timetable-create.component';
import { TimetableComponent } from './timetable/timetable/timetable.component';
import { ReactiveFormsModule } from "@Angular/forms";
import { ReviewComponent } from './components/review/review.component';
import { ReviewCreateComponent } from './components/reviews/review-create/review-create.component';
import { ReviewDetailsComponent } from './components/reviews/review-details/review-details.component';
import { ReviewListComponent } from './components/reviews/review-list/review-list.component';
import { AupComponent } from './components/policies/aup/aup.component';
import { DmcaComponent } from './components/policies/dmca/dmca.component';
import { SAndCComponent } from './components/policies/s-and-c/s-and-c.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SearchComponent,
    AdminAccessComponent,
    TimetableDetailsComponent,
    TimetableListComponent,
    TimetableCreateComponent,
    TimetableComponent,
    ReviewComponent,
    ReviewCreateComponent,
    ReviewDetailsComponent,
    ReviewListComponent,
    AupComponent,
    DmcaComponent,
    SAndCComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
