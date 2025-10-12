import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordControl = control.get('newPassword');
  const confirmPasswordControl = control.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) return null;

  const password = passwordControl.value;
  const confirmPassword = confirmPasswordControl.value;

  if (!password || !confirmPassword) return null; // skip validation if empty

  if (password !== confirmPassword) {
    confirmPasswordControl.setErrors({ passwordMismatch: true });
  } else {
    // clear only the passwordMismatch error, not others if present
    if (confirmPasswordControl.hasError('passwordMismatch')) {
      confirmPasswordControl.setErrors(null);
    }
  }

  return null; // always return null for form-level validator
};
