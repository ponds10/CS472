export interface Events {
    title: string;
    description: string;
    attendance: number;
    imageURL: string;
    date: Date;
    userID: string;
    eventID: string;
    host: string;
}

// to store all the events a user is attending
export interface EventsAttendance {
    eventID: string;
    userID: string;
}
