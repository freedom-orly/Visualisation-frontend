export interface FileQuery {
  visualization_id: number;
  start: number;
  query: string;
  //timespan?: string; // optional ISO duration
  extension: string;
}