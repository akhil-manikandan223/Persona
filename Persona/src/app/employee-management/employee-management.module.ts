import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'employee-list', component: EmployeeListComponent },
      { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
      { path: 'employee-details', component: EmployeeDetailsComponent}
    ])
  ]
})
export class EmployeeManagementModule { }
