import { Component, OnInit, Input } from '@angular/core';
import { Instruction } from '../../../models/instruction';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

  @Input() instruction: Instruction = new Instruction();

  constructor() { }

  ngOnInit() {
  }

}
