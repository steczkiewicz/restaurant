import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  closed = true;

  constructor(public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.signoutUser();
    this.router.navigate(['../']);
  }

  onClickHam() {
    this.closed = !this.closed;
  }
}
