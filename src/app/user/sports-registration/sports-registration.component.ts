import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Shared/User/user.model';
import { UserService } from '../../Shared/User/user.service'
import { Router } from '@angular/router'
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

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
  faUpload = faUpload;
  selected:"";
  address;
  date;
  mindate;
  addressfileErr;
  idfileErr;
  birthfileErr;
  // fileSuccess;
  addressUploaded: boolean;
  idUploaded: boolean;
  birthUploaded: boolean;
  imageUploaded: boolean;
  isSubmitted: boolean;
  addressFileName;
  idFileName;
  birthFileName;
  confirmButt:boolean;
  constructor(
    public userService: UserService, private router: Router
  ) {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    this.mindate = `${year - 6}-${month}-${date}`;
   }



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
      // this.userService.personalUser.files = res["personal"]
      // console.log(this.userService.personalUser.files)
      this.date = this.userService.personalUser.dob;
      this.isSubmitted = res['admin'].isSubmitted

    }
    )
    }

confirm(event){
  if(event.target.checked == true)  this.confirmButt = true;
  else  this.confirmButt= false;
}

//getage dynamically based on DOB
    getAge = birthDate => {
      let op = Math.floor(( Date.now() - new Date(birthDate).getTime())/ 3.15576e+10)
      this.userService.personalUser.age = op;
    }

    //upload files
    addressProof(event, files) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.address = file;
        if( files == 'address'){
          this.addressFileName = this.address.name
          if(file.type == 'application/pdf') {
            if(file.size > 700000)  this.addressfileErr = "Please attach file with 700kb";
            else {
              this.onUpload(files)
              this.addressfileErr = "";}
            }
          else  this.addressfileErr = "Please attach only PDF file.";
          this.addressUploaded = false;
        }
        if( files == 'id') {
          this.idFileName = this.address.name
          if(file.type == 'application/pdf')  {
            if(file.size > 700000)  this.addressfileErr = "Please attach file with 700kb";
            else  {
              this.onUpload(files)
              this.idfileErr = "";}
          }
          else  this.idfileErr = "Please attach only PDF file.";
          this.idUploaded = false;
        }
        if( files == 'birth') {
          this.birthFileName = this.address.name
          if(file.type == 'application/pdf')  {
            if(file.size > 700000)  this.addressfileErr = "Please attach file with 700kb";
            else  {
              this.onUpload(files)
              this.birthfileErr = "";}
          }
          else  this.birthfileErr = "Please attach only PDF file.";
          this.birthUploaded = false;
        }
        if( files == 'image') this.imageUploaded = false;
        // console.log(file.size);



      }
    }
    onUpload(files){
      const formData = new FormData()
      formData.append('file', this.address);
      //  console.log(formData);
      // console.log(this.userService.selectedUser.email);

      this.userService.upload(formData, this.userService.selectedUser.email, files).subscribe(
        (res) => {
          let op = res.split(" ")
          if(op[1] == "address") {
            this.addressUploaded = true
          }
          else if(op[1] == "id") {
            this.idUploaded = true
          }
          else if(op[1] == "birth") {
            this.birthUploaded = true
          }
          else if(op[1] == "image") {
            this.imageUploaded = true
          }
          // console.log(op[1]);

        },
        (err) => console.log(err)
      );
    }
//To save the data to db
    save(form:NgForm){
      this.userService.personalUser.dob = this.date;
      const payload = {
        "personal":this.userService.personalUser,
        "sports":this.userService.sportsUser,
      "firstName":this.userService.selectedUser.firstName,
      "lastName":this.userService.selectedUser.lastName,
      "email": this.userService.selectedUser.email,
      "phoneNumber":this.userService.selectedUser.phoneNumber
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
      "personal":this.userService.personalUser,
      "sports":{
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
