import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import {
  ChangeHistoryStorageService
} from 'app/common/task/task-card/edit-task/edit-modal/edit-history/change-history-storage-service/change-history-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'edit-history',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './edit-history.component.html',
  styleUrl: './edit-history.component.css'
})
export class EditHistoryComponent implements OnInit {
  changesHistory: Array<Date> = [];

  constructor(private readonly changeHistoryStorageService: ChangeHistoryStorageService,
              private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit(){
        this.observeChangesHistory();
    }

  observeChangesHistory() {
    this.changeHistoryStorageService.getChangeHistory()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(changeHistory => {
        this.changesHistory = changeHistory;
    })
  }
}
