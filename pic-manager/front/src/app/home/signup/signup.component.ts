import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LowerCaseValidtator } from 'src/app/shared/validators/lower-case.validator';

@Component({
  templateUrl: "./signup.component.html"
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  
  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email:['', [
        Validators.required,
        Validators.email,
      ]],
      userName:['', [
        Validators.required,
        LowerCaseValidtator
      ]],
      fullName:['', Validators.required],
      password:['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]]
    }); 
  }
}