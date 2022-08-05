import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public isCollapsed = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onUser(){
    this.router.navigate(['/user']);
  }
  onDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
