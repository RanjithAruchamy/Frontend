export class User {

    firstName: String;
    lastName: String;
    phoneNumber: String;
    email: String;
    password: String;
}

export class Personal{
  firstName: String;
    lastName: String;
    phoneNumber: String;
    email: String;
    fatherName: String;
    motherName:String;
    permanentAddress:String;
    temporaryAddress:String;
    bloodGroup:String;
    age:Number;
    dob:String;
    height:String;
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
    roleModel:String;
    strength:String;
    weakness:String;
}
