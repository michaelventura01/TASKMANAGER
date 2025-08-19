

import { ChangeDetectorRef, Component, Inject, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { TaskService } from '../services/task.service';
import { TaskDto, TaskStatus } from '../models/task';


const TASKS_KEY = makeStateKey<TaskDto[] | null>('tasks');

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

  constructor(
      private taskService: TaskService,
      private state: TransferState,
      @Inject(PLATFORM_ID) private platformId: Object,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskService.currentTask$.subscribe(task => {
      if (task) {
        this.loadTasks();
      }
    });
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading tasks', err),
    });
  }

  getTotalTasks():number{
    return this.tasks.length
  }

  getTotalCompletedTasks():number{
    return this.tasks.filter(task=>task.status === TaskStatus.Completed).length
  }

  deleteTask(id?: string): void {
    if (!id) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error('Failed to delete task:', err);
      }
    });
  }

  isCompletedTask(status: TaskStatus):boolean{
    return status === TaskStatus.Completed;
  }
  isPendingTask(status: TaskStatus):boolean{
    return status === TaskStatus.Pending;
  }

  setItemClass(status: TaskStatus){
    switch(status){
      case TaskStatus.InProgress: return 'itemPending';
      case TaskStatus.Completed: return 'itemCompleted';
      default: return '';
    }
  }

  getStatusLabel(status: TaskStatus): string {
    return TaskStatus[status];
  }

  selectTask(task:TaskDto){
    this.taskService.setTask(task);
  }


}
