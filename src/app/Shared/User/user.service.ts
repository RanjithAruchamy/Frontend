import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player, Personal, User } from './user.model';
import { Sport } from '../Sport/sport.model'
import { environment } from '../../../environments/environment';

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

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register/user', user)
  }

  verifyToken(token){
    return this.http.post(environment.apiBaseUrl + '/verifyCaptcha', {token: token})
  }
}
