import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService]
})

export class LoginComponent implements OnInit {

  user: User = new User();
  loading = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UsersService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    this.loading = true;
    this.userService.login(this.user).subscribe((data: any) => {
      localStorage.setItem('user', JSON.stringify(data[0]));
      this.router.navigate(['/main']);
    }, error => {
      console.error(error);
      this.showSnackBar('Ошибка! Неверный логин или пароль.');
      this.loading = false;
    }, () => this.loading = false);
  }
}
