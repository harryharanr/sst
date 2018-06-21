import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  canActivate() {
    if(this.appService.isLoggedIn()) return true;

    this.router.navigate(['/']);
    return false;
  }
}
