import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OcrComponent } from '../../components/recipe system/ocr/ocr.component';
import { EditRecipeComponent } from '../../components/recipe system/edit-recipe/edit-recipe.component';
import { CreateRecipeAuthGuard } from './create-recipe-auth-guard';
import {
  WORKFLOW_ROUTE_ADD_RECIPE_OCR,
  WORKFLOW_ROUTE_ADD_RECIPE_EDIT
} from '../../classes/ui-constants';

const routes: Routes = [
  { path: WORKFLOW_ROUTE_ADD_RECIPE_OCR, component: OcrComponent, canActivate: [CreateRecipeAuthGuard] },
  { path: WORKFLOW_ROUTE_ADD_RECIPE_EDIT, component: EditRecipeComponent, canActivate: [CreateRecipeAuthGuard] }
];

export const CreateRecipeRouting: ModuleWithProviders = RouterModule.forChild(routes);
