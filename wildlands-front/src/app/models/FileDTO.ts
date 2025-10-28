export interface FileDTO {
  visualizationId: number;
  id: number;
  name: string;
  filePath: string;
  uploadTime: string;   // ISO 8601 timestamp
  downloadUrl: string;
}