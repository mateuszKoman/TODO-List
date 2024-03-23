import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode-switcher/theme-mode-switcher.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { Task } from 'app/common/task/task';
import { CdkDragDrop, CdkDragExit, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NewListComponent } from 'app/common/new-list/new-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GenericListHeaderComponent } from 'app/common/generic-list/generic-list-header/generic-list-header.component';

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
    NewListComponent,
    GenericListHeaderComponent
  ],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericList implements OnInit, OnDestroy {
  listName!: string;
  id!: string;
  isDarkMode: boolean = false;
  genericList!: Array<Task>;
  private ToDoListSubscription?: Subscription;

  constructor(private themeService: ThemeService,
              private destroyRef: DestroyRef
  ) {
  }

  ngOnInit(): void {
    this.observeThemeMode();
  }

  ngOnDestroy(): void {
    if (this.ToDoListSubscription) {
      this.ToDoListSubscription.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.genericList.push(event.item.data);
  }

  onListNameChange(newTitle: string) {
    this.listName = newTitle;
  }

  observeThemeMode(): void {
    this.themeService.isDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((isDarkModeON: boolean) => {
      this.isDarkMode = isDarkModeON;
    });
  }

  exitedTask($event: CdkDragExit<any>) {
    // this.genericList = this.genericList.filter(value => value.id !== $event.item.data.id)
  }
}
