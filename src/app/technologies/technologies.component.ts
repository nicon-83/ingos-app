import {Component, EventEmitter, OnInit, Output, ViewChild, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef, MatPaginator} from '@angular/material';

import {TechService} from '../tech.service';
import {Technology} from '../model/technology';
import {AddTechnologyComponent} from '../add-technology/add-technology.component';
import {User} from '../model/user';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css'],
  providers: [TechService]
})
export class TechnologiesComponent implements OnInit {

  dataSource;
  technologies: Technology[] = [];
  displayedColumns: string[] = ['name', 'description'];
  dataFilter = '';
  addTechnologyDialogRef: MatDialogRef<AddTechnologyComponent, any>;
  @Output() Loading = new EventEmitter<boolean>();
  @Output() showSnackBar = new EventEmitter<string>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private techService: TechService, public dialog: MatDialog) {
  }

  initDataSourceData(data) {
    this.technologies = data;
    this.dataSource = new MatTableDataSource<Technology>(this.technologies);
    this.dataSource.paginator = this.paginator;
  }

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

  openAddTechnologyDialog() {
    this.addTechnologyDialogRef = this.dialog.open(AddTechnologyComponent, {
      width: '700px',
      disableClose: true
    });

    this.addTechnologyDialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result.technology) {
        this.setLoad(true);
        this.techService.getTechnologies().subscribe((data: User[]) => {
          this.initDataSourceData(data);
        }, error => {
          console.error(error);
          this.showMessage('Произошла ошибка при загрузке списка технологий');
        }, () => this.setLoad(false));
      }
      if (result.error) {
        this.showMessage(result.error);
      }
    });
  }

  ngOnInit() {
    this.setLoad(true);
    this.techService.getTechnologies().subscribe((data: Technology[]) => {
      this.initDataSourceData(data);
    }, error => {
      console.error(error);
      this.showMessage('Произошла ошибка при загрузке списка технологий');
    }, () => this.setLoad(false));
  }

}
