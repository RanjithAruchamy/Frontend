import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player, Personal, User } from './user.model';
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


  };
  personalUser: Personal ={
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    fatherName: "",
    motherName:"",
    permanentAddress:"",
    temporaryAddress:"",
    bloodGroup:"",
    dob:"",
    height:"",
    profession:"",
    organization:"",
    age: null
  };
  sportsUser: Player ={
    playerLevel: "",
    playerSkill:"",
    previousTeam:"",
    TNCA:"",
    KDCA:"",
    hobbies:"",
    goal:"",
    roleModel:"",
    strength:"",
    weakness:""
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

}
