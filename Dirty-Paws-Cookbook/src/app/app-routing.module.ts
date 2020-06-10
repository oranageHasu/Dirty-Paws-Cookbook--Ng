import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeManagerComponent } from './components/recipe system/recipe-manager/recipe-manager.component';
import { RecipeComponent } from './components/recipe system/recipe/recipe.component';
import { WorkflowContainerComponent } from './workflows/workflow-container/workflow-container.component';
import { CreateRecipeModule } from './workflows/create-recipe/create-recipe.module';
import {
  MAIN_APP_ROUTE,
  ROUTE_RECIPES,
  ROUTE_RECIPE,
  ROUTE_LOGIN,
  WORKFLOW_ROUTE_ADD_RECIPE
} from './classes/ui-constants';

const routes: Routes = [

  // "High-level" routes
  // { path: ROUTE_SPLASH_SCREEN, component: SplashScreenComponent },
  { path: ROUTE_LOGIN, component: LoginScreenComponent, canActivate: [AuthGuard] },
  {
    path: MAIN_APP_ROUTE, component: NavbarComponent, canActivate: [AuthGuard],
    children: [
      { path: ROUTE_RECIPES, component: RecipeManagerComponent, canActivate: [AuthGuard] },
      { path: ROUTE_RECIPE + "/:recipeTag", component: RecipeComponent, canActivate: [AuthGuard] },
      {
        path: WORKFLOW_ROUTE_ADD_RECIPE,
        component: WorkflowContainerComponent,
        loadChildren: () => CreateRecipeModule
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
