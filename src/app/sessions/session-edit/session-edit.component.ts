import { SectionService } from './../shared/section.service';
import { Session } from './../shared/session';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { Section } from './../shared/section';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.scss']
})
export class SessionEditComponent implements OnInit {
  public sections: FirebaseListObservable<Section[]>;
  session: Session = new Session();
  activeKey: string;

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.activeKey = params['id'];
      this.sessionService.getSession(this.activeKey).subscribe(session => {
        this.session = session;
      });
    });

    this.sections = this.sectionService.getSectionList();
  }

  updateSession() {
    this.sessionService.updateSession(this.activeKey, this.session);
    this.router.navigate(['/sessions']);
  }

}