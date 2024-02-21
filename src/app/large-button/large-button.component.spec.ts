import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeButtonComponent } from './large-button.component';

describe('LargeButtonComponentComponent', () => {
  let component: LargeButtonComponent;
  let fixture: ComponentFixture<LargeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
