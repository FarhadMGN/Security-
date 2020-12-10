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
    private auth: AuthService
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

  public submit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      login: this.form.value.login,
      password: this.form.value.password
    };
    console.log(user);
    this.auth.login(user).subscribe(() => {
    });

    // this.auth.login(user).subscribe(() => {
    //   this.form.reset();
    //   //this.router.navigate(['/store']);
    // });
  }
}
