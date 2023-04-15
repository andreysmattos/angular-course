import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { switchMap, of, map, combineLatest, BehaviorSubject } from 'rxjs';
import IClip from '../models/clips.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection: AngularFirestoreCollection<IClip>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {

    this.clipsCollection = db.collection('clips');
  }

  create(data: IClip) {
    return this.clipsCollection.add(data);
  }



  getUserClips(sort$: BehaviorSubject<string>) {
    return combineLatest([this.auth.user, sort$]).pipe(
      map(([user, sort]) => ({ user, sort })),
      switchMap(({ user, sort }) => {
        if (!user) return of([]);

        const query = this.clipsCollection.ref.where('uid', '==', user.uid).orderBy('timestamp', sort === '1'? 'desc' : 'asc');

        return query.get();
      }),
      map(snapshot => {
        return (snapshot as QuerySnapshot<IClip>).docs
      })
    )
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({ title });
  }

  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref('clips/' + clip.fileName);
    await clipRef.delete();

    return await this.clipsCollection.doc(clip.docID).delete()
  }

}
