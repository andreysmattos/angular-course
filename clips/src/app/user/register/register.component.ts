import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AngularFireAuth) {

  }


  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)]);
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
  });

  showAlert = false
  alertColor = 'blue'
  alertMessage = '';
  inSubmission = false;


  async handleSubmit() {
    this.alertMessage = 'Please wait! Your account is being created!'
    this.showAlert = true;
    this.inSubmission = true;

    const { email, password } = this.registerForm.value;

    try {
      const userCredentials = await this.auth.createUserWithEmailAndPassword(email as string, password as string);
      console.log({userCredentials})
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
