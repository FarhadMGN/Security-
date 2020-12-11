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
    private http: HttpClient,
    public dialog: MatDialog) { }

  ngOnInit() {
    //TODO get all data from back
    this.apps = [{
      login: 'string',
      relatedURL: 'string'
    }];
    this.http.get('http://localhost:8080/api/userInfo/getAllData').subscribe(
        (res: Application[]) => {
          this.apps = res;
          console.log('res', res);
        },
        (err) => {
          console.log('err', err);
        }
      );
  }

  addApp() {
    console.log('hey!');
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.http.post('http://localhost:8080/api/userInfo', result).subscribe((res) => {
          console.log(res);
          this.apps.push(result);
        },
        (err) => {
          console.log('err', err);
        });
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
                    <mat-label>Login:</mat-label>
                    <input matInput formControlName="login">
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Enter your password</mat-label>
                    <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
                  </mat-form-field>
                    <mat-form-field>
                        <mat-label>Link to service:</mat-label>
                        <input matInput formControlName="relatedURL">
                    </mat-form-field>
                </div>
                </form>
                <div mat-dialog-actions>
                  <button mat-button (click)="onNoClick()">Cancel</button>
                  <button mat-button [mat-dialog-close]="form.value" cdkFocusInitial (click)="submit()">Add</button>
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
      login: new FormControl(null, Validators.required),
      password: new FormControl( null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      relatedURL: new FormControl(null, Validators.required)
    });
  }

  submit() {
  }
}
