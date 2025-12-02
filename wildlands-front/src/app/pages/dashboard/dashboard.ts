import { Component } from '@angular/core';
import { Chart } from '../../components/chart/chart';
import { ChartDTO } from '../../models/chartDto';
import { TuiAppearance, TuiTitle } from '@taiga-ui/core';
import { LinkButton } from "../../components/link-button/link-button";
import { BaseChartDirective } from 'ng2-charts';
import { TuiCardLarge } from '@taiga-ui/layout';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [Chart, TuiTitle, LinkButton, BaseChartDirective, TuiAppearance, TuiCardLarge,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less'
})
export class Dashboard {
  protected readonly chartData: ChartDTO = new ChartDTO(
    1,
    'Recent Stores Revenue',
    new Date('2025-09-01'),
    new Date('2025-10-31'),
    false,
    [{
      name: "store 1",
      values: [
  { x: '2025-09-01', y: 1684 },
  { x: '2025-09-02', y: 1421 },
  { x: '2025-09-03', y: 1977 },
  { x: '2025-09-04', y: 1532 },
  { x: '2025-09-05', y: 1888 },
  { x: '2025-09-06', y: 1740 },
  { x: '2025-09-07', y: 1279 },
  { x: '2025-09-08', y: 1934 },
  { x: '2025-09-09', y: 1611 },
  { x: '2025-09-10', y: 1462 },
  { x: '2025-09-11', y: 1783 },
  { x: '2025-09-12', y: 1320 },
  { x: '2025-09-13', y: 1498 },
  { x: '2025-09-14', y: 1992 },
  { x: '2025-09-15', y: 1247 },
  { x: '2025-09-16', y: 1836 },
  { x: '2025-09-17', y: 1394 },
  { x: '2025-09-18', y: 1761 },
  { x: '2025-09-19', y: 1570 },
  { x: '2025-09-20', y: 1953 },
  { x: '2025-09-21', y: 1475 },
  { x: '2025-09-22', y: 1899 },
  { x: '2025-09-23', y: 1368 },
  { x: '2025-09-24', y: 1720 },
  { x: '2025-09-25', y: 1981 },
  { x: '2025-09-26', y: 1588 },
  { x: '2025-09-27', y: 1255 },
  { x: '2025-09-28', y: 1672 },
  { x: '2025-09-29', y: 1944 },
  { x: '2025-09-30', y: 1309 }
]
    }, {
      name: "store 2",
      values: [ { x: '2025-09-01', y: 1732 },
  { x: '2025-09-02', y: 1445 },
  { x: '2025-09-03', y: 1928 },
  { x: '2025-09-04', y: 1506 },
  { x: '2025-09-05', y: 1862 },
  { x: '2025-09-06', y: 1789 },
  { x: '2025-09-07', y: 1381 },
  { x: '2025-09-08', y: 1967 },
  { x: '2025-09-09', y: 1639 },
  { x: '2025-09-10', y: 1484 },
  { x: '2025-09-11', y: 1810 },
  { x: '2025-09-12', y: 1294 },
  { x: '2025-09-13', y: 1551 },
  { x: '2025-09-14', y: 1999 },
  { x: '2025-09-15', y: 1342 },
  { x: '2025-09-16', y: 1875 },
  { x: '2025-09-17', y: 1412 },
  { x: '2025-09-18', y: 1701 },
  { x: '2025-09-19', y: 1604 },
  { x: '2025-09-20', y: 1938 },

  { x: '2025-09-21', y: 1527 },
  { x: '2025-09-22', y: 1890 },
  { x: '2025-09-23', y: 1393 },
  { x: '2025-09-24', y: 1758 },
  { x: '2025-09-25', y: 1971 },
  { x: '2025-09-26', y: 1640 },
  { x: '2025-09-27', y: 1283 },
  { x: '2025-09-28', y: 1699 },
  { x: '2025-09-29', y: 1912 },
  { x: '2025-09-30', y: 1337 }]
    },
    {
      name: "Store 3",
      values: [  { x: '2025-09-01', y: 1764 },
  { x: '2025-09-02', y: 1408 },
  { x: '2025-09-03', y: 1935 },
  { x: '2025-09-04', y: 1517 },
  { x: '2025-09-05', y: 1879 },
  { x: '2025-09-06', y: 1712 },
  { x: '2025-09-07', y: 1290 },
  { x: '2025-09-08', y: 1984 },
  { x: '2025-09-09', y: 1608 },
  { x: '2025-09-10', y: 1496 },

  { x: '2025-09-11', y: 1831 },
  { x: '2025-09-12', y: 1327 },
  { x: '2025-09-13', y: 1574 },
  { x: '2025-09-14', y: 1991 },
  { x: '2025-09-15', y: 1362 },
  { x: '2025-09-16', y: 1856 },
  { x: '2025-09-17', y: 1430 },
  { x: '2025-09-18', y: 1724 },
  { x: '2025-09-19', y: 1583 },
  { x: '2025-09-20', y: 1966 },

  { x: '2025-09-21', y: 1502 },
  { x: '2025-09-22', y: 1907 },
  { x: '2025-09-23', y: 1386 },
  { x: '2025-09-24', y: 1741 },
  { x: '2025-09-25', y: 1987 },
  { x: '2025-09-26', y: 1594 },
  { x: '2025-09-27', y: 1311 },
  { x: '2025-09-28', y: 1689 },
  { x: '2025-09-29', y: 1926 },
  { x: '2025-09-30', y: 1350 }]
    }],
    604800000 // Spread of 1 day in seconds
  );

