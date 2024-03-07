import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListHeaderComponent } from 'app/common/generic-list/generic-list-header/generic-list-header.component';

describe('GenericListHeaderComponent', () => {
  let component: GenericListHeaderComponent;
  let fixture: ComponentFixture<GenericListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericListHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
