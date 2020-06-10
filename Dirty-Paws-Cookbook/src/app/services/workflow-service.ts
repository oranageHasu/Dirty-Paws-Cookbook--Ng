import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WorkflowService {

  private screen = new BehaviorSubject(0);

  screen$ = this.screen.asObservable();

  AccessScreen(screen: number) {
    this.screen.next(screen)
  }

}
