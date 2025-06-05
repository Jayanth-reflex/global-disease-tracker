import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserRegistrationRequest, UserService } from '../user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  user: UserRegistrationRequest = new UserRegistrationRequest("", "", "", "", "");
  
  constructor(private userService : UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService
      .getUser(sessionStorage.getItem("username"))
      .subscribe(response => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response : any) {
    this.user = response.user;
  }

  processUserProfileUpdate(){
    this.userService
      .updateUser(this.user)
      .subscribe(response => {
        this.handleSuccessfulResponse(response)
        this.toastr.success("User data updated successfully");
      },(error) => {
        this.toastr.error(error.error.message);
      });
    
      
  }
}
