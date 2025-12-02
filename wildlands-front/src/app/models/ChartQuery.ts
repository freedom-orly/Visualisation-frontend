export interface ChartQuery {
    id: number;
    start_date: string; 
    end_date: string;   
    spread: string;   // ISO 8601 duration, optional
}