import * as firebase from 'firebase/app';

export class Sponsor {
  $key: string;
  name: string;
  websiteLink: string;
  logoURL: File;
  level: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}

/*
{
  "$key": "1",
  "name": "Concrete",
  "websiteLink": "www.concrete.com.br",
  "logoURL": "/",
  "level": "gold",
  "active": true,
}
*/