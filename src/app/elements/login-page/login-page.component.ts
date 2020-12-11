import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service.ts';
import {User} from '../../interfaces/user-interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl( null, [
        Validators.required,
        Validators.minLength(6)
        ])
    });
  }

  public submit(isRegist?: boolean) {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      login: this.form.value.login,
      password: this.form.value.password
    };
    if (isRegist) {
      this.auth.register(user).subscribe((res) => {
          console.log(res);
          this.router.navigate(['/store']);
        },
        err => {
          console.log('err', err);
        });
    } else {
      this.auth.login(user).subscribe((res) => {
          console.log(res);
          this.router.navigate(['/store']);
        },
        err => {
          console.log('err', err);
        });
    }

    // this.auth.login(user).subscribe(() => {
    //   this.form.reset();
    //   //this.router.navigate(['/store']);
    // });
  }
}
