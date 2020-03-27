import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './models/employee';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { Login }  from './models/login'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private currentEmployeeSubject: BehaviorSubject<Employee>;
  public currentEmployee: Observable<Employee>;
  public isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient
    ) {
      this.currentEmployeeSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentEmployee = this.currentEmployeeSubject.asObservable();
      
     }

     public get currentUserValue(): Employee {
      return this.currentEmployeeSubject.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem("currentEmployee");
  }

  isLoggedIn(): Observable<boolean>{
    return this.isLoginSubject.asObservable();
  }

  login(username: string, password: string) {
    console.log(username);
    const login = new Login();
    login.username = username;
    login.password = password;
    this.http.post<boolean>(`http://localhost:8080/project1/login/${username}`, login)
    .pipe(map( data => {
        if (data) {
          this.http.get<Employee>(`http://localhost:8080/project1/login/${username}`)
          .pipe(map((data: any) => {
            localStorage.setItem('currentEmp', JSON.stringify(data));
            this.currentEmployeeSubject.next(data);
        })).subscribe();
      }
    }
    )).subscribe();
  }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentEmployee');
      this.currentEmployeeSubject.next(null);
  }
}
