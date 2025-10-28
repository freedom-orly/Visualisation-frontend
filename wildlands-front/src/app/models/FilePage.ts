import { FileDTO } from "./FileDTO";
import { FileQuery } from "./FileQuery";

export interface FilePage {
  start: number;
  count: number;
  query: FileQuery;
  files: FileDTO[];
}