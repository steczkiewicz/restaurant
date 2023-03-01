import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: User[] = [];
  modelForm!: FormGroup;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      persistenceMode: ['',Validators.required]
    });

    this.modelForm.valueChanges
          .subscribe((value) => {
          })
  }

  async onSubmit(form: FormGroup) {
    const persState = form.value.persistenceMode;
    if (form.valid) {
      this.authService.changePersistence(persState);
      form.reset();
      console.log(persState);
    }
  }

}