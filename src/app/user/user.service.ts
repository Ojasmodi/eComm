import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private validEmail: string = 'admin@admin.com';
  private validPassword: string = '12341234';

  constructor(private http: HttpClient) {}

  isUserAuthorised(): boolean {
    return localStorage.getItem('authToken') ? true : false;
  }

  login(data: { email: any; password: any }): Observable<any> {
    let result = {
      status: false,
      authToken: null,
      userName: null,
    };
    if (data.email == this.validEmail && data.password == this.validPassword) {
      return this.http.get<any>(`./../assets/responses/login.json`);
    }
    return of(result);
  }

  logout() {
    localStorage.clear();
  }
}
