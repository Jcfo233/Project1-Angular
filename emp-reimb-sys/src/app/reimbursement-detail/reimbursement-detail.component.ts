import { Component, OnInit, Input } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { ReimbursementService } from '../reimbursement.service';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reimbursement-detail',
  templateUrl: './reimbursement-detail.component.html',
  styleUrls: ['./reimbursement-detail.component.css']
})
export class ReimbursementDetailComponent implements OnInit {
  emp: Employee
  reimbValue: boolean = false
  manager: boolean
  reimb: Reimbursement
  submitted: string;
  resolved: boolean;

  constructor(
    private route: ActivatedRoute,
    private reimbService: ReimbursementService,
    private location: Location
  ) {
    this.emp=JSON.parse(localStorage.getItem('currentEmp'));
    this.manager = this.emp.role == "FINANCE_MANAGER";

  //  this.getReimb();
   }

  ngOnInit(): void {
    this.getReimb();
    console.log(this.reimb)
  }

  getReimb(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.reimbService.getReimb(id)
      .subscribe(reimb => {
        this.reimb = reimb[0];
        this.reimbValue = true;
        this.reimb.submitted = JSON.stringify(this.reimb.submitted);
        if(this.reimb.resolved == null){
          this.reimb.resolved = JSON.stringify(this.reimb.resolved);
          this.resolved = false;
        }else{
          this.resolved = true;
        }
        console.log(this.reimb);})
    // console.log(this.reimbService.getReimb(id));
    // this.reimbService.getReimb(id).pipe(
    //   map((value) => {
    //     this.reimb = value;
    //     console.log(this.reimb);
    //   })
    // ).subscribe();
    // console.log(this.reimb); <- Won't work cus above is async
    // Async functions are the worst. Give me a minute
  }

  goBack(): void {
    this.location.back();
  }

  approve() {
    this.reimb.resolver = this.emp.id;
    this.reimb.status = "APPROVED";
    this.reimbService.updateReimb(this.reimb).subscribe();
  }

  deny() {
    this.reimb.resolver = this.emp.id;
    this.reimb.status = "DENIED";
    this.reimbService.updateReimb(this.reimb).subscribe();
  }


}
