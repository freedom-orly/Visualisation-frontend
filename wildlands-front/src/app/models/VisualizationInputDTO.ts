// @dataclass
// class VisualizationInputFieldDTO:
//     id: int
//     visualization_id: int
//     field_name: str
//     field_type: str
//     field_label: Optional[str]
//     default_value: Optional[str]
//     required: bool

export interface VisualizationInputFieldDTO {
    id: number;
    visualization_id: number;
    field_name: string;
    field_type: string;
    field_label?: string;
    options: string[]; // For select fields
    default_value?: string;
    required: boolean;
}