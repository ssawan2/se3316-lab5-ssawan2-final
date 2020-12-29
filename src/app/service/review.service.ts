import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import {Review} from '../shared/services/review';
import {User} from '../shared/services/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private dbPath = '/review';

  reviewRef: AngularFireList<Review>;

  userId: string;
  constructor(private db: AngularFireDatabase, private afAuth:AngularFireAuth) { 
    this.reviewRef = db.list(this.dbPath);
  }
  createReview(review: Review): void {
    this.reviewRef.push(review);
  }

  updateReview(key: string, value:any): Promise<void>{
  return this.reviewRef.update(key,value);
  }
 
  getReviewList(): AngularFireList<Review> {
    return this.reviewRef;
  }
 


}
