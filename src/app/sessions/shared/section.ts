import * as firebase from 'firebase/app';

export class Section {
  $key: string;
  key: string;
  title: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active = true;
}
