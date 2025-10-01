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
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthServices } from '../../services/authorization/auth-services';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
    private authServices : AuthServices,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const token =(localStorage.getItem('token'));
    if((token)){
      this.router.navigateByUrl("/home");
    }
  }

  onSubmit() {
    if (this.signUp) {
      if (this.registerForm.valid) {
        this.authServices.newUserRegistration(this.registerForm.value).subscribe((res:any)=>{
          alert(res.name + "Registered!");
          this.signUp = false;
        });
      } else {
        this.registerForm.markAllAsTouched();
      }
    } else {
      if (this.loginForm.valid) {
        this.authServices.userLogin(this.loginForm.value).subscribe((res:any)=>{
          if(res.token){
            localStorage.setItem('token' , res.token);
            localStorage.setItem('user' , JSON.stringify(res.user));
            this.router.navigateByUrl("/home");
            window.location.reload();
          }


        });
      } else {
        this.registerForm.markAllAsTouched();
      }
    }
  }
}
