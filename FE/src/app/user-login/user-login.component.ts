import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user-create/user-create.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  message = '';

  constructor(private userService: UserService) {}

  loginUser() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email!, password!).subscribe(
        (res) => {
          this.message = res.message;
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