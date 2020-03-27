import { Component, OnInit, Input } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementService } from "../reimbursement.service";
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  emp: Employee
  reimb: Reimbursement = new Reimbursement()

  manager: boolean
  employee: boolean 

  reimbForm: FormGroup;


  
  reimbs:  Observable<Reimbursement[]>;
  constructor(
    private reimbService: ReimbursementService,
    private fb: FormBuilder
  ) { 
    this.emp = JSON.parse(localStorage.getItem('currentEmp'));
    console.log(this.emp);
    this.manager = this.emp.role == "FINANCE_MANAGER";
    this.employee = this.emp.role == "EMPLOYEE";
  }

  
  ngOnInit(): void {
    this.getReimbs();
    this.reimbForm = this.fb.group({
      amount: [''],
      description: [''],
      type: ['OTHER'],
      receipt: ['']
    })
  }

  getReimbs(): void {
    if(this.manager){
    this.reimbs = this.reimbService.getReimbs();
    }else{
    this.reimbs = this.reimbService.getAuthorReimb(this.emp.username)
    }
  }

  getPending(): void {
     this.reimbs = this.reimbService.getReimbStatus("PENDING");
      
    }
  
  getApproved(): void {
    this.reimbs = this.reimbService.getReimbStatus("APPROVED");
  }

  getDenied(): void {
    this.reimbs = this.reimbService.getReimbStatus("DENIED");
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.reimb.receipt = reader.result;
      }
    }
  }
  onSubmit(){
    console.log(this.emp);
    this.reimb.author = this.emp.id;
    this.reimb.amount = this.reimbForm.controls.amount.value;
    this.reimb.description = this.reimbForm.controls.description.value;
    this.reimb.type = this.reimbForm.controls.type.value;
    this.reimbService.addReimb(this.reimb).subscribe();
  }
}
