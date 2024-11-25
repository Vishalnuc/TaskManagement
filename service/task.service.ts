import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from './task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }
  private apiURLPath = 'http://localhost:5073/api/TaskManagement/';

  getAllTasks(): Observable<any> {
    debugger;
    return this.httpClient.get<any>(this.apiURLPath);
  }

  saveTask(taskData: ITask): Observable<ITask> {
    debugger;
    return this.httpClient.post<ITask>(this.apiURLPath, taskData);
  }

  deleteTask(taskID: number): Observable<void> {
    debugger;
    return this.httpClient.delete<void>(`${this.apiURLPath}${taskID}`);

  }
}
