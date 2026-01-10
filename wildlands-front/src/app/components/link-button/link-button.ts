import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiAppearance, TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiTile } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiHovered } from "@taiga-ui/cdk";

@Component({
  selector: 'app-link-button',
  imports: [TuiCardLarge, TuiTile, TuiIcon, TuiAppearance, TuiHeader, RouterLink, TuiButton, TuiHovered],
  templateUrl: './link-button.html',
  styleUrl: './link-button.less'
})
export class LinkButton {
  @Output() click = new EventEmitter<void>();
  @Output() hover = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();
  @Input() icon: string = 'link';
  @Input() label: string = 'Go to Link'
  @Input() link: string = '/';
  @Input() border: number = 40;
  @Input() appearance: string= 'secondary';
  @Input() hoverSensitive: boolean = false;

  


  onClick() {
    this.click.emit();
  }

  onHover() {
    this.hover.emit();
  }
  onLeave() {
    this.leave.emit();
  }
}
