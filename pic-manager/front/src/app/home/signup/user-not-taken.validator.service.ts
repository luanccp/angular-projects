import { Injectable } from "@angular/core";
import { SignUpService } from "./signup.service";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, first, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class UserNotTakenValidatorService {
  constructor(private signUpService: SignUpService) {}

  checkUserNameTaken() {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(300)) // impede que rode a cada digito, roda apos 300 ms
        .pipe(
          switchMap(userName => this.signUpService.checkUserNameTaken(userName))
        )
        .pipe(map(isTaken => (isTaken ? { userNameTaken: true } : null)))
        .pipe(first());
    }; 
  }
}
