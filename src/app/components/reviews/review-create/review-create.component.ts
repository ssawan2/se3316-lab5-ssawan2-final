import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../../../service/review.service'
import {AuthService} from '../../../service/auth.service';
import {Review} from '../../../shared/services/review';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {

  constructor(private reviewService: ReviewService, public authService: AuthService) { }
  review: Review = new Review();
  submitted = false;
  ngOnInit(): void {
  }
  newReview(): void {
    this.submitted = false;
    this.review = new Review();
  }
  sanitization(value) {

    value = value.replace(/[&<>"'/*@?]/gi, "");

    return value
  }
  save() {
    this.review.uid = this.authService.userData.uid;
    this.reviewService.createReview(this.review);
    this.review = new Review();
  }
  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
