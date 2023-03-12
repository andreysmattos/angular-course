import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private _auth: AuthService,
    private emailTaken: EmailTaken
  ) {

  }

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email], [this.emailTaken.validate]);
  age = new FormControl<number | null>(null, [Validators.required, Validators.min(18), Validators.max(120)]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]);
  confirm_password = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phone: this.phone,
  }, [RegisterValidators.match('confirm_password', 'password')]);

  showAlert = false
  alertColor = 'blue'
  alertMessage = '';
  inSubmission = false;


  async handleSubmit() {
    this.alertMessage = 'Please wait! Your account is being created!'
    this.showAlert = true;
    this.inSubmission = true;

    const userData = this.registerForm.value;



    try {

      await this._auth.createUser(userData as IUser);

    } catch (error) {
      console.log(error);
      this.alertMessage = "An unexpected error ocurred. Please try agian later!";
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    // this.inSubmission = false;

    this.alertMessage = "Sucess! Your account has been created!";
    this.alertColor = 'green';


  }
}
