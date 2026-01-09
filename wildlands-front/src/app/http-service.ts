import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploadQuery } from './models/FileUploadQuery';
import { FileQuery } from './models/FileQuery';
import { ChartQuery } from './models/ChartQuery';
import { Observable, of } from 'rxjs';
import { FileUploadResponse } from './models/FileUploadResponse';
import { FileDTO } from './models/FileDTO';
import { ChartDTO } from './models/chartDto';
import { VisualizationDTO } from './models/VisualizationDTO';
import { UpdateDto } from './models/updateDto';
import { VisualizationInputFieldDTO } from './models/VisualizationInputDTO';

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

  // TODO: fix naming
  searchFiles(req: FileQuery): Observable<FileDTO[]> {
    return this.http.post<FileDTO[]>(`${this.apiUrl}/data/search`, req);
  }

  searchRScripts(req: FileQuery): Observable<FileDTO[]> {
    return this.http.post<FileDTO[]>(`${this.apiUrl}/rscripts/search`, req);
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

  getUpdatesForVisualization(visId: number): Observable<UpdateDto[]> {
    return of([
    {
      id: "1",
      name: "Upload 1",
      time: new Date('2023-01-31'),
    },
        {
      id: "1",
      name: "Upload 2",
      time: new Date('2023-01-31'),
    },
        {
      id: "1",
      name: "Upload 3",
      time: new Date('2023-01-31'),
    }
  ]);
    //return this.http.get<UpdateDto[]>(`${this.apiUrl}/visualizations/${visId}/updates`);
  }
  getVisualizationInputFields(visualizationId: number): Observable<VisualizationInputFieldDTO[]> {
    // return of([
    //   {
    //     id: 1,
    //     visualization_id: visualizationId,
    //     field_name: 'start_date',
    //     field_type: 'date',
    //     field_label: 'Start Date',
    //     required: true,
    //     options: []
    //   },
    //   {
    //     id: 2,
    //     visualization_id: visualizationId,
    //     field_name: 'end_date',
    //     field_type: 'date',
    //     field_label: 'End Date',
    //     required: true,
    //     options: []
    //   },{
    //     id: 3,
    //     visualization_id: visualizationId,
    //     field_name: 'spread',
    //     field_type: 'select',
    //     field_label: 'Spread',
    //     required: true,
    //     options: ['1 day', '1 week', '1 month']
    //   },
    //   {
    //     id: 3,
    //     visualization_id: visualizationId,
    //     field_name: 'additional_notes',
    //     field_type: 'text',
    //     field_label: 'Additional Notes',
    //     required: false,
    //     options: []
    //   },
    //   {
    //     id: 4,
    //     visualization_id: visualizationId,
    //     field_type: 'selectMulti',
    //     field_name: 'data_sources',
    //     field_label: 'Data Sources',
    //     required: false,
    //     options: ['Source A', 'Source B', 'Source C']
    //   },
    //   {
    //     id: 5,
    //     visualization_id: visualizationId,
    //     field_type: 'number',
    //     field_name: 'threshold',
    //     field_label: 'Threshold',
    //     required: false,
    //     options: []
    //   }
    // ]);
    return this.http.get<VisualizationInputFieldDTO[]>(`${this.apiUrl}/visualizations/${visualizationId}/input-fields`);
  }
  
}
