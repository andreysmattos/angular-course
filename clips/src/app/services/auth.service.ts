import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { delay, map, Observable, of, filter, switchMap } from 'rxjs';
import IUser from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuth$: Observable<boolean> = of(false);
  public isAuthWithDelay$: Observable<boolean> = of(false);
  public redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    public router: Router,
    private route: ActivatedRoute,
  ) {

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => this.route.firstChild),
        switchMap(route => route?.data ?? of({}))
      )
      .subscribe(data => {
        // if(!data) return;
        this.redirect = data['authOnly'] ?? false;
      });

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


  public async logout($event?: Event) {
    if ($event) $event.preventDefault();
    await this.auth.signOut();
    if(this.redirect) await this.router.navigateByUrl('/');
  }

}
