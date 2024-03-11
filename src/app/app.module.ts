import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DirectorViewComponent } from './director-view/director-view.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { GenreViewComponent } from './genre-view/genre-view.component';

const appRoutes: Routes = [
  { path: "welcome", title: "Welcome", component: WelcomePageComponent },
  { path: "movies", title: "Movies", component: MainViewComponent },
  { path: "profile", title: "Profile", component: ProfilePageComponent},
  { path: "", title: "Welcome", redirectTo: "welcome", pathMatch: "prefix" },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    DirectorViewComponent,
    ToolbarComponent,
    MainViewComponent,
    GenreViewComponent
  ],
  imports: [
    [RouterModule.forRoot(appRoutes)],
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }