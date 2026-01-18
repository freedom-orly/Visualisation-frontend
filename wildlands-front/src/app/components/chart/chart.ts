import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { TuiAppearance, TuiTitle, } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAxes, TuiLineChart } from '@taiga-ui/addon-charts';
import { type TuiPoint } from '@taiga-ui/core';
import { ChartDTO, chartPoint } from '../../models/chartDto';
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
  @Input() type: 'line' | 'bar' = 'line'
  @Input() lineOptions: 'y1' | 'y2' = 'y1';

@ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  protected chartData: ChartData<typeof this.type, { key: string, value: number }[]> = {
    datasets: [{
      data: [],
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      }
    }],
  };
  chartOptions: ChartOptions = this.lineOptions === 'y2' ? {
     responsive: true,
     maintainAspectRatio: true,
            scales: {
              y: {
                type: 'linear',
                position: 'left',
                stack: 'demo',
                stackWeight: 2,
              },
              y2: {
                type: 'linear',
                position: 'left',
                offset: true,
                stack: 'demo',
                stackWeight: 1,
              }
            }
  } : {
    responsive: true,
    maintainAspectRatio: true,
    hover: {
  mode: 'point'
}
  }

  protected readonly appearance: 'History' | 'Forecast' = this.GetAppearance();
  protected title: string = this.data?.name || 'Sample Chart';

  constructor() { 
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.title = this.data!.name;
      this.data = this.data;
      if (this.lineOptions === 'y2') {
       this.chartOptions = {
        responsive: true,
            scales: {
              y: {
                type: 'linear',
                position: 'left',
                stack: 'demo',
                stackWeight: 2,
              },
              y2: {
                type: 'linear',
                position: 'left',
                offset: true,
                stack: 'demo',
                stackWeight: 1,
              }
            },
            // Source - https://stackoverflow.com/a
// Posted by perelin
// Retrieved 2026-01-14, License - CC BY-SA 3.0

hover: {
  mode: 'point'
}

      }
        this.chartData = this.getCustomData(this.data!);
        this.chart?.update();
        return;
      }
      this.chartData.datasets = this.data!.values.map(v => {
        return {
          label: v.name,
          parsing: {
            xAxisKey: 'key',
            yAxisKey: 'value'
          },
          data: this.GetValues(v.values)
        }
      })
  }

  // GetChartWidth(): number {
  //   return this.data?.values.map(pair => pair[0]).reduce((a, b) => Math.max(a, b), 0) || 100;
  // }
  // GetChartHeight(): number {
  //   return Math.max(...this.data?.values.map(pair => pair[1])!)
  // }



  GetAppearance(): 'History' | 'Forecast' {
    if (this.data?.prediction) {
      return 'Forecast';
    }
    return 'History';
  }

  // GetXAxisLabels(): string[] {
  //   if (!this.data || !this.data.start_date || !this.data.spread || !this.data.end_date) {
  //     return [];
  //   }
  //   const allDates: string[] = [];
  //   const startTime = this.data.start_date.getTime();
  //   const endTime = this.data.end_date.getTime();
  //   const spreadInMs = this.data.spread;
  //   for (let time = startTime; time <= endTime; time += spreadInMs) {
  //     const date = new Date(time);
  //     allDates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
  //   }

  //   return allDates;
  // }
  GetValues(vals: chartPoint[]): { key: string, value: number }[] {
    if (!this.data || !this.data.values) {
      return [];
    }

    var chartData: { key: string, value: number }[] = [];
    //const xLabels = this.GetXAxisLabels();
    vals.forEach(pair => {
      const xIndex = pair.x as string;
      const yValue = pair.y as number;
      chartData.push({ key: xIndex, value: yValue });
    });
    return chartData;
  }

    getCustomData(dto: ChartDTO): ChartData<'line', { key: string, value: number }[]> {
    const datasets: any[] = [];
    dto.values.forEach((series, index) => {
      datasets.push({
        label: series.name,
        data: series.values.map(point => {
          return { key: point.x, value: point.y };
        }),
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value'
        },
        yAxisID: ["Temperature", "Precipitation"].includes(series.name) ? 'y2' : 'y'
      });
    });
    return {
      datasets: datasets
    };

  }
}


