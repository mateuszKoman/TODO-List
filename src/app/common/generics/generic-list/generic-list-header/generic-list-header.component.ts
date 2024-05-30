import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ListIDsServiceService } from 'app/common/generics/generic-list/list-ids-service/list-ids-service.service';

@Component({
  selector: 'generic-list-header',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './generic-list-header.component.html'
})
export class GenericListHeaderComponent implements OnInit {
  @Input()
  title!: string;

  @Output()
  titleChange = new EventEmitter<string>();

  isDarkMode: boolean = false;
  private previousTitle!: string;


  constructor(
    private listIDsServiceService: ListIDsServiceService
  ) {

  }

  ngOnInit() {
    this.onTitleChange();
    this.previousTitle = this.title;
  }

  onTitleChange() {
    if (this.previousTitle !== this.title) {
      this.listIDsServiceService.swapID(this.previousTitle, this.title);
      this.titleChange.emit(this.title);
    }
  }
}
