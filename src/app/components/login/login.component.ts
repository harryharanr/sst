import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin:boolean = false;
  constructor(
      private fb : FormBuilder, 
      private appService: AppService,
      private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(255)]],
      password: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(255)]]
    });
  }

  loginUser() {
    this.appService.loginUser(this.loginForm.value).subscribe((result) => {
      if(result) {
        this.router.navigate(['dashboard']);
      } else {
        this.invalidLogin = true;
      }
    });
  }

  resetForm() {
    this.loginForm.reset();
  }


}
