# Movie App Client in Angular

The client-side of a CRUD movie application built with Angular and Angular Material.  It works with the server-side code for a REST API and database built with Node.js, Express.js, and MongoDB.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

## Features

- Users can create an account and login.
- Users can browse a list of movies.
- View more details about a movie.
- View director information.
- View genre information.
- Users can add and remove movies from their list of favorite movies.
- Users can view their account information and their list of favorite movies on the profile page.
- Users can update their account information on the profile page.
- Users can loggout of the application and delete their accounts.

## Getting Started

To clone this repository, use `git clone https://github.com/kellysdev/movie-Angular-client.git`.

From the working directory, install the app's dependencies with `npm install`.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build --base-href /movie-Angular-client/` to build the project. The build artifacts will be stored in the `dist/` directory.

### Deploy

Run `ng deploy --base-href=/movie-Angular-client/` to deploy the project to GitHub pages with angular-cli-ghpages.

## Future Updates

- [ ] Add director images.
- [ ] Display all movies for a director in the director dialog.
- [ ] Display all movies for a genre in the genre dialog.
- [ ] Add search functionality.
- [ ] Allow users to curate a "To Watch" list.
