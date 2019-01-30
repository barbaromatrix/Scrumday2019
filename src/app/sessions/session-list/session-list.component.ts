import { SpeakerService } from './../../speakers/shared/speaker.service';
import { Speaker } from './../../speakers/shared/speaker';
import { Router } from '@angular/router';
import { SectionService } from './../shared/section.service';
import { AuthService } from './../../services/auth/auth.service';
import { SessionService } from './../shared/session.service';
import { Session } from './../shared/session';
import { Section } from './../shared/section';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
  providers: [ModalDirective]
})
export class SessionListComponent implements OnInit {
  public sessions$: Observable<Session[]>;
  public sections$: Observable<Section[]>;
  public speakers$: Observable<Speaker[]>;
  section: Section = new Section();

  @ViewChild('sectionModal') public sectionModal: ModalDirective;

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private speakerService: SpeakerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sessions$ = this.sessionService.getSessionList$(ref => ref.orderByChild('active').equalTo(true));
    this.sections$ = this.sectionService.getSectionList$(ref => ref.orderByChild('active').equalTo(true));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  openDetails(session) {
    if ((this.isLoggedIn() && this.isAdmin()) || session.abstract) {
      this.router.navigate([`/sessions/${session.key}`]);
    }
  }

  addSection(value) {
    this.section.title = value.replace(/^\s+|\s+$/g, '');
    this.sectionService.createSection(this.section);
    this.section = new Section();
    this.sectionModal.hide();
  }

  deleteSection(section) {
    if (window.confirm('Are you sure you want to delete this section? This WILL orphan any sessions tied to it!')) {
      this.sectionService.deleteSection(section.$key);
    }
  }

  getSpeakerName(speakerKey) {
    return this.speakerService.getSpeakerName(speakerKey);
  }

}
