import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TaskCreationDto, TaskDto, TaskStatus } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  task: TaskCreationDto = new TaskCreationDto();
  statusOptions = Object.keys(TaskStatus)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      key,
      value: TaskStatus[key as keyof typeof TaskStatus]
    }));

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.task.createdAt = new Date();  

    this.taskService.createTask(this.task).subscribe(() => {
      this.task = new TaskCreationDto();
      window.location.reload()
    });
  }


  
}
