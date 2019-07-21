import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef, MatPaginator} from '@angular/material';

import {UsersService} from '../users.service';
import {User} from '../model/user';
import {Technology} from '../model/technology';
import {SetRatingComponent} from '../set-rating/set-rating.component';
import {AddUserRatingComponent} from '../add-user-rating/add-user-rating.component';

export class LoginUser {
  id: string;
  full_name: string;
  town: string;
  email: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  providers: [UsersService]
})
export class UsersTableComponent implements OnInit {
  dataSource;
  users: User[] = [];
  loginUser: LoginUser;
  displayedColumns: string[] = ['fullName', 'town', 'ratings'];
  setRatingDialogRef: MatDialogRef<SetRatingComponent, any>;
  addRatingDialogRef: MatDialogRef<AddUserRatingComponent, any>;
  dataFilter = '';
  @Output() Loading = new EventEmitter<boolean>();
  @Output() showSnackBar = new EventEmitter<string>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.setLoad(true);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.setLoad(false);
  }

  clearDataFilter() {
    this.dataFilter = '';
    this.applyFilter('');
  }

  setLoad(loading: boolean) {
    this.Loading.emit(loading);
  }

  showMessage(message: string) {
    this.showSnackBar.emit(message);
  }

  constructor(private usersService: UsersService, public dialog: MatDialog) {
  }

  initDataSourceData(data) {
    this.users = data;

    // для поиска добавляем поле содержащее строку с технологиями пользователя
    this.users.forEach(user => {
      let technology_names = '';
      user.tech.forEach(tech => {
        const tech_name = tech.name;
        technology_names += tech_name;
      });
      user.technology_names = technology_names;
    });
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  openSetRatingDialog(technology: Technology, user: User) {
    this.setRatingDialogRef = this.dialog.open(SetRatingComponent, {
      width: '700px',
      disableClose: true,
      data: {
        technology,
        user
      }
    });

    this.setRatingDialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.showMessage(`изменен рейтинг сотрудника ${result.full_name}`);
        this.setLoad(true);
        this.usersService.getUsers().subscribe((data: User[]) => {
          this.initDataSourceData(data);
        }, error => {
          console.error(error);
          this.showMessage(`Произошла ошибка при изменении рейтинга`);
        }, () => this.setLoad(false));
      }
    });
  }

  openAddRatingDialog(user: User) {
    // console.log(user);
    this.addRatingDialogRef = this.dialog.open(AddUserRatingComponent, {
      width: '700px',
      disableClose: true,
      data: {
        user
      }
    });

    this.addRatingDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setLoad(true);
        this.usersService.getUsers().subscribe((data: User[]) => {
          this.initDataSourceData(data);
        }, error => console.error(error), () => this.setLoad(false));
      }
    });
  }

  ngOnInit() {
    this.setLoad(true);
    this.loginUser = this.usersService.checkLogin();
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.initDataSourceData(data);
    }, error => {
      console.error(error);
      this.showMessage('Произошла ошибка при загрузке списка сотрудников');
    }, () => this.setLoad(false));
  }
}
