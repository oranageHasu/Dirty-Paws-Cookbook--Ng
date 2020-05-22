import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  // Inputs
  @Input() recipe: Recipe = new Recipe();

  // Outputs
  @Output() recipeSelected = new EventEmitter();

  public ratingSize = 'small';

  constructor(

  ) { }

  ngOnInit() {

  }

  public RecipeSelected() {

    this.recipeSelected.emit(this.recipe);

  }
}
