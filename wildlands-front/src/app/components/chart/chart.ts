import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiAppearance, TuiTitle, } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAxes, TuiLineChart } from '@taiga-ui/addon-charts';
import { type TuiPoint } from '@taiga-ui/core';
import { ChartDTO } from '../../models/chartDto';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  imports: [TuiAppearance,
    TuiCardLarge, TuiTitle, BaseChartDirective],
  templateUrl: './chart.html',
  styleUrl: './chart.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chart {
  @Input() data: ChartDTO | null = null;
  @Input() dataAsync: Observable<ChartDTO> | null = null; 
  protected chartData: ChartData<'line', { key: string, value: number }[]> = {
    datasets: [{
      data: this.GetValues(),
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      }
    }],
  };
  protected chartOptions: ChartOptions = {
    responsive: true,
  }

  protected readonly appearance: 'History' | 'Forecast' = this.GetAppearance();
  protected title: string = this.data?.name || 'Sample Chart';

  constructor() { 
    this.dataAsync?.subscribe(data => {
      this.title = data.name;
      this.data = data;
      this.chartData.datasets = [{
        label: this.title,
        data: this.GetValues(),
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value'
        }
      }];
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chartData.datasets = [{
      label: this.title,
      data: this.GetValues(),
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      }
    }];
  }

  GetChartWidth(): number {
    return this.data?.values.map(pair => pair[0]).reduce((a, b) => Math.max(a, b), 0) || 100;
  }
  GetChartHeight(): number {
    return Math.max(...this.data?.values.map(pair => pair[1])!)
  }



  GetAppearance(): 'History' | 'Forecast' {
    if (this.data?.prediction) {
      return 'Forecast';
    }
    return 'History';
  }

  GetXAxisLabels(): string[] {
    if (!this.data || !this.data.start_date || !this.data.spread || !this.data.end_date) {
      return [];
    }
    const allDates: string[] = [];
    const startTime = this.data.start_date.getTime();
    const endTime = this.data.end_date.getTime();
    const spreadInMs = this.data.spread;
    for (let time = startTime; time <= endTime; time += spreadInMs) {
      const date = new Date(time);
      allDates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    }

    return allDates;
  }
  GetValues(): { key: string, value: number }[] {
    if (!this.data || !this.data.values) {
      return [];
    }

    var chartData: { key: string, value: number }[] = [];
    const xLabels = this.GetXAxisLabels();
    this.data.values.forEach(pair => {
      const xIndex = pair[0];
      const yValue = pair[1];
      chartData.push({ key: xLabels[xIndex], value: yValue });
    });
    return chartData;
  }
}


