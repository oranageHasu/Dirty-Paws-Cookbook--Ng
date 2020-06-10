import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowService } from '../../../services/workflow-service';
import { CreateRecipeScreens } from '../../../workflows/create-recipe/create-recipe-auth-guard';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit {

  constructor(
    private workflowService: WorkflowService
  ) { }

  ngOnInit() {
  }

  public UploadImage() {

    console.log('To Do: Upload Image.');

  }

  public TakePicture() {

    console.log('To Do: Take Picture.');

  }

  public ManuallyDoIt() {

    console.log('To Do: Manually Do it.');

    this.workflowService.AccessScreen(CreateRecipeScreens.Edit);

  }

}
