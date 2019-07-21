import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import {User} from '../model/user';
import {Technology} from '../model/technology';
import {UsersService} from '../users.service';


@Component({
  selector: 'app-set-rating',
  templateUrl: './set-rating.component.html',
  styleUrls: ['./set-rating.component.css'],
  providers: [UsersService]
})
export class SetRatingComponent implements OnInit {

  user: User;
  technology: Technology;
  ratings = [0, 1, 2, 3, 4, 5];
  selectedRating: string = null;
  @Output() showSnackBar = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public usersService: UsersService) {
  }

  showMessage(message: string) {
    this.showSnackBar.emit(message);
  }

  setRating() {
    // console.log(this.selectedRating);
    // console.log(this.user);
    // console.log(this.technology);
    this.usersService.setRating({
      userId: this.user.id,
      technologyId: this.technology.id,
      newRatingValue: this.selectedRating
    }).subscribe(() => {

      }, error => console.error(error)
    );
  }

  ngOnInit() {
    this.user = Object.assign({}, this.data.user);
    // console.log(this.user);
    this.technology = Object.assign({}, this.data.technology);
    // console.log(this.technology);
  }

}
