import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import IClip from 'src/app/models/clips.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  videoOrder = '1';
  clips: IClip[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    public modal: ModalService
  ) {

  }

  openModal(event: Event, clip: IClip) {
    console.log('teste')
    event.preventDefault();

    this.modal.toggleModal('editClip');
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? '2' : '1';
    })


    this.clipService.getUserClips().subscribe(docs => {
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
}
