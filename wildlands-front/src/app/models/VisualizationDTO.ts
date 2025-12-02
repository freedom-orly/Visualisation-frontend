import { UpdateDto } from "./updateDto";

export interface VisualizationDTO {
  id: number;
  name: string;
  description: string;
  is_prediction: boolean;
  last_updates: UpdateDto[];
}