import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Speaker } from '../speakers/shared/speaker';
import { SpeakerService } from '../speakers/shared/speaker.service';
import { AuthService } from '../services/auth/auth.service'
import { Observable, pipe } from 'rxjs/Rx';

@Component({
  selector: 'app-keynotes-list',
  templateUrl: './keynotes-list.component.html',
  styleUrls: ['./keynotes-list.component.scss']
})
export class KeynotesListComponent implements OnInit {
  @ViewChild('speakerModal') public speakerModal: ModalDirective;
  public speakers$: Observable<Speaker[]>;
  public speakerDetail: any;

  constructor(
    private speakerService: SpeakerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.speakers$ = this.speakerService
      .getSpeakerList$(ref => ref.orderByChild('featured').equalTo(true))
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  deleteSpeaker(speaker) {
    if (window.confirm('Are you sure you want to delete this speaker?')) {
      this.speakerService.deleteSpeaker(speaker.$key);
    }
  }

  showModal(speaker) {
    this.speakerDetail = {
      name: speaker.name,
      title: speaker.title,
      company: speaker.company,
      description: speaker.description,
      googleLink: speaker.googleLink,
      facebookLink: speaker.facebookLink,
      twitterLink: speaker.twitterLink,
      linkedinLink: speaker.linkedinLink,
      githubLink: speaker.githubLink,
      websiteLink: speaker.websiteLink
    };
    this.speakerModal.show();
  }

}
