import { Component, DestroyRef, EventEmitter, Input, isDevMode, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { NgClass } from '@angular/common';
import { ListIDsServiceService } from 'app/common/generic-list/list-ids-service/list-ids-service.service';

@Component({
  selector: 'generic-list-header',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './generic-list-header.component.html',
  styleUrl: './generic-list-header.component.css'
})
export class GenericListHeaderComponent implements OnInit {
  @Input()
  title!: string;

  @Output()
  titleChange = new EventEmitter<string>();

  isDarkMode: boolean = false;
  private previousTitle!: string;


  constructor(private readonly themeService: ThemeService,
              private destroyRef: DestroyRef,
              private listIDsServiceService: ListIDsServiceService
  ) {

  }

  ngOnInit() {
    this.observeThemeMode()
    this.onTitleChange()
    this.previousTitle = this.title;
  }

  onTitleChange() {
    if (this.previousTitle !== this.title) {
      this.listIDsServiceService.swapID(this.previousTitle, this.title);
      this.titleChange.emit(this.title);
    }
  }

  observeThemeMode(): void {
    this.themeService.isDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((isDarkModeON: boolean) => {
      this.isDarkMode = isDarkModeON;
    });
  }
}
