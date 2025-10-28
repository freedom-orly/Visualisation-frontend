export class ChartDTO {
  visualizationId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  prediction: boolean;
  values: number[][];
  spread?: number; // Representing timedelta in seconds

  constructor(
    visualizationId: number,
    name: string,
    startDate: Date,
    endDate: Date,
    prediction: boolean,
    values: number[][],
    spread: number | undefined
  ) {
    this.visualizationId = visualizationId;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.prediction = prediction;
    this.values = values;
    this.spread = spread;
  }
}