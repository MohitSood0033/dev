import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageServiceService } from 'src/app/helpers/token-stroage-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {

  constructor(private router: Router, private authenticationService: TokenStorageServiceService) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.authenticationService.signOut();
    this.router.navigate(['/authentication/login'])
  }
}
