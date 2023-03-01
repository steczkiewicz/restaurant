import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.formErrors = new Map([
      ['email', ''],
      ['name',''],
      ['password', ''],
      ['confirmpassword','']
    ])

    this.validationMessages = new Map([
      ['email', new Map([['required', 'email cannot be blank']])],
      ['name', new Map([['required', 'name cannot be blank']])],
      ['password', new Map([['required', 'password cannot be blank']])],
      ['confirmpassword',new Map([['required', 'confirm password cannot be blank']])],
    ]);
  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ['',Validators.required],
      name: ['',Validators.required],
      password: ['',Validators.required],
      confirmpassword: ['',Validators.required]
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
    const username = form.value.username;
    if (form.valid) {
      this.authService.registerUser(email,password,username);
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
