import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = 'https://localhost:7188/api/Club/getallclubs';
  private getByIdApiUrl = 'https://localhost:7188/api/Club/getclubbyid';
  private postApiUrl = 'https://localhost:7188/api/Club/addclubs'; 
  private totalCountUrl = 'https://localhost:7188/api/Club/gettotalclubmembers';
  private totalCountByIdUrl = 'https://localhost:7188/api/Club/gettotalclubmembers';
  private totalEmployeeCountByIdUrl = 'https://localhost:7188/api/Club/gettotalemployeemembers';
  private totalStudentCountByIdUrl = 'https://localhost:7188/api/Club/gettotalstudentmembers';
  private employeeListByClubIdUrl = 'https://localhost:7188/api/Club/getemployeemembersbyclubid';
  private studentsListByClubIdUrl = 'https://localhost:7188/api/Club/getstudentmembersbyclubid';
  
  constructor(private http: HttpClient) { }

  getAllClubs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getClubById(id: string): Observable<any> {
    return this.http.get<any>(`${this.getByIdApiUrl}/${id}`);
  }

  addClubs(clubData: any): Observable <any> {
    return this.http.post<any>(this.postApiUrl, clubData);
  }

  getTotalCount() : Observable<any[]> {
    return this.http.get<any[]>(this.totalCountUrl);
  }

  getTotalCountById(clubId: string) : Observable<any[]> {
    return this.http.get<any[]>(`${this.totalCountByIdUrl}/${clubId}`);
  }

  getTotalEmployeeCountById(clubId: string) : Observable<any[]> {
    return this.http.get<any[]>(`${this.totalEmployeeCountByIdUrl}/${clubId}`);
  }

  getTotalStudentCountById(clubId: string) : Observable<any[]> {
    return this.http.get<any[]>(`${this.totalStudentCountByIdUrl}/${clubId}`);
  }

  getEmployeeMembersByClubId(clubId: string): Observable<any> {
    return this.http.get<any>(`${this.employeeListByClubIdUrl}/${clubId}`);
  }

  getStudentMembersByClubId(clubId: string): Observable<any> {
    return this.http.get<any>(`${this.studentsListByClubIdUrl}/${clubId}`);
  }
}