  protected readonly chartData2: ChartDTO = new ChartDTO(
    1,
    'Recent Weather Data',
    new Date('2025-09-01'),
    new Date('2025-10-31'),
    false,
    [{
      name: "store 1",
      values: []
    }, {
      name: "Weather",
      values: []
    }],
    86400000 // Spread of 1 day in seconds
  );
  customChartOptions: ChartOptions = {
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
    }
  }
  customChartData: ChartData<'line', { key: string, value: number }[]> = {
    datasets: [{
      label: "store 1",
      data: [
        { key: "01/10/2025", value: 1898 },
        { key: "02/10/2025", value: 1675 },
        { key: "03/10/2025", value: 1402 },
        { key: "04/10/2025", value: 1921 },
        { key: "05/10/2025", value: 2003 },
        { key: "06/10/2025", value: 1757 },
        { key: "07/10/2025", value: 1334 },
        { key: "08/10/2025", value: 1862 },
        { key: "09/10/2025", value: 1728 },
        { key: "10/10/2025", value: 1607 },
        { key: "11/10/2025", value: 1819 },
        { key: "12/10/2025", value: 2078 },
        { key: "13/10/2025", value: 1932 },
        { key: "14/10/2025", value: 1555 },
        { key: "15/10/2025", value: 2014 },
        { key: "16/10/2025", value: 1376 },
        { key: "17/10/2025", value: 1641 },
        { key: "18/10/2025", value: 1487 },
        { key: "19/10/2025", value: 2035 },
        { key: "20/10/2025", value: 1568 },
        { key: "21/10/2025", value: 1916 },
        { key: "22/10/2025", value: 1692 },
        { key: "23/10/2025", value: 2088 },
        { key: "24/10/2025", value: 1345 },
        { key: "25/10/2025", value: 1430 },
        { key: "26/10/2025", value: 1836 },
        { key: "27/10/2025", value: 1499 },
        { key: "28/10/2025", value: 1990 },
        { key: "29/10/2025", value: 1873 },
        { key: "30/10/2025", value: 1462 },
        { key: "31/10/2025", value: 1781 }
      ],
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      },
      yAxisID: 'y'
    },
  {
      label: "weather",
      data: [
        { key: "01/10/2025", value: 18 },
        { key: "02/10/2025", value: 16 },
        { key: "03/10/2025", value: 14 },
        { key: "04/10/2025", value: 19 },
        { key: "05/10/2025", value: 20 },
        { key: "06/10/2025", value: 17 },
        { key: "07/10/2025", value: 13 },
        { key: "08/10/2025", value: 18 },
        { key: "09/10/2025", value: 17 },
        { key: "10/10/2025", value: 16 },
        { key: "11/10/2025", value: 18 },
        { key: "12/10/2025", value: 20 },
        { key: "13/10/2025", value: 19 },
        { key: "14/10/2025", value: 15 },
        { key: "15/10/2025", value: 20 },
        { key: "16/10/2025", value: 13 },
        { key: "17/10/2025", value: 16 },
        { key: "18/10/2025", value: 14 },
        { key: "19/10/2025", value: 20 },
        { key: "20/10/2025", value: 15 },
        { key: "21/10/2025", value: 19 },
        { key: "22/10/2025", value: 16 },
        { key: "23/10/2025", value: 20 },
        { key: "24/10/2025", value: 13 },
        { key: "25/10/2025", value: 14 },
        { key: "26/10/2025", value: 18 },
        { key: "27/10/2025", value: 14 },
        { key: "28/10/2025", value: 19 },
        { key: "29/10/2025", value: 18 },
        { key: "30/10/2025", value: 14 },
        { key: "31/10/2025", value: 17 }
      ],
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      },
      yAxisID: 'y2'
    }],
  };
}
