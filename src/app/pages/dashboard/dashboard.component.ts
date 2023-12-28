import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { taskStatus } from 'src/app/constants/taskStatus';
import { Task } from 'src/app/types/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormModalComponent } from 'src/app/components/task-form-modal/task-form-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  taskList: Task[] = [
    { id: '1', task: 'abcd', status: '1', assignedTo: 'Sanket1' },
    { id: '2', task: 'efgh', status: '2', assignedTo: 'Sanket2' },
    { id: '3', task: 'jklm', status: '3', assignedTo: 'Sanket3' },
    { id: '4', task: 'nopq', status: '4', assignedTo: 'Sanket4' },
  ];
  toDoList: Task[] = [
    { id: '1', task: 'abcd', status: '1', assignedTo: 'Sanket1' },
    { id: '1', task: 'abcd', status: '1', assignedTo: 'Sanket1' },
    { id: '1', task: 'abcd', status: '1', assignedTo: 'Sanket1' },
  ];
  inProgressList: Task[] = [
    { id: '2', task: 'efgh', status: '2', assignedTo: 'Sanket2' },
    { id: '2', task: 'efgh', status: '2', assignedTo: 'Sanket2' },
    { id: '2', task: 'efgh', status: '2', assignedTo: 'Sanket2' },
  ];
  inReviewList: Task[] = [
    { id: '3', task: 'jklm', status: '3', assignedTo: 'Sanket3' },
    { id: '3', task: 'jklm', status: '3', assignedTo: 'Sanket3' },
  ];
  doneList: Task[] = [
    { id: '4', task: 'nopq', status: '4', assignedTo: 'Sanket4' },
    { id: '4', task: 'nopq', status: '4', assignedTo: 'Sanket4' },
  ];

  taskStatus = taskStatus;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openTaskForm() {
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
      console.log('The dialog was closed');
    });
  }
}
