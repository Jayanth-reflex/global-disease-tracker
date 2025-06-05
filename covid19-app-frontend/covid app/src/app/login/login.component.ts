import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;

  @Input() error!: string | null;

  constructor(
    private router: Router,
    private loginservice: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
        this.toastr.error("Username and password do not match", "Login Failed");
      }
    );
  }

}
