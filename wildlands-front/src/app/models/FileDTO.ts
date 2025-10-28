export interface FileDTO {
  visualization_id: number;
  id: number;
  name: string;
  file_path: string;
  upload_time: string;   // ISO 8601 timestamp
  download_url: string;
}