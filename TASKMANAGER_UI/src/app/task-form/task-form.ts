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
  task: TaskDto = new TaskDto();
  statusOptions = Object.keys(TaskStatus)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      key,
      value: TaskStatus[key as keyof typeof TaskStatus]
    }));

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.currentTask$.subscribe(task => {
      if (task) {
        this.task = task;
      }
    });
  }

  onSubmit(): void {
    if(this.task.id === ''){
      this.saveTask(this.task)
    } else {
      this.editTask(this.task)
    }
  }

  saveTask(element:TaskDto):void{
    let task: TaskCreationDto = new TaskCreationDto() 
    task.createdAt = new Date(); 
    task.description = element.description;
    task.dueDate = element.dueDate;
    task.status = element.status;
    task.title = element.title;
  
    this.taskService.createTask(task).subscribe(() => {
      this.task = new TaskDto();
      this.taskService.setTask(element);
    });

  }
  editTask(element:TaskDto):void{
    this.taskService.updateTask(element.id||'0',element).subscribe(() => {
      this.task = new TaskDto();
      this.taskService.setTask(element);
    });
  }


  
}
