import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ReviewService } from 'src/app/service/review.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: any;

  constructor(public reviewService: ReviewService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getReviewList();
  }
  getReviewList(){
    this.reviewService.getReviewList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

}
