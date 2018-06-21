import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  domain = "http://localhost:3000/";

  constructor(private http: Http, private router: Router) { }

  registerUser(formData) {
    return this.http.post(this.domain + 'api/users',formData).map(res => res.json());
  }

  loginUser(formData) {
    return this.http.post(this.domain + 'api/auth',formData).map(res => {
      let result = res.json();
      if(result && result.token) {
        localStorage.setItem('token', result.token);
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if(!token) return null;

    let jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token);
  }

  submitShift(shift) {
    shift.userId = this.currentUser._id;
    return this.http.put(this.domain + 'api/users',shift).map(res => res.json());
  }

  getShiftDetails() {
    return this.http.get(this.domain + 'api/users/'+this.currentUser._id).map(res => res.json());
  }

  getAllShiftDetails() {
    return this.http.get(this.domain + 'api/users/').map(res => res.json());
  }
}
