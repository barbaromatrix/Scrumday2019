import { Survey } from './survey';
import { Session } from './session';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionService {
  private basePath: string = firebaseConfig.devfestYear + '/sessions';
  sessions: AngularFireList<Session> = null;
  session: AngularFireObject<Session> = null;

  constructor(private db: AngularFireDatabase) { }

  getSessionListCore(queryFn?: QueryFn): AngularFireList<Session> {
    this.sessions = this.db.list(this.basePath, queryFn);
    return this.sessions;
  }

  getSessionList$(queryFn?: QueryFn): Observable<Session[]> {
    const observableData = this.getSessionListCore(queryFn).valueChanges()
    return observableData
  }

  getSessionCore(key: string): AngularFireObject<Session> {
    const path = `${this.basePath}/${key}`;
    this.session = this.db.object(path);
    return this.session;
  }

  getSession$(key: string): Observable<Session> {
    return this.getSessionCore(key).valueChanges();
  }

  createSession(session: Session): void {
    this.sessions.push(session);
  }

  updateSession(key: string, value: any): void {
    this.sessions.update(key, value);
  }

  deleteSession(key: string): void {
    this.sessions.remove(key);
  }

  saveSurvey(key: string, survey: Survey): void {
    const path = `${this.basePath}/${key}/surveys`;
    const surveys = this.db.list(path);
    surveys.push(survey);
  }

}
