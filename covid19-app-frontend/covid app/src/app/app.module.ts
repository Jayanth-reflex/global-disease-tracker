import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RegisterComponent } from './register/register.component';
import {DialogModule} from 'primeng/dialog';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SidenavComponent,
    LoginComponent,
    WishlistComponent,
    RegisterComponent,
    ProfileUpdateComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    FormsModule,
    MatButtonModule,
    DialogModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}