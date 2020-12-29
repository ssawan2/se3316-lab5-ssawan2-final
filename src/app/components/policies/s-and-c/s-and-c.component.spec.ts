import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAndCComponent } from './s-and-c.component';

describe('SAndCComponent', () => {
  let component: SAndCComponent;
  let fixture: ComponentFixture<SAndCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SAndCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SAndCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
