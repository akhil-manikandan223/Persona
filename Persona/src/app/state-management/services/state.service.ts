import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private apiUrl = 'https://localhost:7188/api/State/getallstates';
  private getByIdApiUrl = 'https://localhost:7188/api/Teacher/getteacherbyid';
  private postApiUrl = 'https://localhost:7188/api/Teacher/addteacher'; 

  constructor(private http: HttpClient) { }

  getAllStates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTeacherById(id: string): Observable<any> {
    return this.http.get<any>(`${this.getByIdApiUrl}/${id}`);
  }

  addTeachers(teacherData: any): Observable <any> {
    return this.http.post<any>(this.postApiUrl, teacherData);
  }
}