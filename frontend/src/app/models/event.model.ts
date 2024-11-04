export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  imageUrl: string;
  registeredCount: number;
  isRegistered?: boolean;
}
