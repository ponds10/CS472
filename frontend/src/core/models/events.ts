export interface Events {
    title: string;
    description: string;
    attendance: number;
    imageURL: string;
    date: Date;
    userID: string;
    eventID: string;
}

export interface EventsAttendance {
    eventID: string;
    userID: string;
}
