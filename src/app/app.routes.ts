import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    // Default route
    { path: '', component: HomeComponent
     },
    // Specific routes
    // { path: 'home', component: HomeComponent },
    // { path: 'about', component: AboutComponent },
    // // Wildcard route for 404 handling
    // { path: '**', component: NotFoundComponent }
];
