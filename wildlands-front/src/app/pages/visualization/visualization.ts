import { Component } from '@angular/core';
import { TuiBreadcrumbs, TuiAccordionDirective, TuiAccordionItem } from "@taiga-ui/kit";
import {RouterModule} from '@angular/router';
import { AsyncPipe, DatePipe, NgFor, NgForOf } from '@angular/common';
import { TuiItem } from "@taiga-ui/cdk";
import { TuiButton, TuiFormatNumberPipe, TuiLink, TuiTitle, TuiLoader, TuiScrollbar } from "@taiga-ui/core";
import {TuiTable} from '@taiga-ui/addon-table';
import { TuiHeader, TuiSubheaderComponent, TuiCell, TuiCardLarge } from "@taiga-ui/layout";
import { LinkButton } from "../../components/link-button/link-button";
import { HttpService } from '../../http-service';
import { VisualizationDTO } from '../../models/VisualizationDTO';
import { UpdateDto } from '../../models/updateDto';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-visualization',
  imports: [TuiBreadcrumbs, RouterModule, TuiItem, TuiLink, TuiAccordionDirective,
    TuiAccordionItem, TuiHeader, TuiTitle, TuiSubheaderComponent, TuiCell, TuiCardLarge,
    AsyncPipe, TuiFormatNumberPipe, TuiTable, NgFor, TuiAccordionItem, NgForOf, TuiButton, LinkButton, TuiLoader, TuiScrollbar, DatePipe],
  templateUrl: './visualization.html',
  styleUrl: './visualization.less'
})
export class Visualization {

  constructor(private HttpService: HttpService) {}

  protected current: VisualizationDTO | null = null;

  protected visualizations$: Observable<VisualizationDTO[]> | null = null;
  protected updates: UpdateDto[] = [
    {
      id: "1",
      name: "Update 1",
      time: new Date('2023-01-31'),
    },
        {
      id: "1",
      name: "Update 2",
      time: new Date('2023-01-31'),
    },
        {
      id: "1",
      name: "Update 3",
      time: new Date('2023-01-31'),
    }
  ];

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
   this.visualizations$ = this.HttpService.getVisualizations().pipe(
    map(v => {
      this.changeVisualization(v[0]);
      return v;
    })

   )
  }

  changeVisualization(vis: VisualizationDTO) {
    this.current = vis;
    this.current.last_updates = this.updates;
  }





}
