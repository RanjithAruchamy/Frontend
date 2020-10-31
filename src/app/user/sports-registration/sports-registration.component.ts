import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Shared/User/user.model';
import { UserService } from '../../Shared/User/user.service'

@Component({
  selector: 'app-sports-registration',
  templateUrl: './sports-registration.component.html',
  styleUrls: ['./sports-registration.component.css'],
  providers:[UserService]
})
export class SportsRegistrationComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log("value:" + form.value)
  }
}
