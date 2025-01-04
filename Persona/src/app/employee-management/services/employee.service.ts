import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7188/api/Employee/getallemployees';
  private getByIdApiUrl = 'https://localhost:7188/api/Employee/getemployeebyid';
  private postApiUrl = 'https://localhost:7188/api/Employee/addemployee'; 

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.getByIdApiUrl}/${id}`);
  }

  addEmployee(employeeData: any): Observable <any> {
    return this.http.post<any>(this.postApiUrl, employeeData);
  }
}
