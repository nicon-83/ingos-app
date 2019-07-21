import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {UsersTableComponent} from './users-table/users-table.component';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatListModule,
  MatTooltipModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule, MatTabsModule
} from '@angular/material';
import {SetRatingComponent} from './set-rating/set-rating.component';
import {AddUserRatingComponent} from './add-user-rating/add-user-rating.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TechnologiesComponent} from './technologies/technologies.component';
import {AddTechnologyComponent} from './add-technology/add-technology.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    SetRatingComponent,
    AddUserRatingComponent,
    TechnologiesComponent,
    AddTechnologyComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatInputModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SetRatingComponent, AddUserRatingComponent, AddTechnologyComponent]
})
export class AppModule {
}
