import {Component, Inject, OnInit} from '@angular/core';
import {Application} from '../interfaces/application';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  apps: Application[] = [];

  constructor(
    public dialog: MatDialog) { }

  ngOnInit() {
    //TODO get all data from back
      this.apps = [   {
        name: 'Vk',
        login: 'My-login',
        password: 'pswd'
      },
        {
          name: 'Odnoclassniki',
          login: 'odno-login',
          password: 'pswd2309'
        }];
  }

  addApp() {
    console.log('hey!');
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {name: 'this.name', animal: 'this.animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `<form [formGroup]="form"
                   (ngSubmit)="submit()">
                <div mat-dialog-content>
                  <p>Would you like to add new service?</p>
                  <mat-form-field>
                    <mat-label>Application:</mat-label>
                    <input matInput formControlName="name">
                  </mat-form-field>
                    <mat-label>Enter your password</mat-label>
                    <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
                    <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                    </button>
                </div>
                </form>
                <div mat-dialog-actions>
                  <button mat-button (click)="onNoClick()">Cancel</button>
                  <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial (click)="submit()">Add</button>
                </div>`
})
export class DialogOverviewExampleDialogComponent implements OnInit {
  hide = true;

  form: FormGroup;
  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl( null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      link: new FormControl(null)
    });
  }

  submit() {
    console.log(this.form.value);
    this.http.get('localhost:8080/api/userInfo/getAllData').subscribe((res) => {
      console.log(res);
    });
  }
}
