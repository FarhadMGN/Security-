import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user-interface';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  url = 'http://localhost:8080/api/user/authorize?login=Loman&password=anus';
  //url = 'http://localhost:8080/api/user';
  //url = 0;
  private isAuth;

  //'http://localhost:8080/api/user/authorize?login=' + user.login + '&password=' + user.password
  constructor(private http: HttpClient) {
  }

  get token(): string {
    return '';
  }

  login(user: User): Observable<any> {
    this.isAuth = true;
    console.log('user = ', user);
    return this.http.get('http://localhost:8080/api/user/authorize?login=' + user.login + '&password=' + user.password)
      .pipe(
        tap(this.setToken)
      );
  }

  logout() {
    this.isAuth = false;
  }

  register(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/api/user', user)
      .pipe(
      );
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  private setToken(resp) {
    console.log(resp);
  }
}
