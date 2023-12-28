import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cardConfig: Task = {
    id: '',
    task: '',
    status: '',
    assignedTo: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
