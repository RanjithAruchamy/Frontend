import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player, Personal, User, mail, reset } from './user.model';
import { Sport } from '../Sport/sport.model'
import { environment } from '../../../environments/environment';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User ={

    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword:""
    // userId:""

  };
  personalUser: Personal ={
    firstName: "",
    lastName: "",
    // userId:"",
    phoneNumber: "",
    email: "",
    gender: "",
    nationality:"",
    fatherName: "",
    fatherOccupation:"",
    motherName:"",
    motherOccupation:"",
    parentMobile:null,
    residenceNumber:null,
    parentEmail:"",
    permanentAddress:"",
    temporaryAddress:"",
    bloodGroup:"",
    dob:"",
    height:"",
    weight: null,
    profession:"",
    organization:"",
    age: null
  };
  sportsUser: Player ={
    playerLevel: "",
    playerSkill:{
      batsman:false,
      bowler:false,
      leftHand: false,
      rightHand:false,
      wicketKeeper:false,
      allRounder:false
    },
    previousTeam:"",
    TNCA:"",
    KDCA:"",
    hobbies:"",
    goal:"",
    strength:{
      general:"",
      cricket:""
    },
    weakness:{
      general:"",
      cricket:""
    },
    bowlerType:"",
    bowlerHand:"",
    battingHand:"",
    medical:"",
    roleModelReal:{
      name:"",
      reason:""
    },
    roleModelCricket:{
      name:"",
      reason:""
    },

  };
forgotpassword: mail={
  email:""
}
resetpassword: reset={
  email:"",
  password:"",
  newPassword:""
}


  constructor(private http: HttpClient) { }
//create new user
  postUser(user: User){
    const head = new HttpHeaders()
    .set('NoAuth', 'True')
    return this.http.post(environment.apiBaseUrl+'/register/user', user, {headers: head})
  }
//login
  login(authDetails){
    const head = new HttpHeaders()
    .set('NoAuth', 'True')
    return this.http.post(environment.apiBaseUrl+'/login', authDetails, {headers: head})
  }
//get user details
  getUser(){
    return this.http.get(environment.apiBaseUrl + '/user')

  }
//save token in local storage for upcoming api calls
  saveToken(token: string){
    localStorage.setItem('token', token)
  }
//get stoken
  getToken(){
    return localStorage.getItem('token')
  }
//delete token
  deleteToken(){
    localStorage.removeItem('token')
  }
//get logged in user data
  getUserPayload(){
    var token = this.getToken()
    if(token){
      var userPayload = atob(token.split('.')[1])
      return JSON.parse(userPayload);
    }
    else return null
  }
//check whether user loggedin or not
  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
    return userPayload.exp >Date.now() / 1000;
    else
    return false
  }
//update user data/table
  updateUser(user){
    console.log(user)
    return this.http.put(environment.apiBaseUrl + '/updateUser', user)
  }
//captcha verification
  verifyToken(token){
    return this.http.post(environment.apiBaseUrl + '/verifyCaptcha', {token: token})
  }
//forgot password
  forgotPassword(email){
    return this.http.post(environment.apiBaseUrl + '/forgotPassword', {email: email})
  }
//reset password
  resetPassword(data){
    return this.http.post(environment.apiBaseUrl + '/resetPassword', {email:data.email, password: data.password, newPassword: data.newPassword})
  }

// Upload files
  upload(payload, mail){
    return this.http.post<any>(environment.apiBaseUrl+'/upload?mail='+mail, payload)
  }

}
