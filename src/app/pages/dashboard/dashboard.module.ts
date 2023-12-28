import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DashboardComponent } from './dashboard.component';
import { CardModule } from '../../components/card/card.module';
import { TaskFormModalModule } from '../../components/task-form-modal/task-form-modal.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    CardModule,
    TaskFormModalModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
