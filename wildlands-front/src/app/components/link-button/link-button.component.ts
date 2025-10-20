import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiIcon } from '@taiga-ui/core'; // ✅ correct import for icons in Taiga UI

@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [
    CommonModule,
    TuiIcon, // ✅ correct module for icon usage
  ],
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent {
  @Input() iconName?: string;
  @Input() label!: string;
  @Input() link!: string;
}
