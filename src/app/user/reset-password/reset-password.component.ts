import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Shared/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  showErrorMessage: String;
  constructor(public userService: UserService,private router: Router,) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    console.log(form.value)
    this.userService.resetPassword(form.value).subscribe(
      res =>{
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
        this.router.navigateByUrl('/login')
      },
      err =>{
        this.showErrorMessage = err.error.message
        setTimeout(() => {
          this.showErrorMessage = ''
          this.resetForm(form);
      }, 4000)
      }
    )
  }
  resetForm(form:NgForm){
this.userService.resetpassword = {
  email:"",
  password:"",
  newPassword:""
}
  }
}
