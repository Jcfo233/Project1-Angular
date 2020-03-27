import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean;
  empObs: Observable<Employee>;
  salt = bcrypt.genSaltSync(10);
  uploadForm: FormGroup;
  username: string; 
  password: string;
  constructor(
    private loginserv: LoginService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      username: "",
      password: ""
    })
    this.loginserv.isLoggedIn().subscribe(value  => this.isLoggedIn)
  }

  onSubmit(): void {
    this.username = this.uploadForm.controls.username.value;
    this.password = this.uploadForm.controls.password.value;
    this.loginserv.login(this.username, this.password);
    this.loginserv.isLoggedIn().subscribe(value => this.isLoggedIn);
  }

  logout() {
    this.loginserv.logout();
  }
}
