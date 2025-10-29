import { Component } from '@angular/core';
import { Chart } from '../../components/chart/chart';
import { ChartDTO } from '../../models/chartDto';
import { TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'app-dashboard',
  imports: [Chart, TuiTitle],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less'
})
export class Dashboard {
  protected readonly chartData: ChartDTO = new ChartDTO(
    1,
    'Sample Chart',
    new Date('2023-01-01'),
    new Date('2023-01-31'),
    false,
    [
    [0, 5],
    [1, 10],
    [2, 15],
    [3, 13],
    [4, 17],
    [5, 14],
    [6, 18],
    [7, 16],
    [8, 20],
    [9, 19],
    [10, 22],
    [11, 25],
    [12, 23],
    [13, 26],
    [14, 30],
    [15, 28],
    [16, 32],
    [17, 29],
    [18, 34],
    [19, 31],
    [20, 35],
    [21, 38],
    [22, 36],
    [23, 40],
    [24, 42],
    [25, 41],
    [26, 45],
    [27, 43],
    [28, 47],
    [29, 44],
    [30, 48]
    ],
    86400000 // Spread of 1 day in seconds
  );
}
