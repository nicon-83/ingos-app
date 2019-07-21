import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

export class User {
  first_name: string;
  mid_name: string;
  last_name: string;
  town: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsersService]
})

export class RegisterComponent implements OnInit {

  user: User = new User();
  loading = false;

  userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    mid_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private userService: UsersService, private router: Router, private snackBar: MatSnackBar) {
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

  register() {
    this.loading = true;
    this.userService.registerUser(this.user).subscribe((data: any) => {
      this.showSnackBar('Пользователь зарегистрирован, через несколько секунд вы будете перенаправлены на страницу входа');
      setTimeout(() => this.router.navigate(['/login']), 3000);
    }, error => {
      console.error(error);
      this.showSnackBar(error.error);
      this.loading = false;
    }, () => this.loading = false);
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
