import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export class User {

    firstName: String;
    lastName: String;
    phoneNumber: String;
    email: String;
    password: String;
    confirmPassword: String;
    // userId: String;

}

export class Personal{
    firstName: String;
    lastName: String;
    // userId: String;
    phoneNumber: String;
    email: String;
    gender: String;
    nationality: String;
    fatherName: String;
    fatherOccupation: String;
    motherName:String;
    motherOccupation: String;
    parentMobile: number;
    residenceNumber: number;
    parentEmail: String;
    permanentAddress:String;
    temporaryAddress:String;
    bloodGroup:String;
    age:Number;
    dob:String;
    height:String;
    weight: number;
    profession:String;
    organization:String;
}

export class Player{
  playerLevel: String;
    playerSkill:{
        batsman:Boolean;
        bowler:Boolean;
        leftHand: Boolean;
        rightHand:Boolean;
        wicketKeeper:Boolean;
        allRounder:Boolean;
    };
    previousTeam:String;
    TNCA:String;
    KDCA:String;
    hobbies:String;
    goal:String;
    strength:{
      general: String;
      cricket: String;
    }
    weakness:{
      general: String;
      cricket: String;
    }
    bowlerType: String;
    bowlerHand: String;
    battingHand: String;
    medical: String;
    roleModelReal:{
      name: String;
      reason: String;
    }
    roleModelCricket: {
      name: String;
      reason: String;
    }

}

export class mail{
  email:String;
}
export class reset{
  email:String;
  password: String;
  newPassword: String;
}
