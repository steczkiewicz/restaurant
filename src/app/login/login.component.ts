import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.formErrors = new Map([
      ['email', ''],
      ['password', '']
    ])

    this.validationMessages = new Map([
      ['email', new Map([['required', 'email cannot be blank']])],
      ['password', new Map([['required', 'password cannot be blank']])]
    ]);
  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });

    this.modelForm.valueChanges
          .subscribe((value) => {
            this.onControlValueChanged();
          })
    this.onControlValueChanged();
  }

  onControlValueChanged() {    
    this.checkValidity('check-dirty');
  }

  
  async onSubmit(form: FormGroup) {
    const email = form.value.email;
    const password = form.value.password;
    if (form.valid) {
      this.authService.loginUser(email,password);
      form.reset();
    } else {
      this.checkValidity('ignore-dirty');
    }
  }

  checkValidity(mode:string) {
    const form = this.modelForm;
      for (let [key, value] of this.formErrors) {     
        this.formErrors.set(key, '');
        let control = form.get(key); 
        const modeControl = mode =='check-dirty' ? control?.dirty : true;
        if (control && modeControl && !control.valid) {
          const validationMessages = this.validationMessages.get(key);
          for (const key1 in control.errors) {
            this.formErrors.set(key, validationMessages?.get(key1) + ' ')
          }
        }
      }
  }

}
