import { Component, Input } from '@angular/core';
import {TuiAppearance, TuiTitle,} from '@taiga-ui/core';
import {TuiCardLarge} from '@taiga-ui/layout';
import {TuiAxes, TuiLineChart} from '@taiga-ui/addon-charts';
import {type TuiPoint} from '@taiga-ui/core';
import { ChartDTO } from '../../models/chartDto';

@Component({
  selector: 'app-chart',
  imports: [TuiAppearance,
    TuiCardLarge,TuiAxes, TuiLineChart,TuiTitle],
  templateUrl: './chart.html',
  styleUrl: './chart.less'
})
export class Chart {
GetChartWidth(): number {
  return this.data?.values.map(pair => pair[0]).reduce((a, b) => Math.max(a, b), 0) || 100;
}
GetChartHeight(): number {
    return this.data?.values.map(pair => pair[1]).reduce((a, b) => Math.max(a, b), 0) || 100;
}

  @Input() data: ChartDTO | null = null;
  protected readonly value: readonly TuiPoint[] = [
    [0, 10],
    [2, 15],
    [3, 13],
    [4, 17],
    [5, 14],
    [6, 18],
    [7, 16],
    [8, 20],
    [9, 19],
    [10, 22]

  ]
  protected readonly appearance: 'History' | 'Forecast' = this.GetAppearance();
  protected readonly title: string = this.data?.name || 'Sample Chart';
  
  GetAppearance(): 'History' | 'Forecast' {
    if (this.data?.prediction) {
      return 'Forecast';
    }
    return 'History';
  }

  GetYAxisLabel(): string[] {
    if (!this.data || !this.data.values) {
      return [];
    }

    const yValues = this.data.values.flat();
    const uniqueYValues = Array.from(new Set(yValues));

    uniqueYValues.sort((a, b) => a - b);

    return uniqueYValues.map(String);
  }

  GetXAxisLabel(): string[] {
    if (!this.data || !this.data.values || !this.data.spread) {
      return [];
    }

    const startDate = new Date(); // Assuming the chart starts from the current date
    const spreadInMs = this.data.spread * 1000; // Convert spread from seconds to milliseconds

    return this.data.values.map((_, index) => {
      const labelDate = new Date(startDate.getTime() + index * spreadInMs);
      return labelDate.toDateString(); // Format as ISO string
    });
  }
  GetValues(): TuiPoint[] {
    if (!this.data || !this.data.values) {
      return [];
    }
    
    return this.data.values.map(pair => [pair[0], pair[1]] as TuiPoint);
  }
}


