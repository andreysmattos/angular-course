import { Component, Input, EventEmitter, Output, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges,
  DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input('src') postImg = "";

  @Output() imgSelected = new EventEmitter<string>();


  constructor() {
    console.log('Constructor Log', this.postImg)
  }


  ngOnInit() {
    console.log('ngInit LOG', this.postImg)
  }

  ngOnChanges() {
    console.log('ngOnChanges LOG')
  }
  ngDoCheck() {
    console.log('DoCheck LOG')
  }

  ngAfterContentInit() {
    console.log('AfterContentInit LOG')
  }
  ngAfterContentChecked() {
    console.log('AfterContentChecked LOG')
  }
  ngAfterViewInit() {
    console.log('AfterViewInit LOG')
  }
  ngAfterViewChecked() {
    console.log('AfterViewChecked LOG')
  }

  ngOnDestroy() {
    console.log('ngOnDestroy LOG')
  }


}
