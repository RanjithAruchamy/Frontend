import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Shared/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  isHeader = true;;
  constructor( private route: Router, private userService : UserService){
    this.route.events.subscribe((event : any)=>{
      if(!this.userService.isLoggedIn()){
          this.isHeader = false;
      }else{
        this.isHeader = true;
      }
    });
  }
}
