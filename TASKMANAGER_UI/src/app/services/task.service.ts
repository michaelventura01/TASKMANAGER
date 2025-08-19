
import { Injectable, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

import { TaskCreationDto, TaskDto } from '../models/task';
import { TASKS_ENDPOINT } from '../environment';

const TASKS_KEY = makeStateKey<TaskDto[]>('tasks');

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = TASKS_ENDPOINT;
  private taskSource = new BehaviorSubject<TaskDto | null>(null);
  currentTask$ = this.taskSource.asObservable();


  constructor(
    private http: HttpClient,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  setTask(task: TaskDto):void {
    this.taskSource.next(task);
  }


  getTasks(): Observable<TaskDto[]> {
    const stored = this.state.get(TASKS_KEY, null);

    if (stored) {
      return of(stored);
    }

    return this.http.get<TaskDto[]>(this.apiUrl).pipe(
      take(1),
      tap(tasks => {
        if (isPlatformServer(this.platformId)) {
          this.state.set(TASKS_KEY, tasks);
        }
      })
    );
  }

  getTask(id: string): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskCreationDto): Observable<TaskCreationDto> {
    return this.http.post<TaskCreationDto>(this.apiUrl, task);
  }

  updateTask(id: string, task: TaskDto): Observable<TaskDto> {
    return this.http.put<TaskDto>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
