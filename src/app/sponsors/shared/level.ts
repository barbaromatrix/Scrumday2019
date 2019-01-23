import * as firebase from 'firebase/app';

export class Level {
  $key: string;
  name: string;
  rank: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active = true;
}
