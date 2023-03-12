import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, map, Observable, of, pipe } from 'rxjs';
import IUser from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuth$: Observable<boolean> = of(false);
  public isAuthWithDelay$: Observable<boolean> = of(false);

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = db.collection('users');

    this.isAuth$ = auth.user.pipe(map(user => !!user));

    this.isAuthWithDelay$ = this.isAuth$.pipe(
      delay(1000)
    );
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Provide a password');
    }

    const userCredentials = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);

    if (!userCredentials.user) {
      throw new Error('user cannot be found');
    }
    await this.usersCollection.doc(userCredentials.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phone: userData.phone,
    });


    await userCredentials.user.updateProfile({
      displayName: userData.name
    });
  }

}
