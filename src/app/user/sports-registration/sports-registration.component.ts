import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Shared/User/user.model';
import { UserService } from '../../Shared/User/user.service'
import { Router } from '@angular/router'
import { FnParam } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sports-registration',
  templateUrl: './sports-registration.component.html',
  styleUrls: ['./sports-registration.component.css'],
  providers:[UserService]
})
export class SportsRegistrationComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  showErrorMessage: String;
  playerDetails;
  constructor(
    public userService: UserService, private router: Router
  ) { }

selected:"";
address;

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res=> {
      this.userService.selectedUser.firstName = res["firstName"]
      this.userService.selectedUser.lastName = res["lastName"]
      this.userService.selectedUser.phoneNumber = res["phoneNumber"]
      this.userService.selectedUser.email = res["email"]
      // this.userService.selectedUser.userId = res["userId"]
      this.userService.personalUser = res["personal"]
      this.userService.sportsUser = res["sports"]

    }
    )
    }

    //upload files
    addressProof(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.address = file;
        console.log(this.address)
      }
    }
    onUpload(){
      const formData = new FormData()
      formData.append('file', this.address);
      console.log(formData);
      console.log(this.userService.selectedUser.email);

      this.userService.upload(formData, this.userService.selectedUser.email).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
//To save the data to db
    save(form:NgForm){
      const payload = {
        "personal":{
          'gender':form.value.gender,
          'nationality':form.value.nationality,
          'fatherName': form.value.fatherName,
          'fatherOccupation':form.value.fatherOccupation,
          'motherName': form.value.motherName,
          'motherOccupation':form.value.motherOccupation,
          'parentMobile':form.value.parentPhoneNumber,
          'residenceNumber':form.value.residenceNumber,
          'parentEmail':form.value.parentEmail,
          'permanentAddress': form.value.permAddress,
          'temporaryAddress': form.value.tempAddress,
          'bloodGroup': form.value.bloodGroup,
          'age': form.value.age,
          'dob': form.value.dob,
          'height': form.value.height,
          'weight':form.value.weight,
          'profession': form.value.profession,
          'organization': form.value.organization
      },"sports":{
        "playerLevel":form.value.playerLevel,
        "playerSkill":{
          'batsman':form.value.batsman,
          'bowler':form.value.bowler,
          'leftHand':form.value.leftHand,
          'rightHand':form.value.rightHand,
          'wicketKeeper':form.value.wicketKeeper,
          'allRounder':form.value.allRounder
        },
        "previousTeam":form.value.previousTeam,
        "TNCA":form.value.TNCA,
        "KDCA":form.value.KDCA,
        "hobbies":form.value.hobbies,
        "goal":form.value.goal,
        'strength':{
          'general':form.value.strengthGeneral,
          'cricket':form.value.strengthCricket
      },
      'weakness':{
          'general':form.value.weaknessGeneral,
          'cricket':form.value.weaknessCricket
      },
      'bowlerType':form.value.bowlerType,
      'bowlerHand':form.value.bowlerHand,
      'battingHand':form.value.battingHand,
      'medical':form.value.medical,
      'roleModelReal':{
          'name':form.value.roleModelRealName,
          'reason':form.value.roleModelRealReason
      },
      'roleModelCricket':{
          'name':form.value.roleModelCricketName,
          'reason':form.value.roleModelCricketReason
      }
      },
      "firstName":form.value.firstName,
      "lastName":form.value.lastName,
      "email": form.value.email
    }

      this.userService.updateUser(payload).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        location.reload();
      },
      err => {
        this.showErrorMessage = 'Unable to save.'
        setTimeout(() => this.showErrorMessage = '', 4000)
      }
        )
    }
  onSubmit(form: NgForm){
    if (!form.value.firstName) alert("FirstName is required")
    // else if (!form.value.lastName) alert("LastName is required")
    // else if (!form.value.dob) alert("DOB is required")
    // else if (!form.value.age) alert("Age is required")
    // else if (!form.value.bloodGroup) alert("Blood Group is required")
    // else if (!form.value.Height) alert("Height is required")
    else{
    const payload = {
      "personal":{
        'gender':form.value.gender,
        'nationality':form.value.nationality,
        'fatherName': form.value.fatherName,
        'fatherOccupation':form.value.fatherOccupation,
        'motherName': form.value.motherName,
        'motherOccupation':form.value.motherOccupation,
        'parentMobile':form.value.parentPhoneNumber,
        'residenceNumber':form.value.residenceNumber,
        'parentEmail':form.value.parentEmail,
        'permanentAddress': form.value.permAddress,
        'temporaryAddress': form.value.tempAddress,
        'bloodGroup': form.value.bloodGroup,
        'age': form.value.age,
        'dob': form.value.dob,
        'height': form.value.height,
        'weight':form.value.weight,
        'profession': form.value.profession,
        'organization': form.value.organization
    },"sports":{
      "playerLevel":form.value.playerLevel,
      "playerSkill":{
        'batsman':form.value.batsman,
        'bowler':form.value.bowler,
        'leftHand':form.value.leftHand,
        'rightHand':form.value.rightHand,
        'wicketKeeper':form.value.wicketKeeper,
        'allRounder':form.value.allRounder
      },
      "previousTeam":form.value.previousTeam,
      "TNCA":form.value.TNCA,
      "KDCA":form.value.KDCA,
      "hobbies":form.value.hobbies,
      "goal":form.value.goal,
      'strength':{
        'general':form.value.strengthGeneral,
        'cricket':form.value.strengthCricket
    },
    'weakness':{
        'general':form.value.weaknessGeneral,
        'cricket':form.value.weaknessCricket
    },
    'bowlerType':form.value.bowlerType,
    'bowlerHand':form.value.bowlerHand,
    'battingHand':form.value.battingHand,
    'medical':form.value.medical,
    'roleModelReal':{
        'name':form.value.roleModelRealName,
        'reason':form.value.roleModelRealReason
    },
    'roleModelCricket':{
        'name':form.value.roleModelCricketName,
        'reason':form.value.roleModelCricketReason
    }
    },
    "firstName":form.value.firstName,
    "lastName":form.value.lastName,
    "email": form.value.email,
    "admin":{
      "isSubmitted":true,
      'isApproved':null,
      'followUp1':null,
      'followUp2':null,
      'activatedAt':null
    }
  }

    this.userService.updateUser(payload).subscribe(
    res => {
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 4000);
      location.reload();
    },
    err => {
      this.showErrorMessage = 'Unable to save.'
      setTimeout(() => this.showErrorMessage = '', 4000)
    }
      )
  }
  }
}
