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
import { ApiService } from '../../services/api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  toDoList: Task[] = [];
  inProgressList: Task[] = [];
  inReviewList: Task[] = [];
  doneList: Task[] = [];

  taskStatus = taskStatus;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.apiService
      .getTaskList()
      .pipe(
        map((responseData) => {
          const taskArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              taskArray.push({ ...responseData[key], id: key });
            }
          }
          return taskArray;
        })
      )
      .subscribe((response) => {
        this.filterTaskList(response);
      });
  }

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

  filterTaskList(taskList: Task[]) {
    this.toDoList = this.filterTask(taskList, taskStatus.toDo);
    this.inProgressList = this.filterTask(taskList, taskStatus.inProgress);
    this.inReviewList = this.filterTask(taskList, taskStatus.inReview);
    this.doneList = this.filterTask(taskList, taskStatus.done);
  }

  filterTask(taskList: Task[], status: string) {
    return taskList.filter((task) => task.status === status);
  }

  editTask($event: Task) {
    console.log($event);
    this.openTaskForm($event);
  }

  openTaskForm(data?: Task) {
    let dialogConfig: {
      width: string;
      data?: Task;
    } = {
      width: '300px',
    };

    if (data) {
      dialogConfig = { ...dialogConfig, data: data };
    }

    const dialogRef = this.dialog.open(TaskFormModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id === '') {
          this.apiService.createTask(result).subscribe((response) => {
            response;
          });
        } else {
          this.apiService
            .updateTask(result)
            .subscribe((response) => console.log(response));
        }
      }
    });
  }
}
