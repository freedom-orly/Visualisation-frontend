export class ChartDTO {
  visualization_id: number;
  name: string;
  // start_date: Date;
  // end_date: Date;
  prediction: boolean;
  values: chartEntry[];
  chart_type: 'line' | 'bar';
  lineOptions: 'y1' | 'y2';

  constructor(
    visualizationId: number,
    name: string,
    prediction: boolean,
    values: chartEntry[],
    chart_type: 'line' | 'bar'
  ) {
    this.visualization_id = visualizationId;
    this.name = name;
    // this.start_date = startDate;
    // this.end_date = endDate;
    this.prediction = prediction;
    this.values = values;
    this.chart_type = chart_type;
    this.lineOptions = 'y1';
  }
}

export interface chartEntry {
  name: string,
  values: chartPoint[]
} 

export interface chartPoint {
  x: unknown,
  y: unknown
}