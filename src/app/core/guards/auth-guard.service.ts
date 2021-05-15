import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(): boolean {
    if (!this.userService.isUserAuthorised()) {
      this.toastr.warning('Please login first');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
