

import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TaskService } from '../services/task.service';
import { TaskDto, TaskStatus } from '../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks: TaskDto[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      console.log(tasks)
      this.tasks = tasks
    });
  }

  updateTask(task: TaskDto): void {
    if (task.id) {
      this.taskService.updateTask(task.id, task).subscribe();
    }
  }

  deleteTask(id?: string): void {
    if (id) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  getStatusLabel(status: TaskStatus): string {
    return TaskStatus[status];
  }

}
