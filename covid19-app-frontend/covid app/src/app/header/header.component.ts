import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  showUserProfileToggle : boolean = sessionStorage.getItem("username") != null;

  loggedInUserName : string | null = sessionStorage.getItem("username");

  currentPath! : string | null;
  
  @Input() showSignIn = false;

  constructor(private router: Router, public authService: AuthenticationService) {
    
  }

  ngOnInit(): void {
    console.log(" url "+this.router.url);
    console.log( " href "+ window.location.href);
    this.currentPath = window.location.href;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logOut() {
    sessionStorage.removeItem("username");
    this.showUserProfileToggle = false;
    this.router.navigate(['login'])
  }

}
