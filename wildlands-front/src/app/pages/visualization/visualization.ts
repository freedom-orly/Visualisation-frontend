import { Component } from '@angular/core';
import { TuiBreadcrumbs, TuiAccordionDirective, TuiAccordionItem } from "@taiga-ui/kit";
import {RouterModule} from '@angular/router';
import { AsyncPipe, NgFor, NgForOf } from '@angular/common';
import { TuiItem } from "@taiga-ui/cdk";
import { TuiButton, TuiFormatNumberPipe, TuiLink, TuiTitle } from "@taiga-ui/core";
import {TuiTable} from '@taiga-ui/addon-table';
import { TuiHeader, TuiSubheaderComponent, TuiCell, TuiCardLarge } from "@taiga-ui/layout";
import { LinkButton } from "../../components/link-button/link-button";
import { HttpService } from '../../http-service';
import { VisualizationDTO } from '../../models/VisualizationDTO';
import { UpdateDto } from '../../models/updateDto';


@Component({
  selector: 'app-visualization',
  imports: [TuiBreadcrumbs, RouterModule, TuiItem, TuiLink, TuiAccordionDirective,
    TuiAccordionItem, TuiHeader, TuiTitle, TuiSubheaderComponent, TuiCell, TuiCardLarge,
    AsyncPipe, TuiFormatNumberPipe, TuiTable, NgFor, TuiAccordionItem, NgForOf, TuiButton, LinkButton],
  templateUrl: './visualization.html',
  styleUrl: './visualization.less'
})
export class Visualization {

  constructor(private HttpService: HttpService) {}

  protected current: VisualizationDTO | null = null;

  protected visualizations: VisualizationDTO[] = [];
  protected updates: UpdateDto[] = [];

  readonly breadcrumbsItems = [
    {
      caption: 'Home',
      routerLink: '/'
    },
    {
      caption: 'Visualization',
      routerLink: '/visualization'
    }
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.HttpService.getVisualizations().subscribe((data: VisualizationDTO[]) => {
      this.visualizations = data;
      if (this.visualizations.length > 0) {
        this.current = this.visualizations[0];
      }
    });
  }

  changeVisualization(vis: VisualizationDTO) {
    this.current = vis;
    
    
  }





}
