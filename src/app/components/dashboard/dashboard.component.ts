import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdmin: string;
  allData;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.isAdmin = this.appService.currentUser.isAdmin;
    if(this.isAdmin) {
      this.appService.getAllShiftDetails().subscribe((data) => {
        console.log(data);
        this.allData = data;
      });
    }
  }

}
