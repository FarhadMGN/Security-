import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './elements/login-page/login-page.component';
import { HeaderComponent} from './header/header.component';
import {MatInputModule} from '@angular/material';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service.ts';
import {AppRoutingModule} from './app-routing.module';
import {DialogOverviewExampleDialogComponent, StoreComponent} from './store/store.component';
import { ApplicationComponent } from './application/application.component';

const appRoutes: Routes = [
  {path: 'UI/part1/Details', component: LoginPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    StoreComponent,
    ApplicationComponent,
    DialogOverviewExampleDialogComponent
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  providers: [HttpClient, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
