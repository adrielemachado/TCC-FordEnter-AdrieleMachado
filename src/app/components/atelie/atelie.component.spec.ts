import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelieComponent } from './atelie.component';

describe('AtelieComponent', () => {
  let component: AtelieComponent;
  let fixture: ComponentFixture<AtelieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtelieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtelieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
