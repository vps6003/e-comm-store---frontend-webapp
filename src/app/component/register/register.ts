import { CommonServices } from './../../services/common-services';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthServices } from '../../services/authorization/auth-services';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';   // 👈 import this
import { ToasterMessageService } from '../../services/toaster-message-service';
import { img } from '../../../images/images';
import { passwordMatchValidator } from '../../core/abstract-validators/password-match';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;
  loginForm: FormGroup;
  signUp: boolean = false;
  hidePassword: boolean = true;
  router = inject(Router);
  images = img;

  constructor(
    private fb: FormBuilder,
    private authServices: AuthServices,
    private commonServices: CommonServices,
    private toaster : ToasterMessageService,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    },{validators : passwordMatchValidator});
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    // this.commonServices.verifyToken();
    if (token) {
      this.router.navigateByUrl('/home');
    }
  }

  async onSubmit() {
    try {
      if (this.signUp) {
        if (this.registerForm.valid) {
          const res: any = await firstValueFrom(
            this.authServices.newUserRegistration(this.registerForm.value)
          );
          this.toaster.show(res.name + ' Registered!',"success",5000);
          this.signUp = false;
        } else {
          this.registerForm.markAllAsTouched();
        }
          this.commonServices.loggedInValue = false;
      } else {
        if (this.loginForm.valid) {
          const res: any = await firstValueFrom(
            this.authServices.userLogin(this.loginForm.value)
          );

          if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigateByUrl('/home');
            this.toaster.show("Login SuccessFul","success");
            this.commonServices.getAllCategoriesForCustomer();
            this.commonServices.getAllOrdersOfUSer();
            this.commonServices.loggedInValue = true;
            this.commonServices.userName = res.user?.name || "";

            // window.location.reload();
          }
        } else {
          this.loginForm.markAllAsTouched();
          this.commonServices.loggedInValue = false;
            this.commonServices.userName =  "";


        }
      }
    } catch (err:any) {
      // console.error('Error in onSubmit:', err);
      this.toaster.show(err.error.message,"error",5000);
      if(err.status === 404){
        this.signUp = true;
        this.toaster.show("Please Register First","info",5000);
        this.loginForm.reset();
        this.registerForm.reset();
      }
      this.commonServices.loggedInValue = false;

    }
  }



}
