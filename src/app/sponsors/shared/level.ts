import * as firebase from 'firebase/app';

export class Level {
  $key: string;
  name: string;
  rank: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}

/*
{
  "$key": "1",
  "name": "Level 1",
  "rank": 1,
  "active": true
}
*/