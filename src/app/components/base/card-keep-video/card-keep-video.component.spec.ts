import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardKeepVideoComponent } from './card-keep-video.component';

describe('CardKeepVideoComponent', () => {
  let component: CardKeepVideoComponent;
  let fixture: ComponentFixture<CardKeepVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardKeepVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardKeepVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
