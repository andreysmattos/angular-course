import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidators {

    static match(...args: string[]): ValidatorFn {

        return (group: AbstractControl): ValidationErrors | null => {

            const firstControl = group.get(args[0]);
            if (!firstControl) return null;

            if (!args.every(value => {
                const currentControl = group.get(value);

                if (!currentControl) return false;

                return currentControl.value === firstControl.value;

            })) {
                const errors = { noMatch: true }
                firstControl.setErrors(errors);

                return errors;
            }

            // firstControl.setErrors(null);

            return null;
        }
    }
}
