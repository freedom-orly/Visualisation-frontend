import { AsyncPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiDay, TuiItem } from '@taiga-ui/cdk';
import { TuiButton, TuiFormatNumberPipe, TuiLink, TuiTitle, TuiTextfieldComponent, TuiCalendar, TuiTextfield, TuiLoader, TuiIcon, TuiAppearance } from '@taiga-ui/core';
import { TuiAccordionDirective, TuiAccordionItem, TuiBreadcrumbs, TuiDataListWrapperComponent, TuiInputDate, TuiSelect } from '@taiga-ui/kit/components';
import { TuiCardLarge, TuiCell, TuiHeader, TuiSubheaderComponent } from '@taiga-ui/layout';
import { LinkButton } from '../../components/link-button/link-button';
import { Chart } from "../../components/chart/chart";
import { ChartDTO } from '../../models/chartDto';
import { HttpService } from '../../http-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, combineLatest, last, map, Observable, of, Subject } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-visualization-details',
  imports: [TuiBreadcrumbs,
    RouterModule,
    TuiItem,
    TuiLink,
    TuiAccordionDirective,
    TuiAccordionItem,
    TuiHeader,
    TuiTitle,
    TuiSubheaderComponent,
    TuiCell,
    TuiCardLarge,
    AsyncPipe,
    TuiFormatNumberPipe,
    TuiTable,
    NgFor,
    TuiAccordionItem,
    NgForOf,
    TuiButton,
    LinkButton,
    Chart,
    TuiTextfieldComponent,
    TuiCalendar,
    FormsModule,
    TuiDataListWrapperComponent,
    TuiSelect,
    TuiTextfield,
    TuiInputDate,
    NgIf, TuiLoader, TuiIcon, TuiAppearance, ReactiveFormsModule],
  templateUrl: './visualization-details.html',
  styleUrl: './visualization-details.less'
})
export class VisualizationDetails {
  chartData$: Observable<ChartDTO> | null = null;
  spreadOptions: readonly string[] = ['1 day', '1 week', '1 month'];
  startDate: TuiDay | null = new TuiDay(2025, 10, 1);
  endDate: TuiDay | null = new TuiDay(2025, 10, 30);
  spread: '1 day' | '1 week' | '1 month' = '1 day';
  reqFrom: FormGroup = new FormGroup({
    startDate: new FormControl(new TuiDay(2025, 10, 1), Validators.required),
    endDate: new FormControl(new TuiDay(2025, 10, 30), Validators.required),
    spread: new FormControl('1 day', Validators.required)
  })
  error: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpService) {
  
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    this.chartData$ = this.http.getChart(
      {
        id: id,
        start_date: this.startDate!.toString('YMD', '-'),
        end_date: this.endDate!.toString('YMD', '-'),
        spread: this.getSpread(this.spread).toString()
      }
    ).pipe(
      map(response => {
        return new ChartDTO(
             response.visualization_id,
            response.name,
             new Date('2023-01-01'),
              new Date('2023-01-31'),
            response.prediction,
            response.values,
            parseInt(response.spread as unknown as string) 
          );}),
        catchError(e => {
          this.error = true;
          return of({} as ChartDTO)
        })
    );
  }

  readonly breadcrumbsItems = [
    {
      caption: 'Home',
      routerLink: '/'
    },
    {
      caption: 'Visualization',
      routerLink: '/visualization'
    },
    {
      caption: 'Visualization Details',
      routerLink: '/visualization/details'
    }
  ];

  getSpread(option: '1 day' | '1 week' | '1 month'): number {
    switch (option) {
      case '1 day':
        return 1000 * 60 * 60 * 24;
      case '1 week':
        return 1000 * 60 * 60 * 24 * 7;
      case '1 month':
        return 1000 * 60 * 60 * 24 * 30;
    }
  }

  UpdateChart() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    this.chartData$ = this.http.getChart(
      {
        end_date: this.reqFrom.value['endDate'].toString('YMD', '-'),
        id: id,
        spread: this.getSpread(this.reqFrom.value['spread']).toString(),
        start_date: this.reqFrom.value['startDate'].toString('YMD', '-')
      }      
    )
  }
}
