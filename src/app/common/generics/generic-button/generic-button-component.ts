import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'generic-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './generic-button-component.html'
})
export class GenericButtonComponent {

  @Input({required: true})
  content!: string;

  @Input()
  classes?: Array<string>
}
