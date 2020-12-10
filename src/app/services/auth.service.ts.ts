import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user-interface';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  //url = 'localhost:8080/api/user/authorize?login=Loman&password=anus';
  url = 'localhost:8080/api';
  private isAuth;
  constructor(private http: HttpClient) {
  }

  get token(): string {
    return '';
  }

  login(user: User): Observable<any> {
    this.isAuth = true;
    console.log('user = ', user);
    return this.http.get(this.url);
  }

  logout() {
    this.isAuth = false;
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  private setToken(resp) {
    console.log(resp);
  }
}
