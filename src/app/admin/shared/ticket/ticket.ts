import * as firebase from 'firebase/app';

export class Ticket {
  $key: string;
  name: string;
  price: number;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}


/*
"tickets": {
  $key: "1",
  name: "teste",
  price: 10,
  description1: "desc 1",
  description2: "desc 2",
  description3: "desc 3",
  description4: "desc 4",
  active: true
}
*/