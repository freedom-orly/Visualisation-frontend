import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploadQuery } from './models/FileUploadQuery';
import { FileQuery } from './models/FileQuery';
import { ChartQuery } from './models/ChartQuery';
import { Observable } from 'rxjs';
import { FileUploadResponse } from './models/FileUploadResponse';
import { FileDTO } from './models/FileDTO';
import { ChartDTO } from './models/chartDto';
import { VisualizationDTO } from './models/VisualizationDTO';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly apiUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {
    
   }

  uploadDataFile(req: FileUploadQuery): Observable<FileUploadResponse> {
    const formData: FormData = new FormData();
    formData.append('file', req.file, req.file.name);
    formData.append('visualization_id', req.visualizationId.toString());
    return this.http.post<FileUploadResponse>(`${this.apiUrl}/upload/data`, formData);
  }

  uploadRscriptFile(req: FileUploadQuery): Observable<FileUploadResponse> {
    const formData: FormData = new FormData();
    formData.append('file', req.file, req.file.name);
    formData.append('visualization_id', req.visualizationId.toString());
    return this.http.post<FileUploadResponse>(`${this.apiUrl}/upload/rscript`, formData);
  }

  searchFiles(req: FileQuery): Observable<FileDTO[]> {
    return this.http.post<FileDTO[]>(`${this.apiUrl}/files/search`, req);
  }

  getAllFiles(): Observable<FileDTO[]> {
    return this.http.get<FileDTO[]>(`${this.apiUrl}/files`);
  }

  getVisualizations(): Observable<VisualizationDTO[]> {
    return this.http.get<VisualizationDTO[]>(`${this.apiUrl}/visualizations`);
  }

  getVisualizationById(id: number): Observable<VisualizationDTO> {
    return this.http.get<VisualizationDTO>(`${this.apiUrl}/visualization/${id}`);
  }

  getChart(req: ChartQuery): Observable<ChartDTO> {
    return this.http.post<ChartDTO>(`${this.apiUrl}/visualizations/chart`, req);
  }
  
}
