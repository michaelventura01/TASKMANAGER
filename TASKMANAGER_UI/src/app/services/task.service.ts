import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskCreationDto, TaskDto } from '../models/task';
import { TASKS_ENDPOINT } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = TASKS_ENDPOINT;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.apiUrl);
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
