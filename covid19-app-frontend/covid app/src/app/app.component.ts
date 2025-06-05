
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-panel-layout';
  sideBarOpen = true;

  showSignIn!: boolean;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  
  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/login')) {
          this.showSignIn = false;
        } else {
          this.showSignIn = true;
        }
      }
    });
  }
}
