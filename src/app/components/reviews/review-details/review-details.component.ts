import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from 'src/app/service/review.service';
import { Review } from '../../../shared/services/review'; 

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css']
})
export class ReviewDetailsComponent implements OnInit {
  @Input() review: Review;
  constructor(public reviewService: ReviewService) { }

  ngOnInit(): void {
  }
  updateActive(isHidden: boolean) {
    this.reviewService
      .updateReview(this.review.key, { active: isHidden })
      .catch(err => console.log(err));
  }

}
