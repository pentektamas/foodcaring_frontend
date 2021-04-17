import {FormControl, Validators} from '@angular/forms';
import {Menu} from '../models/menu.model';
import {MessageErrorConstructorUtils} from '../utils/message-error-constructor.utils';

export class MenuValidator {
  public nameForm: FormControl;
  public itemsForm: FormControl;

  constructor() {
    this.init(null);
  }

  public getMenu(): Menu {
    const menu: Menu = new Menu();
    menu.name = this.nameForm.value;
    return menu;
  }

  public getMenuWithId(id: String): Menu {
    const menu: Menu = new Menu();
    menu.id = id;
    menu.name = this.nameForm.value;
    return menu;
  }

  public getNameFormErrors(): string {
    if (this.nameForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('name');
    }
    if (this.nameForm.hasError('pattern')) {
      return MessageErrorConstructorUtils.constructOnlyLettersFieldError('name');
    }
    if (this.nameForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('name', 5);
    }
    if (this.nameForm.hasError('maxlength')) {
      return MessageErrorConstructorUtils.constructMaxLengthFieldError('name', 50);
    }
  }

  public getItemsFormErrors(): string {
    if (this.itemsForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('item');
    }
  }

  public isValid(): boolean {
    return !this.nameForm.errors;
  }

  public init(menu: Menu): void {
    this.nameForm = new FormControl(menu?.name, [Validators.required, Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(5), Validators.maxLength(50)]);
    this.itemsForm = new FormControl(menu?.itemList, [Validators.required]);
  }
}
