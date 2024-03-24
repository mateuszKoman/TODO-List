import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListButtonComponent } from 'app/common/new-list-button/new-list-button.component';

describe('AddNewListButtonComponent', () => {
  let component: NewListButtonComponent;
  let fixture: ComponentFixture<NewListButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
