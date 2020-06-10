import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WORKFLOW_ROUTE_ADD_RECIPE, MAIN_APP_ROUTE, ROUTE_RECIPES } from '../../classes/ui-constants';
import { WorkflowAuthGuard, Direction } from '../workflow-auth-guard';
import { CreateRecipeAuthGuard } from '../create-recipe/create-recipe-auth-guard';
import { SessionService } from '../../services/session-service';
import { WorkflowService } from '../../services/workflow-service';

@Component({
  selector: 'app-workflow-container',
  templateUrl: './workflow-container.component.html',
  styleUrls: ['./workflow-container.component.scss']
})
export class WorkflowContainerComponent implements OnInit {

  private workflow: WorkflowAuthGuard = null;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private workflowService: WorkflowService
  ) {

    if (this.router.getCurrentNavigation()) {

      if (this.router.getCurrentNavigation().extras.state) {

        this.workflow = this.router.getCurrentNavigation().extras.state.workflow;

      }

    }

  }

  ngOnInit() {

    if (!this.workflow) {
      this.workflow = this.initialWorkflowState();
    }

    this.workflowService.screen$.subscribe(screen => this.activeSpecificPage(screen));

  }

  public Prev() {

    this.activateNextPage(Direction.backward);

  }

  public Next() {

    this.activateNextPage(Direction.forward);

  }

  public Cancel() {

    // Destroy the current Workflow instance
    this.workflow = null;

    // Route to the main app screen
    this.router.navigate([`/${MAIN_APP_ROUTE}/${ROUTE_RECIPES}`]);

  }

  public Save() {

    console.log('To Do: Save Clicked.');

  }

  private activeSpecificPage(screen: number) {

    const route = this.workflow.GetSpecificRoute(screen);

    // Route to the specified screen
    this.router.navigate([`/${MAIN_APP_ROUTE}/` + route]);

  }

  private activateNextPage(direction: Direction) {

    const route = this.workflow.GetNextRoute(direction);

    // Route to the next screen
    this.router.navigate([`/${MAIN_APP_ROUTE}/` + route]);

  }

  private initialWorkflowState(): WorkflowAuthGuard{

    const workflow = this.getWorkflowFromRoute();
    let retval: WorkflowAuthGuard = null;

    console.log('initializing workflow instance');

    switch (workflow) {

      case WORKFLOW_ROUTE_ADD_RECIPE:
        retval = new CreateRecipeAuthGuard(this.router, this.sessionService);
        break;

      default:

        console.log('Unsupported Workflow encountered.');
        break;

    }

    return retval;

  }

  private getWorkflowFromRoute(): string {

    let retval = '';
    let routes = this.router.url.split('/');

    // Workflow routes will always be of the form:
    // dirty-paws-cookbook/<workflow name>/<workflow screen>
    retval = routes[routes.length-2]

    return retval;

  }
}
