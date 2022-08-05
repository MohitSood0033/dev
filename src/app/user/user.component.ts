import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { MessageStorageService } from '../helpers/message-storage.service';
import { MustMatch } from '../helpers/must-match.validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  userForm!: FormGroup;
  loading = false;
  submitted = false;
  isSuccessful = false;
  message = '';
  isSignUpFailed = false;
  data: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authenticationService: AuthService, private messageService: MessageStorageService) { }

  ngOnInit(): void {
    this.getApi();
    this.dtOptions = {
      paging: true,
      pagingType: 'full_numbers',
      scroller: true,
      scrollCollapse: true,
      scrollX: true,
      responsive: true,
      select: true,
      dom: '<\'row\'<\'col-sm-12 col-md-3\'l><\'col-sm-12 col-md-3\'B><\'col-sm-12 col-md-6\'f>>' +
        '<\'row\'<\'col-sm-12\'tr>>' +
        '<\'row\'<\'col-sm-12 col-md-3 entries\'i><\'col-sm-12 col-md-9 entries\'p>>',
      buttons: [
        {
          extend: 'csv',
          title: 'User Data'
        },
        {
          extend: 'excel',
          title: 'User Data'
        }
      ]
    };

    this.createSignUpForm();
  }

  getApi() {
    this.authenticationService.users().subscribe({
      next: data => {
      this.data = data;
       
      },
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(true);
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
  }

  createSignUpForm() {
    this.userForm = this.formBuilder.group(
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
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.authenticationService.register(this.userForm.get('firstName')?.value, this.userForm.get('lastName')?.value,
      this.userForm.get('email')?.value, this.userForm.get('password')?.value).subscribe({
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
    this.userForm.reset();
  }
}
