import { Component } from '@angular/core';
import { Chart } from '../../components/chart/chart';
import { ChartDTO } from '../../models/chartDto';

@Component({
  selector: 'app-dashboard',
  imports: [Chart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less'
})
export class Dashboard {
  protected readonly chartData: ChartDTO = new ChartDTO(
    1,
    'Sample Chart',
    new Date('2023-01-01'),
    new Date('2023-01-10'),
    false,
    [
      [1, 10],
      [2, 15],
      [3, 13],
      [4, 17],
      [5, 14],
      [6, 18],
      [7, 16],
      [8, 20],
      [9, 19],
      [10, 22]
    ],
    86400 // Spread of 1 day in seconds
  );
}
