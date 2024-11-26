import { Timestamp } from "@angular/fire/firestore";

export interface Events {
    organizer: string;
    title: string;
    summary: string;

    imageURL: string;

    date: Timestamp | Date;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string

    misc: string;
    overview:string;

    attendance: number;
    userID: string;
    eventID: string;
}

// to store all the events a user is attending
export interface EventsAttendance {
    eventID: string;
    userID: string;
}
