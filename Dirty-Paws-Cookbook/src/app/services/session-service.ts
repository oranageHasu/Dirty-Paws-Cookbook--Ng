import { Recipe } from '../models/recipe';
import { KEY_RECIPE } from '../classes/ui-constants';
import { OnDestroy } from '@angular/core';

// Beware, this is not "F5 refresh" resilient
// This should be enhanced using the APP_INITIALIZER token + localmemory to retrieve required "active" data as needed
export class SessionService implements OnDestroy {

  private currentRecipe: Recipe = null;

  ngOnDestroy() {
    this.ClearRecipeId();
  }

  get CurrentRecipe(): Recipe {
    return this.currentRecipe;
  }

  set CurrentRecipe(recipe: Recipe) {

    // Set the current Recipe
    this.currentRecipe = recipe;

    // Store the current Recipe ID in browser local memory (used by APP_INITIALIZER for app re-init)
    this.CacheRecipeId(recipe.recipeId);

  }

  private CacheRecipeId(recipeId: string) {

    try {

      if (recipeId != null) {
        localStorage.setItem(KEY_RECIPE, recipeId);
      }

    } catch (err) {
      console.log('ERROR: Failed caching username to local memory.');
    }

  }

  public RecipeId(): string {

    let retval: string;

    try {

      retval = localStorage.getItem(KEY_RECIPE);

    } catch (err) {
      console.log(err);
    }

    return retval;

  }

  public ClearRecipeId() {

    try {

      console.log('Destroying the session.');
      localStorage.removeItem(KEY_RECIPE);

    } catch (err) {
      console.log(err);
    }

  }

}
