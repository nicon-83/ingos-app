import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TechService} from '../tech.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export class Technology {
  name: string;
  description: string;
}

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.css'],
  providers: [TechService]
})

export class AddTechnologyComponent implements OnInit {

  technology: Technology = new Technology();
  error: any = null;

  techForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  constructor(private techService: TechService) {
  }

  addTechnology() {
    this.techService.addTechnology(this.technology).subscribe(() => {

    }, error => {
      console.error(error);
      this.error = error;
    });
  }

  ngOnInit() {

  }

}
