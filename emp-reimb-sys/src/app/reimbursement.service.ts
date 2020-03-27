import { Injectable, Input } from '@angular/core';
import { Reimbursement } from './models/reimbursement';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from './models/employee';
@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
  constructor(
    private http: HttpClient
  ) { }

  getReimbs (): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>("http://localhost:8080/project1/reimbursement")
      .pipe(
        catchError(this.handleError<Reimbursement[]>('getReimbs', []))
      );
  }

  getReimb (id: number): Observable<Reimbursement> {
    return this.http.get<Reimbursement>(`http://localhost:8080/project1/reimbursement/detail/${id}`)
      .pipe(
        catchError(this.handleError<Reimbursement>('getReimbs', ))
      )
  }

  getAuthorReimb (id: String): Observable<Reimbursement[]> {
      const url = `http://localhost:8080/project1/reimbursement/${id}`
      return this.http.get<Reimbursement[]>(url).pipe(
        catchError(this.handleError<Reimbursement[]>(`getHero id=${id}`))
      );
  }

  getReimbStatus (status: String): Observable<Reimbursement[]> {
      const url =  `http://localhost:8080/project1/reimbursement/${status}`
      return this.http.get<Reimbursement[]>(url).pipe(
        catchError(this.handleError<Reimbursement[]>('getReimbStatus', []))
      );
  }

  updateReimb (reimb: Reimbursement): Observable<Reimbursement> {
    return this.http.post("http://localhost:8080/project1/reimbursement/update", reimb).pipe(
      catchError(this.handleError<any>('updateReimb'))
    );
  }

  addReimb(reimb: Reimbursement): Observable<Reimbursement> {
    return this.http.post("http://localhost:8080/project1/reimbursement/add", reimb).pipe(
      catchError(this.handleError<any>('addReimb'))
    );
  }
}
