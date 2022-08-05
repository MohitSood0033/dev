import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageStorageService } from 'src/app/helpers/message-storage.service';
import { TokenStorageServiceService } from 'src/app/helpers/token-stroage-service.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup !: FormGroup;
  submitted = false;
  isSuccessful = false;
  errorMessage = '';
  isLogInFailed = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authenticationService: AuthService, private tokenStorage: TokenStorageServiceService,
    private messageService: MessageStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
    if (this.tokenStorage.getToken()) {
      this.isSuccessful = true
    }
  }

  createLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.authenticationService.login(this.loginFormGroup.get('userName')?.value, this.loginFormGroup.get('password')?.value).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.messageService.saveMessage(data.message);
        this.isSuccessful = true;
        this.isLogInFailed = false;

        this.router.navigate(['dashboard']);
      },
      error: err => {
        this.messageService.saveMessage(err.error.message);
        this.errorMessage = err.error.message;
        Swal.fire({title: err.error.message,
        position: 'top-right',toast: true,icon: 'error'});
        this.isLogInFailed = true;
      }
    });

  }
}
