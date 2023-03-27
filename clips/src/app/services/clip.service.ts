import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { switchMap, of, map } from 'rxjs';
import IClip from '../models/clips.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection: AngularFirestoreCollection<IClip>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {

    this.clipsCollection = db.collection('clips');
  }

  create(data: IClip) {
    return this.clipsCollection.add(data);
  }



  getUserClips() {
    return this.auth.user.pipe(
      switchMap(user => {
        if (!user) return of([]);

        const query = this.clipsCollection.ref.where('uid', '==', user.uid);

        return query.get();
      }),
      map(snapshot => {
        return (snapshot as QuerySnapshot<IClip>).docs
      })
    )
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({ title: title });
  }

}
