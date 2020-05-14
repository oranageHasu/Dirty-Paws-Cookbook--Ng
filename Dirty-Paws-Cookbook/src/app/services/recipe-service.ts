import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import retry from 'p-retry';
import { BaseService } from '../classes/base-service';
import { Recipe } from '../models/recipe';
import { RecipeFilter } from '../models/recipe-filter';
import { CRUD_RETRY, API_RECIPE } from '../classes/api-constants';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public async getRecipes(filter: RecipeFilter): Promise<Recipe[]> {

    let retval: Recipe[];
    let url: string = null;

    const parameters: HttpParams = this.GetQueryParameters(filter);
    url = `${environment.apiUrlBase}/${API_RECIPE}`;

    await retry(
      async () => {

        try {

          retval = await this.http
            .get<Recipe[]>(url, { params: parameters })
            .toPromise()
            .then(res => {
              return this.CastCollectionResult(res);
            });

        } catch (err) {
          console.log('ERROR: Failed GET request for Recipe.');
        }

      },
      { retries: CRUD_RETRY }
    );

    return retval;
  }

  public async InsertRecipe(recipe: Recipe): Promise<Recipe> {

    let retval: Recipe;
    let url: string = null;
    let data: string = null;

    url = `${environment.apiUrlBase}/${API_RECIPE}`;
    data = JSON.stringify(recipe);

    await retry(
      async () => {

        try {

          retval = await this.http
            .post<Recipe>(url, data)
            .toPromise()
            .then(res => {
              return this.CastResult(res);
            });

        } catch (err) {
          console.log('ERROR: Failed POST request for Recipe.');
        }

      },
      { retries: CRUD_RETRY }
    );

    return retval;
  }

  public async UpdateRecipe(recipe: Recipe): Promise<Recipe> {

    let retval: Recipe;
    let url: string = null;
    let data: string = null;

    url = `${environment.apiUrlBase}/${API_RECIPE}`;
    data = JSON.stringify(recipe);

    await retry(
      async () => {

        try {

          retval = await this.http
            .put<Recipe>(url, data)
            .toPromise()
            .then(res => {
              return this.CastResult(res);
            });

        } catch (err) {
          console.log('ERROR: Failed PUT request for Recipe.');
        }

      },
      { retries: CRUD_RETRY }
    );

    return retval;
  }

  public async DeleteRecipe(recipeId): Promise<boolean> {

    let opResult = false;
    let url: string = null;

    url = `${environment.apiUrlBase}/${API_RECIPE}/${recipeId}`;

    await retry(
      async () => {

        try {

          opResult = await this.http
            .delete<boolean>(url)
            .toPromise();

        } catch (err) {
          console.log('ERROR: Failed DELETE request for Recipe.');
        }

      },
      { retries: CRUD_RETRY }
    );

    return opResult;
  }

  protected CastCollectionResult(res: any): Recipe[] {

    const retval: Recipe[] = [];

    Object.assign(retval, res);

    for (let i = 0; i < retval.length; i++) {
      retval[i] = this.CastResult(retval[i]);
    }

    return retval;

  }

  protected CastResult(res: any): Recipe {

    const retval: Recipe = new Recipe();
    Object.assign(retval, res);

    return retval;

  }

}
