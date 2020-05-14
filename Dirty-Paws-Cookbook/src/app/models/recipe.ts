import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export class Recipe {
  recipeId?: string;
  title: string;
  rating: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  notes: string;
  isDeleted: boolean;
}
