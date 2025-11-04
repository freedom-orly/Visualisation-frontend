export class ChartDTO {
  visualization_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  prediction: boolean;
  values: chartEntry[]
  spread?: number; // Representing timedelta in seconds

  constructor(
    visualizationId: number,
    name: string,
    startDate: Date,
    endDate: Date,
    prediction: boolean,
    values: chartEntry[],
    spread: number | undefined
  ) {
    this.visualization_id = visualizationId;
    this.name = name;
    this.start_date = startDate;
    this.end_date = endDate;
    this.prediction = prediction;
    this.values = values;
    this.spread = spread;
  }
}

export interface chartEntry {
  name: string,
  values: number[][]
} 