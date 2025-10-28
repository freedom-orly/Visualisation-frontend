export interface FileQuery {
  visualizationId: number;
  start: number;
  query: string;
  //timespan?: string; // optional ISO duration
  extension: string;
}