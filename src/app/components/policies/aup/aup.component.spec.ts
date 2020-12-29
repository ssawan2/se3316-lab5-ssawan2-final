import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AupComponent } from './aup.component';

describe('AupComponent', () => {
  let component: AupComponent;
  let fixture: ComponentFixture<AupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
