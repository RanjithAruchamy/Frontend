import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Shared/User/user.service';
import { Router } from '@angular/router';
import { User } from '../Shared/User/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if  (!this.userService.isLoggedIn()){
        this.router.navigateByUrl('/login')
        this.userService.deleteToken()
      }
    return true;
  }

}
