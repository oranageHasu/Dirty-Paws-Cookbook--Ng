import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session-service';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  public recipe: Recipe = new Recipe();

  constructor(
    private session: SessionService
  ) { }

  ngOnInit() {

    this.recipe = this.session.CurrentRecipe;

  }

  public IngredientSelected() {

    console.log('To Do: Handle Ingredient selected.');

  }

}
