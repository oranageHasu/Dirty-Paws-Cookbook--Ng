import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../../models/ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  // Inputs
  @Input() ingredient: Ingredient = new Ingredient();

  // Outputs
  @Output() ingredientSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  public AddIngredient() {

    this.ingredientSelected.emit(this.ingredient);

  }

}
