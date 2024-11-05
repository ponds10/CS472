import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';
import { Event } from '../models/event.model';

describe('EventService', () => {
  let service: EventService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService]
    });

    service = TestBed.inject(EventService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------Testing getEvents() Method------- //
  it('should fetch events (getEvents)', () => {
    const mockEvents: Event[] = [
      { id: '1', title: 'Sample Event', description: 'Description', date: 'January 1, 2024', location: 'NY', time: '12PM', imageUrl: '', registeredCount: 10 },
    ];

    service.getEvents().subscribe(events => {
      expect(events.length).toBe(1);
      expect(events).toEqual(mockEvents);
    });

    const req = mockHttp.expectOne('api/events');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  // -------Testing getEventById() Method------- //
  it('should fetch event by id (getEventById)', () => {
    const mockEvent: Event = { id: '1', title: 'Sample Event', description: 'Description', date: 'January 1, 2024', location: 'NY', time: '12PM', imageUrl: '', registeredCount: 10 };

    service.getEventById('1').subscribe(event => {
      expect(event).toEqual(mockEvent);
    });

    const req = mockHttp.expectOne(`api/events/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent);
  });
});
