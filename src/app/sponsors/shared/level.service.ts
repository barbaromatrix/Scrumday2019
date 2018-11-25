import { Level } from './level';
import { AngularFireList, AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LevelService {
  private basePath: string = firebaseConfig.devfestYear + '/levels';
  levels: AngularFireList<Level> = null;

  constructor(private db: AngularFireDatabase) { }

  getLevelListCore(queryFn?: QueryFn): AngularFireList<Level> {
    this.levels = this.db.list(this.basePath, queryFn);
    return this.levels;
  }

  getLevelList$(queryFn?: QueryFn): Observable<Level[]> {
    return this.getLevelListCore(queryFn).valueChanges();
  }

  createLevel(level: Level): void {
    this.db.list(this.basePath).push(level);
  }

  deleteLevel(key: string): void {
    this.db.list(this.basePath).remove(key);
  }

}
