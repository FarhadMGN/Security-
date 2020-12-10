import { Component, OnInit, Inject } from '@angular/core';
import {AuthService} from '../services/auth.service.ts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }
}

