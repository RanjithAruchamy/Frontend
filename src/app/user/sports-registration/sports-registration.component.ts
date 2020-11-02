import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Shared/User/user.model';
import { UserService } from '../../Shared/User/user.service'

@Component({
  selector: 'app-sports-registration',
  templateUrl: './sports-registration.component.html',
  styleUrls: ['./sports-registration.component.css'],
  providers:[UserService]
})
export class SportsRegistrationComponent implements OnInit {
  showSuccessMessage: boolean;
  showErrorMessage: String;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
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
      "playerSkill":form.value.playerSkill,
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
    this.userService.updateUser(payload).subscribe(
    res => {
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 4000);},
    err => {
      this.showErrorMessage = 'Unable to save.'
      setTimeout(() => this.showErrorMessage = '', 4000)
    }
      )
  }
}
