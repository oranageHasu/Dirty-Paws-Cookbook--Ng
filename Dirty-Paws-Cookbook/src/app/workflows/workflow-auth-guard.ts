import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session-service';

export enum Direction {
  forward = 0,
  backward = 1
}

@Injectable()
export abstract class WorkflowAuthGuard implements CanActivate {

  // Use this to determine IF a workflow route is accessible
  protected abstract CanAccessRoute(): boolean;

  // Use this to determine WHAT the next workflow route should be
  public abstract GetNextRoute(direction: Direction): string;

  // Use this to determine a specific workflow route
  public abstract GetSpecificRoute(screen: any): string;

  // Use this to determine if the current workflow screen is the first of the series
  public abstract IsFirstScreen(): boolean;

  // Use this to determine if the current workflow screen is the last of the series
  public abstract IsLastScreen(): boolean;

  // Use this to determine if the current workflow screen displays the save button
  public abstract DisplaySave(): boolean;

  // Use this to determine if the current workflow screen displays the cancel button
  public abstract DisplayCancel(): boolean;

  protected router: Router;
  protected session: SessionService;

  public displayMovementButtons: boolean = true;

  constructor(
    router: Router,
    session: SessionService
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> {

    let retval = true;

    try {


    } catch (err) {
      console.log(err);
    }

    return of(retval);
  }

}
