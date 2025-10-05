import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsChannelComponent } from './cards-channel.component';

describe('CardsChannelComponent', () => {
  let component: CardsChannelComponent;
  let fixture: ComponentFixture<CardsChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsChannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
