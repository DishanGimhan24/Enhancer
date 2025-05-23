import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user-create/user-create.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <-- Import Router


@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  message = '';

  constructor(private userService: UserService, private router: Router) {} // <-- Inject Router

  loginUser() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email!, password!).subscribe(
        (res) => {
          this.message = res.message;
          this.router.navigate(['']); // <-- Navigate on success
        },
        (error) => {
          this.message = error.error?.message || 'Login failed.';
        }
      );
    } else {
      this.message = 'Please enter email and password.';
    }
  }
}