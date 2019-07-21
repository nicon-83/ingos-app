import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {UsersService} from '../users.service';

export class User {
  id: string;
  first_name: string;
  mid_name: string;
  last_name: string;
  full_name: string;
  town: string;
  email: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [UsersService]
})
export class MainComponent implements OnInit {
  loading = true;
  user: User;

  constructor(private router: Router, private snackBar: MatSnackBar, private userService: UsersService) {
  }

  login() {
    this.router.navigate(['/login']);
  }

  onLoad(loading: boolean) {
    setTimeout(() => this.loading = loading, 0);
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.user = this.userService.checkLogin();
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }

  goToUserProfile() {
    this.router.navigate(['/userProfile']);
  }
}

