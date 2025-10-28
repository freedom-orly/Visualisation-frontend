export interface ChartQuery {
    id: number;
    startDate: string; 
    endDate: string;   
    spread: string;   // ISO 8601 duration, optional
}