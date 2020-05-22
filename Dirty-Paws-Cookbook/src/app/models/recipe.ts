import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export class Recipe {

  recipeId?: string;
  name: string;
  rating: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  notes: string;
  isDeleted: boolean;

  public URLCompliantName() {
    return this.name.replace(/ /g, '_');
  }

}
