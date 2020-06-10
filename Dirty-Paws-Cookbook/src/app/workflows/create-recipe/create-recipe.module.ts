import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeRouting } from './create-recipe.routing';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

// Workflow Screens
import { OcrComponent } from '../../components/recipe system/ocr/ocr.component';
import { EditRecipeComponent } from '../../components/recipe system/edit-recipe/edit-recipe.component';

// Injectable Workflow Preferences
import { SessionService } from '../../services/session-service';
import { CreateRecipeAuthGuard } from './create-recipe-auth-guard';

@NgModule({
  imports: [
    CommonModule,
    CreateRecipeRouting,
    MatButtonModule,
    MatFormFieldModule,
  ],
  declarations: [
    OcrComponent,
    EditRecipeComponent
  ],
  providers: [
    SessionService,
    CreateRecipeAuthGuard
  ]
})
export class CreateRecipeModule {
}
