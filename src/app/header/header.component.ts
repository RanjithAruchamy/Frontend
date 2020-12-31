import { Component, OnInit } from '@angular/core';
import { faSignOutAlt,faHome,faAddressBook,faInfoCircle,faUser } from '@fortawesome/free-solid-svg-icons';
import {UserService } from '../Shared/User/user.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  faHome = faHome;
  faInfoCircle = faInfoCircle;
  faUser = faUser;
  faAddressBook = faAddressBook;
  img;
  url1;
  url2;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userService.selectedUser.firstName = res["firstName"]
        this.userService.selectedUser.lastName = res["lastName"]
        this.userService.selectedUser.email = res["email"]
        this.userService.personalUser.files.profileImage.url = res["personal"].files.profileImage.url
        console.log(this.userService.personalUser.files.profileImage.url);
        this.url2 = this.userService.personalUser.files.profileImage.url
      }
    )
    this.url1 = '../../images/avatar.png'
    console.log(this.url2);
  }

  image(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.img = file;
      console.log(this.img);
      if(file.type == "image/jpeg" || file.type == "image/png")
      {
        if(file.size > 500000)  console.log("Please attach file within 500kb");
        else  this.upload();
      }
      else  console.log("Please attach only jpeg/jpg/png format.");

    }
  }
  upload(){
    const formData = new FormData()
    formData.append('file', this.img);
    this.userService.upload(formData, this.userService.selectedUser.email, 'image').subscribe(
      res => {
        console.log(res);
        this.url2 = res;
        this.url1 ="";
        err=>{
          console.log(err);

        }
      }
    )
  }
  logout(){
    this.userService.deleteToken()
    this.router.navigateByUrl('/')
  }
}
