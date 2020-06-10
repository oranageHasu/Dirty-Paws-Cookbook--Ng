import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowAuthGuard, Direction } from '../workflow-auth-guard';
import { SessionService } from '../../services/session-service';
import {
  WORKFLOW_ROUTE_ADD_RECIPE,
  WORKFLOW_ROUTE_ADD_RECIPE_OCR,
  WORKFLOW_ROUTE_ADD_RECIPE_EDIT
} from '../../classes/ui-constants';

export enum CreateRecipeScreens {
  Invalid = -1,
  Ocr = 0,
  Edit = 1
}

@Injectable()
export class CreateRecipeAuthGuard extends WorkflowAuthGuard {

  private currentScreen: CreateRecipeScreens = CreateRecipeScreens.Ocr;

  constructor(
    router: Router,
    session: SessionService
  ) {
    super(router, session);

    this.displayMovementButtons = false;
  }

  protected CanAccessRoute(): boolean {

    let retval = true;

    // Note: Here we could optionally "guard" against a user accessing a legit route within this workflow.
    //       This could be the case if we had optional screens controlled by a user preference.

    return retval;

  }

  public IsFirstScreen(): boolean {

    return this.currentScreen == 0;

  }

  public IsLastScreen(): boolean {

    return this.currentScreen == (Object.keys(Direction).length / 2)-1;

  }

  public DisplaySave(): boolean {

    let retval = true;

    if (this.currentScreen == CreateRecipeScreens.Ocr) {
      retval = false;
    }

    return retval;

  }

  public DisplayCancel(): boolean {

    return true;

  }

  public GetSpecificRoute(screen: CreateRecipeScreens): string {

    // Default return route
    let retval = `/${WORKFLOW_ROUTE_ADD_RECIPE}`;

    // Set the new state for the current screen (assume the input is legit)
    this.currentScreen = screen;

    // Only proceed if we actually can access this route
    // To Do: Finish this implementation with a real use-case
    if (this.CanAccessRoute()) {

      // Now, figure out where it is we're going next
      switch (this.currentScreen) {

        case CreateRecipeScreens.Ocr:
          retval = `/${WORKFLOW_ROUTE_ADD_RECIPE}/${WORKFLOW_ROUTE_ADD_RECIPE_OCR}`;
          break;

        case CreateRecipeScreens.Edit:
          retval = `/${WORKFLOW_ROUTE_ADD_RECIPE}/${WORKFLOW_ROUTE_ADD_RECIPE_EDIT}`;
          break;

      }

    }

    console.log(retval);

    return retval;

  }

  public GetNextRoute(direction: Direction): string {

    // Default return route
    let retval = `/${WORKFLOW_ROUTE_ADD_RECIPE}`;

    // Set the new state for the current screen based on the provided direction
    if (direction == Direction.forward) {

      if (this.currentScreen < Object.keys(CreateRecipeScreens).length / 2) {
        this.currentScreen++;
      }

    } else {

      if (this.currentScreen > 0) {
        this.currentScreen--;
      }

    }

    // Only proceed if we actually can access this route
    // To Do: Finish this implementation with a real use-case
    if (this.CanAccessRoute()) {

      // Now, figure out where it is we're going next
      switch (this.currentScreen) {

        case CreateRecipeScreens.Ocr:
          retval = `/${WORKFLOW_ROUTE_ADD_RECIPE}/${WORKFLOW_ROUTE_ADD_RECIPE_OCR}`;
          break;

        case CreateRecipeScreens.Edit:
          retval = `/${WORKFLOW_ROUTE_ADD_RECIPE}/${WORKFLOW_ROUTE_ADD_RECIPE_EDIT}`;
          break;

      }

    }

    console.log(retval);

    return retval;

  }

}
