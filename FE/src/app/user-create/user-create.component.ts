import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from './user-create.service';
import { User } from './user-create.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  loginForm: FormGroup; // Add this
  editMode = false;
  selectedUser: User | null = null;
  message: string = ''; // Add this

  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    // Initialize loginForm
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addUser() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        (user: User) => {
          this.users.push(user);
          this.userForm.reset();
        },
        (error) => {
          alert(error.error?.message || 'Failed to add user.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
    this.editMode = true;
    this.userForm.setValue({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  updateUser() {
    if (this.selectedUser && this.userForm.valid) {
      const updatedUser: User = {
        ...this.selectedUser,
        ...this.userForm.value,
      };

      this.userService.updateUser(updatedUser.id!, updatedUser).subscribe(
        () => {
          const idx = this.users.findIndex(u => u.id === updatedUser.id);
          if (idx > -1) this.users[idx] = updatedUser;
          this.cancelEdit();
        },
        (error) => {
          alert('Failed to update user.');
        }
      );
    }
  }

  deleteUser(user: User) {
    if (confirm('Delete this user?')) {
      this.userService.deleteUser(user.id!).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== user.id);
          if (this.selectedUser?.id === user.id) this.cancelEdit();
        },
        (error) => {
          alert('Failed to delete user.');
        }
      );
    }
  }

  cancelEdit() {
    this.selectedUser = null;
    this.editMode = false;
    this.userForm.reset();
  }

  // Move loginUser inside the class
  loginUser() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(
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