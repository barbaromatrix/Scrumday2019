import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class UserService {
  private basePath = '/userProfile';
  users: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) { }

  getUserList(): AngularFireList<any> {
    this.users = this.db.list(this.basePath);
    return this.users;
  }

  getUserQuery(offset, startKey?): AngularFireList<any> {
    if (startKey) {
      this.users = this.db.list(this.basePath, ref => ref.orderByKey().startAt(startKey).limitToFirst(offset + 1));
    } else {
      this.users = this.db.list(this.basePath, ref => ref.orderByKey().limitToFirst(offset + 1));
    }
    return this.users;
  }

  isAdmin(key: string) {
    let isAdmin: boolean;
    this.db.object(`/admins/${key}`).snapshotChanges().subscribe(snapshot => {
      isAdmin = snapshot.payload.val() as boolean;
    });
    return isAdmin;
  }

  toggleAdmin(key: string): void {
    const tempAdmin: boolean = this.isAdmin(key) || false;
    if (tempAdmin) {
      this.db.object(`/admins/${key}`).remove();
    } else {
      this.db.object(`/admins/${key}`).set(true);
    }
  }

}
