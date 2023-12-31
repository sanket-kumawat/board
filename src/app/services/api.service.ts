import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse, Task } from '../types/task';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTaskList() {
    return this.http.get<ApiResponse>(`${this.apiUrl}/task.json`);
  }

  createTask(body: Task) {
    return this.http.post(`${this.apiUrl}/task.json`, body);
  }

  updateTask(body: Task) {
    return this.http.patch(`${this.apiUrl}/task/${body.id}`, body);
  }
}
