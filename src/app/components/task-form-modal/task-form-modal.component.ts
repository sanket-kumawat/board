import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../types/task';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
})
export class TaskFormModalComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      task: ['', Validators.required],
      assignedTo: ['', Validators.required],
    });

    if (this.data) {
      this.taskForm.patchValue({
        task: this.data.task,
        assignedTo: this.data.assignedTo,
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.taskForm.value);
  }
}
