import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageStorageService } from 'src/app/helpers/message-storage.service';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  isSuccessful = false;
  message = '';
  isSignUpFailed = false;
  data: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authenticationService: AuthService, private messageService: MessageStorageService) { }

  ngOnInit(): void {
    // this.getApi();
    this.createSignUpForm();
  }

  getApi() {
    this.authenticationService.checkEmail(this.registerForm.get('email')?.value).subscribe({
      next: data => {
        this.data = data.message;
      },
    })
  }

  createSignUpForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        // acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.authenticationService.register(this.registerForm.get('firstName')?.value, this.registerForm.get('lastName')?.value,
      this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe({
        next: data => {
          this.messageService.saveMessage(data.message);
          this.message = data.message;
          this.isSuccessful = true;
          Swal.fire({title: data.message,
          position: 'top-right',toast: true,icon: 'success'});
          this.isSignUpFailed = false;
          this.router.navigate(['/authentication/login']);
        },
        error: err => {
          this.messageService.saveMessage(err.error.message);
          this.message = err.error.message;
          Swal.fire({title: err.error.message,
            position: 'top-right',toast: true,icon: 'error'});
          this.isSignUpFailed = true;
        }
      });
  }

  goBack() {
    this.router.navigate(['/authentication/login']).then();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
