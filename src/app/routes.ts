import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { SportsRegistrationComponent } from './user/sports-registration/sports-registration.component';

export const appRoutes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: RegisterComponent}]
  },
  {
    path: '', redirectTo:'/signup', pathMatch: 'full'
  },
  {
    path:'login', component: UserComponent,
    children:[{path:'', component:LoginComponent}]
  },
  {
    path:'sportsRegistration', component:UserComponent,
    children:[{ path:'', component: SportsRegistrationComponent}]
  }

];
