import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Shared/User/user.model';
import { UserService } from '../../Shared/User/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sports-registration',
  templateUrl: './sports-registration.component.html',
  styleUrls: ['./sports-registration.component.css'],
  providers:[UserService]
})
export class SportsRegistrationComponent implements OnInit {
  showSuccessMessage: boolean;
  showErrorMessage: String;
  playerDetails;
  constructor(
    public userService: UserService, private router: Router
  ) { }



  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res=> {
      this.userService.selectedUser.firstName = res["firstName"]
      this.userService.selectedUser.lastName = res["lastName"]
      this.userService.personalUser = res["personal"]
      this.userService.sportsUser = res["sports"]

    }
    )
    }

  onSubmit(form: NgForm){

    const payload = {"personal":{
      "fatherName":form.value.fatherName,
      "motherName":form.value.motherName,
      "permanentAddress":form.value.permAddress,
      "temporaryAddress":form.value.tempAddress,
      "bloodGroup":form.value.bloodGroup,
      "age":form.value.age,
      "dob":form.value.dob,
      "height":form.value.height,
      "profession":form.value.profession,
      "organization":form.value.organization
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
      "roleModel":form.value.roleModel,
      "strength":form.value.strength,
      "weakness":form.value.weakness
    },
    "firstName":form.value.firstName,
    "lastName":form.value.lastName
  }
  console.log(payload)
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
