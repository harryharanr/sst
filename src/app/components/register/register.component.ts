import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
      private fb : FormBuilder, 
      private appService: AppService,
      private router: Router
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      email: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(255)]],
      password: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(255)]]
    });
  }

  registerUser() {
    this.appService.registerUser(this.registrationForm.value).subscribe((result) => {
      this.router.navigate(['']);
    });
  }

  resetForm() {
    this.registrationForm.reset();
  }

}
