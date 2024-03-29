import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import IClip from 'src/app/models/clips.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  videoOrder = '1';
  clips: IClip[] = [];
  activeClip: IClip | null = null;
  sort$: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    public modal: ModalService
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);
    this.sort$.subscribe(v => console.log('order', v));
  }

  openModal(event: Event, clip: IClip) {
    console.log('teste')
    event.preventDefault();

    this.activeClip = clip;

    this.modal.toggleModal('editClip');
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? '2' : '1';
      this.sort$.next(this.videoOrder);
    })


    this.clipService.getUserClips(this.sort$).subscribe(docs => {
      this.clips = [];
      docs.forEach(doc => {
        this.clips.push({
          docID: doc.id,
          ...doc.data()
        })
      })
    })
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: value }
    });

    this.router.navigateByUrl(`/manage?sort=${value}`);



    console.log('value', value);
  }

  update(event: IClip) {
    this.clips.forEach((el, i) => {
      if (el.docID === event.docID) {
        this.clips[i].title = event.title;
      }
    })
  }


  deleteClip(event: Event, clip: IClip) {
    event.preventDefault();
    this.clipService.deleteClip(clip);


    this.clips.forEach((el, i) => {
      if (el.docID === clip.docID) {
        this.clips.splice(i, 1);
      }
    })
  }
}
