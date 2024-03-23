import { AfterViewInit, Component, ComponentFactoryResolver, HostListener, Input, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from 'app/common/task/task-card/task-card.component';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { Task } from 'app/common/task/task';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskStatus } from 'app/common/task/taskStatus';
import { RightClickMenuComponent } from 'app/common/task/task-card/right-click-menu/right-click-menu.component';
import { GenericList } from 'app/common/generic-list/generic-list.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent,
    DragDropModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnDestroy {
  // private overlayRef: OverlayRef | null = null;
  // private overlaySubscriptions: Subscription[] = [];

  @Input()
  listOfTasks: Task[] = [];

  isDarkMode: boolean = false;
  private themeSubscription: Subscription;
  protected readonly TaskStatus = TaskStatus;


  constructor(private themeService: ThemeService,
              private overlay: Overlay) {
    this.themeSubscription = this.themeService.isDarkMode()
                                 .subscribe((darkMode: boolean) => {
                                   this.isDarkMode = darkMode;
                                 });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


  // onRightClick(event: MouseEvent) {
  //   event.preventDefault();
  //   console.log("aaaaa")
  //   if (!this.overlayRef) {
  //     this.createOverlay();
  //   }
  //   this.positionOverlay(event);
  // }
  //
  // private createOverlay() {
  //   this.overlayRef = this.overlay.create({
  //     positionStrategy:
  //   });
  //   const portal = new ComponentPortal(RightClickMenuComponent);
  //   this.overlayRef.attach(portal);
  //   this.overlaySubscriptions.push(this.overlayRef.detachments().subscribe(() => this.overlayRef = null));
  // }
  //
  // private positionOverlay(event: MouseEvent) {
  //   if (this.overlayRef) {
  //     this.overlayRef.updatePosition();
  //     this.overlayRef.updateSize({width: '150px'});
  //   }
  // }
}
