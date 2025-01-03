import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'confirm-password',
        component: ConfirmPasswordComponent
      }
    ])
  ]
})
export class AuthenticationModule { }
