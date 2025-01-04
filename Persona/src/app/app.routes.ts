import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ConfirmPasswordComponent } from './authentication/components/confirm-password/confirm-password.component';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full',
        data: { breadcrumb: { title: 'Dashboard', icon: 'dashboard' } }
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: { breadcrumb: { title: 'Dashboard', icon: 'dashboard' } }
      },
      { 
        path: 'employee-management',
        loadChildren: () => import('./employee-management/employee-management.module').then(m => m.EmployeeManagementModule),
        data: { breadcrumb: { title: 'Manage Employees', icon: 'fund-projection-screen' } }
      },
      // {
      //   path: 'students-management', 
      //   loadChildren: () => import('./students-management/students-management.module').then(m => m.StudentsManagementModule),
      //   data: { breadcrumb: { title: 'Manage Students', icon: 'team' } }
      // },
      {
        path: 'club-management',
        loadChildren: () => import('./club-management/club-management.module').then(m => m.ClubManagementModule),
        data: { breadcrumb: {title: 'Clubs', icon: 'product'} }
      },
      // {
      //   path: 'grade-management',
      //   loadChildren: () => import('./grade-management/grade-management.module').then(m => m.GradeManagementModule),
      //   data: { breadcrumb: { title: 'Grades', icon: 'read' } }
      // },
      // {
      //   path: 'profile-management',
      //   loadChildren: () => import('./profile-management/profile-management.module').then(m => m.ProfileManagementModule),
      //   data: { breadcrumb: { title: 'Profile', icon: 'user' } }
      // },
      // {
      //   path: 'assignment-management',
      //   loadChildren: () => import('./assignments-management/assignments-management.module').then(m => m.AssignmentsManagementModule),
      //   data: { breadcrumb: { title: 'Assignments', icon: 'file-text' } }
      // },
      // {
      //   path: 'attendance-management',
      //   loadChildren: () => import('./attendance-management/attendance-management.module').then(m => m.AttendanceManagementModule),
      //   data: { breadcrumb: { title: 'Attendance', icon: 'solution' } }
      // },
      {
        path: 'department-management',
        loadChildren: () => import('./department-management/department-management.module').then(m => m.DepartmentManagementModule),
        data: { breadcrumb: { title: 'Departments', icon: 'block' } }
      }
    ],
  },
  {
    path: 'confirm-password',
    component: ConfirmPasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];
