import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../model/user';
import {MAT_DIALOG_DATA} from '@angular/material';
import {TechService} from '../tech.service';
import {UsersService} from '../users.service';

export interface Technology {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-add-user-rating',
  templateUrl: './add-user-rating.component.html',
  styleUrls: ['./add-user-rating.component.css'],
  providers: [UsersService, TechService]
})
export class AddUserRatingComponent implements OnInit {

  user: User;
  technologies: Technology[] = [];
  selectedTechnology = null;
  ratings = [0, 1, 2, 3, 4, 5];
  selectedRating: number = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private techService: TechService, private usersService: UsersService) {
  }

  addRating() {
    this.usersService.addRating({
      userId: this.user.id,
      technologyId: this.selectedTechnology,
      newRatingValue: this.selectedRating
    }).subscribe(() => {

      }, error => console.error(error)
    );
  }

  ngOnInit() {
    this.user = Object.assign({}, this.data.user);
    this.techService.getTechnologies().subscribe(
      (data: Technology[]) => {
        const availableTechnologies = data;
        const userTechnologies = this.user.tech || [];
        this.technologies = availableTechnologies.filter(avTech => userTechnologies.every(userTech => avTech.id !== userTech.id));
      }, error => console.log(error)
    );
  }

}
