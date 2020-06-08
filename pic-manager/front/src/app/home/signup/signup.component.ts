import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LowerCaseValidtator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: "./signup.component.html"
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService ,
    private signUpService: SignUpService,
    private router: Router ) {}
  
  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email:['', [
        Validators.required,
        Validators.email,
      ]],
      userName:['', [ // Sync Validators
        Validators.required,
        LowerCaseValidtator
      ],
      [ // Async validators
        this.userNotTakenValidatorService.checkUserNameTaken() 
      ]
    ],
      fullName:['', Validators.required],
      password:['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]]
    }); 
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;

    this.signUpService
      .signup(newUser)
      .subscribe(
        () => this.router.navigate(['']),
        err => console.log(err)
      )
  }
}