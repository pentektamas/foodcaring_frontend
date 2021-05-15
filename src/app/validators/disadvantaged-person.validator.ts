import {FormControl, Validators} from '@angular/forms';
import {DisadvantagedPerson} from '../models/disadvantaged-person.model';
import {MessageErrorConstructorUtils} from '../utils/message-error-constructor.utils';

export class DisadvantagedPersonValidator {
  public firstNameForm: FormControl;
  public lastNameForm: FormControl;
  public locationForm: FormControl;
  public phoneNumberForm: FormControl;
  public usernameForm: FormControl;
  public passwordForm: FormControl;
  public restaurantNameForm: FormControl;

  constructor() {
    this.init(null);
  }

  public getDisadvantagedPerson(): DisadvantagedPerson {
    const disadvantagedPerson: DisadvantagedPerson = new DisadvantagedPerson();
    disadvantagedPerson.firstName = this.firstNameForm.value;
    disadvantagedPerson.lastName = this.lastNameForm.value;
    disadvantagedPerson.location = this.locationForm.value;
    disadvantagedPerson.phoneNumber = this.phoneNumberForm.value;
    disadvantagedPerson.username = this.usernameForm.value;
    disadvantagedPerson.password = this.passwordForm.value;
    console.log(disadvantagedPerson);
    // disadvantagedPerson.restaurantName = this.restaurantNameForm.value;
    return disadvantagedPerson;
  }


  public getDisadvantagedPersonWithId(id: String): DisadvantagedPerson {
    const disadvantagedPerson: DisadvantagedPerson = new DisadvantagedPerson();
    disadvantagedPerson.id = id;
    disadvantagedPerson.firstName = this.firstNameForm.value;
    disadvantagedPerson.lastName = this.lastNameForm.value;
    disadvantagedPerson.location = this.locationForm.value;
    disadvantagedPerson.phoneNumber = this.phoneNumberForm.value;
    disadvantagedPerson.username = this.usernameForm.value;
    disadvantagedPerson.password = this.passwordForm.value;
    // disadvantagedPerson.restaurantName = this.restaurantNameForm.value;
    return disadvantagedPerson;
  }

  public getFirstNameFormErrors(): string {
    if (this.firstNameForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('first name');
    }
    // if (this.firstNameForm.hasError('pattern')) {
    //   return MessageErrorConstructorUtils.constructOnlyLettersFieldError('first name');
    // }
    if (this.firstNameForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('first name', 3);
    }
  }

  public getLastNameFormErrors(): string {
    if (this.lastNameForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('last name');
    }
    // if (this.lastNameForm.hasError('pattern')) {
    //   return MessageErrorConstructorUtils.constructOnlyLettersFieldError('last name');
    // }
    if (this.lastNameForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('last name', 3);
    }
  }

  public getLocationFormErrors(): string {
    if (this.locationForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('location');
    }
    if (this.locationForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('location', 5);
    }
  }

  public getPhoneNumberFormErrors(): string {
    if (this.phoneNumberForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('phone number');
    }
    // if (this.phoneNumberForm.hasError('pattern')) {
    //   return MessageErrorConstructorUtils.constructOnlyDigitsAndPlusSignFieldError('phone number');
    // }
    if (this.phoneNumberForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('phone number', 10);
    }
  }

  public getUsernameFormErrors(): string {
    if (this.usernameForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('username');
    }
    if (this.usernameForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('username', 5);
    }
  }

  public getPasswordFormErrors(): string {
    if (this.passwordForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('password');
    }
    if (this.passwordForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('password', 8);
    }
  }

  public getRestaurantNameFormErrors(): string {
    if (this.restaurantNameForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('restaurant name');
    }
    if (this.restaurantNameForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('restaurant name', 2);
    }
  }

  public isValid(): boolean {
    return !this.firstNameForm.errors && !this.lastNameForm.errors && !this.locationForm.errors &&
      !this.phoneNumberForm.errors && !this.usernameForm.errors && !this.passwordForm.errors;
  }

  public isValidWithoutPasswordField(): boolean {
    return !this.firstNameForm.errors && !this.lastNameForm.errors && !this.locationForm.errors &&
      !this.phoneNumberForm.errors && !this.usernameForm.errors;
  }

  public init(disadvantagedPerson: DisadvantagedPerson): void {
    this.firstNameForm = new FormControl(disadvantagedPerson?.firstName, [Validators.required,
      Validators.minLength(3), Validators.maxLength(50)]);
    this.lastNameForm = new FormControl(disadvantagedPerson?.lastName, [Validators.required,
      Validators.minLength(3), Validators.maxLength(50)]);
    this.locationForm = new FormControl(disadvantagedPerson?.location, [Validators.required,
      Validators.minLength(5), Validators.maxLength(50)]);
    this.phoneNumberForm = new FormControl(disadvantagedPerson?.phoneNumber, [Validators.required,
      Validators.minLength(10), Validators.maxLength(50)]);
    this.usernameForm = new FormControl(disadvantagedPerson?.username, [Validators.required,
      Validators.minLength(5), Validators.maxLength(50)]);
    this.passwordForm = new FormControl('', [Validators.required,
      Validators.minLength(8), Validators.maxLength(50)]);
    // this.restaurantNameForm = new FormControl(disadvantagedPerson?.restaurantName, [Validators.required,
    //   Validators.minLength(2), Validators.maxLength(50)]);
  }
}
