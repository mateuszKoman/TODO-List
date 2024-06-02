import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { GenericListNameService } from 'app/common/generics/generic-list/generic-list-header/generic-list-name.service';

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

  constructor(
    private readonly genericListNameService: GenericListNameService
  ) {
  }

  ngOnInit() {
    this.onTitleChange();
  }

  onTitleChange() {
    this.genericListNameService.updateListName(this.title);
  }
}
