import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RecipeFilter } from '../../../models/recipe-filter';
import { RecipeService } from '../../../services/recipe-service';
import { Recipe } from '../../../models/recipe';
import { MAIN_APP_ROUTE, ROUTE_SLASH, ROUTE_RECIPE } from '../../../classes/ui-constants';
import { SessionService } from '../../../services/session-service';

@Component({
  selector: 'app-recipe-manager',
  templateUrl: './recipe-manager.component.html',
  styleUrls: ['./recipe-manager.component.scss']
})
export class RecipeManagerComponent implements OnInit {

  // Public Variables
  public recipes: Recipe[] = null;

  constructor(
    private api: RecipeService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private session: SessionService
  ) { }

  async ngOnInit() {
    this.refreshRecipes();
  }

  /*
   * Load the Recipes from the api service
   */
  private async refreshRecipes() {

    const recipeFilter: RecipeFilter = new RecipeFilter();

    try {

      // Display the foreground loading component
      this.ngxService.start('refresh-recipes');

      // Refresh the Recipes (retrieve from web service)
      this.recipes = await this.api.GetRecipes(recipeFilter);

    } catch (err) {

      console.log(err);

    } finally {

      // Stop displaying the foreground loading component
      this.ngxService.stop('refresh-recipes');

    }

  }

  /*
   * User selected a Recipe
   */
  public RecipeSelected(recipe: Recipe) {

    this.session.CurrentRecipe = recipe;
    this.router.navigate([`/${MAIN_APP_ROUTE + ROUTE_SLASH + ROUTE_RECIPE + ROUTE_SLASH + recipe.URLCompliantName()}`]);

  }

}
