import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListComponent } from 'app/common/new-list/new-list.component';

describe('AddNewListButtonComponent', () => {
  let component: NewListComponent;
  let fixture: ComponentFixture<NewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
