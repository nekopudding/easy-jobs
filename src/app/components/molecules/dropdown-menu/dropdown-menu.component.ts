import { Component, Input } from '@angular/core';
import { DropdownItem } from 'src/app/SearchFilters';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  @Input() options: DropdownItem[] = [];
  @Input() name: string = '';
}
