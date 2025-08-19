import { Component, signal } from '@angular/core';
import { TaskForm } from  '../../src/app/task-form/task-form';
import { TaskList } from '../../src/app/task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [ TaskForm, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TASKMANAGER_UI');
}
