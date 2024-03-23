import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightClickMenuComponent } from 'app/common/task/task-card/right-click-menu/right-click-menu.component';

describe('RightClickMenuComponent', () => {
  let component: RightClickMenuComponent;
  let fixture: ComponentFixture<RightClickMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightClickMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightClickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
