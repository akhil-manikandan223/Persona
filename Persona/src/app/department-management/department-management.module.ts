import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
        RouterModule.forChild([
          { path: 'department-list', component: DepartmentListComponent },
          { path: '', redirectTo: 'department-list', pathMatch: 'full' },
          { path: 'department-details', component: DepartmentDetailsComponent}
        ])
  ]
})
export class DepartmentManagementModule { }
