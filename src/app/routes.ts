import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { SportsRegistrationComponent } from './user/sports-registration/sports-registration.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component'
import { AuthGuard } from './auth/auth.guard';
import { from } from 'rxjs';


export const appRoutes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: RegisterComponent}]
  },
  {
    path: '', redirectTo:'/login', pathMatch: 'full'
  },
  {
    path:'login', component: UserComponent,
    children:[{path:'', component:LoginComponent}]
  },
  {
    path:'sportsRegistration', component:UserComponent, canActivate: [AuthGuard],
    children:[{ path:'', component: SportsRegistrationComponent}]
  },
  {
    path:'resetPassword', component:ResetPasswordComponent,
  },
  {
    path:'forgotPassword', component:ForgotPasswordComponent
  }
];
