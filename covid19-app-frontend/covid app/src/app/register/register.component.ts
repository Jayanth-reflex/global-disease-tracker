import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserRegistrationRequest, UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserRegistrationRequest = new UserRegistrationRequest("", "", "", "", "");

  confirmPassword! : string;

  constructor(private userService : UserService, private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  processUserRegistration(): void {
    console.debug(this.user);
    if(this.user.email){
      console.log("inside If");
      if(this.confirmPassword === this.user.password){
        this.userService.registerUser(this.user).subscribe(data => {
          this.toastr.success("User created successfully.");
        }, (error) => {
          this.toastr.error("Username already exists");
        });
      }else{
        this.toastr.warning("Password and confirm password should match");
      }
    }else {
        this.toastr.warning("Please enter all the fields");
    }
    
    
  }

}
