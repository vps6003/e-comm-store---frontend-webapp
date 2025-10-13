import { CommonServices } from './../../../services/common-services';
import { CommonVariablesService } from './../../../services/common-variables-service';
import { CommonModule } from '@angular/common';
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
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../../core/abstract-validators/password-match';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  formBuilder = inject(FormBuilder);
  editName: boolean = false;
  editPassword: boolean = false;
  userNameUpdateForm!: FormGroup;
  userPasswordUpdateForm!: FormGroup;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    public commonVariablesService: CommonVariablesService,
    private commonServices: CommonServices
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const userData = localStorage.getItem('userData') || '{}';
    const user = JSON.parse(userData);
    this.commonVariablesService.userData = user;
    // console.log(this.commonVariablesService.userData);
    this.userNameUpdateForm = this.formBuilder.group({
      name: [
        this.commonVariablesService.userData.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
    });

    this.userPasswordUpdateForm = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(5)]],
        newPassword: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      { validators: passwordMatchValidator }
    );
  }

  async updatePassword() {
    this.userPasswordUpdateForm.markAllAsTouched();
    if (this.userPasswordUpdateForm.invalid) return;
    const obj:any = this.userPasswordUpdateForm.value;
    const userData  = await this.commonServices.getUserDataFromStorage();
    obj.userId = userData._id;
    console.log(obj);
    // this.commonServices.changePassword(obj);
  }

  updateName() {
    this.userNameUpdateForm.markAllAsTouched();
    if (this.userNameUpdateForm.invalid) return;
    const obj = this.userNameUpdateForm.value;
    const user = localStorage.getItem('user');
    this.commonVariablesService.userData = JSON.parse(user || '{}');
    const userId = this.commonVariablesService.userData._id;
    this.commonServices.updateUsername(userId, obj?.name);
  }
}
