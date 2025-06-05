import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'wishlist', component: WishlistComponent, canActivate:[AuthGaurdService]},
  { path: 'register', component: RegisterComponent},
  { path: 'update', component: ProfileUpdateComponent, canActivate:[AuthGaurdService]},
  { path: 'reset', component: PasswordResetComponent, canActivate:[AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
