export interface Events {
    organizer: string;
    title: string;
    summary: string;

    imageURL: string;

    date: Date;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string

    misc: string;

    attendance: number;
    userID: string;
    eventID: string;
}

// to store all the events a user is attending
export interface EventsAttendance {
    eventID: string;
    userID: string;
}
