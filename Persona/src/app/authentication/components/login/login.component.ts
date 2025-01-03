import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { NgZorroModule } from '../../../shared/Ng-ZorroModules';

@Component({
  selector: 'app-login',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, CommonModule, NgZorroModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [NzMessageService]
})
export class LoginComponent {

  loginForm!: FormGroup;
  isLoading = false;
  checked = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.initForm();
    });
  }

  ngOnInit(): void {
    this.initForm();
    if (localStorage.getItem('isLoggedIn')) {
      this.login();
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberme: ['']
    });
    this.isLoading = false;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/layout/admin']).then(() => {
        this.message.success('Logged in successfully')
        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
        console.error('Navigation error:', err);
      });
    } 
  }


  forgotPassword(): void {
    this.router.navigate(['./forgot-password'])
  }

}
