import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Shared/User/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  showErrorMessage: String;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.userService.forgotPassword(form.value.email).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err =>{
        this.showErrorMessage = err.error.message
        setTimeout(() => {
          this.showErrorMessage = ''
          // this.resetForm(form);
      }, 4000)
      }
    )
  }

  resetForm(form: NgForm){
    this.userService.forgotpassword ={
    email:""
    }
  }
}
