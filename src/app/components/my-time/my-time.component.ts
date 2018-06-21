import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-time',
  templateUrl: './my-time.component.html',
  styleUrls: ['./my-time.component.css']
})
export class MyTimeComponent implements OnInit {

  myTimeComponentForm: FormGroup;
  shifts = [];
  constructor(
    private fb : FormBuilder, 
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.getShiftDetails();
  }

  createForm() {
    this.myTimeComponentForm = this.fb.group({
      date: ['',[Validators.required]],
      shift: ['',[Validators.required]]
    });
  }

  submitShift() {
    this.appService.submitShift(this.myTimeComponentForm.value).subscribe((val) => {
      this.myTimeComponentForm.reset();
      this.getShiftDetails();
    });
  }

  getShiftDetails() {
    this.appService.getShiftDetails().subscribe((result) => {
      this.shifts = result;
    });
  }
}
