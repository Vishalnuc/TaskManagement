import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from './task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }
  private apiURLPath = 'https://taskmanagementtms.azurewebsites.net/api/TaskManagement/'
  //private apiURLPath = 'https://taskmanagementtms.azurewebsites.net/';

  getAllTasks(): Observable<any> {
    return this.httpClient.get<any>(this.apiURLPath);
  }

  saveTask(taskData: ITask): Observable<ITask> {
    return this.httpClient.post<ITask>(this.apiURLPath, taskData);
  }

  deleteTask(taskID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURLPath}${taskID}`);

  }
}
