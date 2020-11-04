import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Shared/User/user.service';
import { Router } from '@angular/router'
import { nextTick } from 'process';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showErrorMessage: String;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.saveToken(res['token']);
        this.router.navigateByUrl('/sportsRegistration')
        this.resetForm(form);
      },
      err => {
        this.showErrorMessage = err.error.message
        setTimeout(() => {
          this.showErrorMessage = ''
          this.resetForm(form);
      }, 4000)

      }
    )
  }
  resetForm(form: NgForm){
    this.userService.selectedUser ={
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: ""
    };
    form.resetForm();
    this.showErrorMessage = '';
  }
}
