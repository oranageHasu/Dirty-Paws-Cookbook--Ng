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

  constructor(

  ) { }

  ngOnInit() {

    console.log(this.recipe);

  }

  public GetRating() {
    const styles = { 'width': `${this.recipe.rating*20}%` };
    return styles;
  }

  public RecipeSelected() {

    this.recipeSelected.emit(this.recipe);

  }
}
