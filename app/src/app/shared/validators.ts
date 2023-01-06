// check if a value is an ingredient object
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ingredientValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isIngredient =
      typeof control.value != 'string' &&
      Object.keys(control.value)?.includes('defaultUnitId') &&
      Object.keys(control.value)?.includes('cost');
    return !isIngredient
      ? { ingredientValidator: { value: control.value } }
      : null;
  };
}
