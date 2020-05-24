import { Component } from '@angular/core';
import { RecipeService } from './services/recipe-service';
import { SessionService } from './services/session-service';
import { RecipeFilter } from './models/recipe-filter';
import { Recipe } from './models/recipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Dirty-Paws-Cookbook';

}

/*
 * Used to populate the SessionService on app reload
 */
export function InitApp(api: RecipeService, session: SessionService) {

  return () => {

    const recipeId = session.RecipeId();

    if (recipeId !== null) {

      return api.GetRecipe(recipeId)
        .then((recipe) => {

          if (recipe) {
            session.CurrentRecipe = recipe;
          }

        });

    }

  };

}
