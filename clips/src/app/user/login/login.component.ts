import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AngularFireAuth) {

  }

  showAlert = false
  alertColor = 'blue'
  alertMessage = '';
  inSubmission = false;

  credentials = {
    email: "",
    password: ""
  }

  async login() {
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait!'
    this.showAlert = true;


    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password);
      this.alertColor = 'green';
      this.alertMessage = 'Logged with success!'
    } catch (e) {
      this.alertColor = 'red';
      this.alertMessage = 'Something went wrong!';
      console.log(e);
    }

    this.inSubmission = false;
  }
}
