import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode/theme-mode-switcher/theme-mode-switcher.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from 'app/common/task/task';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NewListButtonComponent } from 'app/common/new-list-button/new-list-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GenericListHeaderComponent } from 'app/common/generics/generic-list/generic-list-header/generic-list-header.component';
import { ListIdsService } from 'app/common/generics/generic-list/list-ids-service/list-ids.service';
import { BacklogComponent } from 'app/main/backlog/backlog.component';
import { TaskPositionService } from 'app/common/task-list/task-position-service/task-position.service';
import { GenericListNameService } from 'app/common/generics/generic-list/generic-list-header/generic-list-name.service';

@Component({
  selector: 'generic-list',
  standalone: true,
  imports: [
    ListHeaderComponent,
    TaskListComponent,
    ThemeModeSwitcherComponent,
    FormsModule,
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    NewListButtonComponent,
    GenericListHeaderComponent,
    CdkDrag,
    BacklogComponent
  ],
  providers:[
    GenericListNameService
  ],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericList implements OnInit {

  listIDs!: Array<string>;

  listName!: string;

  id!: string;

  genericList: Array<Task> = [];

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly taskPositionService: TaskPositionService,
    private readonly listIDsService: ListIdsService,
    private readonly genericListNameService: GenericListNameService
  ) {
  }

  ngOnInit(): void {
    this.observeListIDs();
    this.observeListName();
  }

  taskDrop(event: CdkDragDrop<Task[]>): void {
    this.taskPositionService.drop(event);
  }

  observeListName(): void {
    this.genericListNameService.listName$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(listName => {
      this.listName = listName
      this.id = this.listIDsService.generateListID(this.listName);
    })
  }

  private observeListIDs() {
    this.listIDsService.getAllListID().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(listIDs => {
      this.listIDs = listIDs;
      this.changeDetectorRef.detectChanges();
    });
  }
}
