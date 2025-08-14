import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, of } from 'rxjs';
import { EventItem } from '../models/event.model';

interface MockRoot { user: any; events: EventItem[]; }

const STORAGE_KEY = 'event_mgmt_events';

@Injectable({ providedIn: 'root' })
export class EventService {
  private events$ = new BehaviorSubject<EventItem[] | null>(null);
  private activeOrgId: string | null = null;

  constructor(private http: HttpClient) { this.init(); }

  private init() {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as EventItem[];
      this.events$.next(parsed);
      return;
    }
    this.http.get<MockRoot>('/mock-data/mock.json').subscribe((root) => {
      this.activeOrgId = root.user?.activeOrganizationId ?? null;
      const withDefaults = (root.events || []).map(e => ({
        isPublic: true, // default
        ...e
      }));
      this.events$.next(withDefaults);
      this.persist();
    });
  }

  private persist() {
    const data = this.events$.value ?? [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /** stream of all events */
  all$() { return this.events$.asObservable(); }

  /** events for active org */
  myEvents$() {
    return this.all$().pipe(map(list => (list || []).filter(
      e => e.organizer?.id === (this.activeOrgId ?? e.organizer?.id)
    )));
  }

  byId$(id: string) {
    return this.myEvents$().pipe(map(list => list.find(e => e.id === id)));
  }

  create(item: EventItem) {
    const list = this.events$.value ?? [];
    this.events$.next([{ ...item, id: crypto.randomUUID(), dateAdded: new Date().toISOString() }, ...list]);
    this.persist();
  }

  update(id: string, patch: Partial<EventItem>) {
    const list = (this.events$.value ?? []).map(e => e.id === id ? { ...e, ...patch, dateUpdated: new Date().toISOString() } : e);
    this.events$.next(list); this.persist();
  }

  delete(id: string) {
    const list = (this.events$.value ?? []).filter(e => e.id !== id);
    this.events$.next(list); this.persist();
  }

  /** utility for UI filtering/sorting */
  filterSearchSort(list: EventItem[], opts: { q?: string; visibility?: 'all'|'public'|'private'; sort?: 'asc'|'desc'; }) {
    let out = [...list];
    if (opts.q) {
      const q = opts.q.toLowerCase();
      out = out.filter(e => e.title?.toLowerCase().includes(q));
    }
    if (opts.visibility && opts.visibility !== 'all') {
      const want = opts.visibility === 'public';
      out = out.filter(e => (e.isPublic ?? true) === want);
    }
    out.sort((a,b) => {
      const ad = new Date(a.startDateTime).getTime();
      const bd = new Date(b.startDateTime).getTime();
      return (opts.sort === 'asc' ? ad - bd : bd - ad);
    });
    return out;
  }

  counts(list: EventItem[]) {
    const pub = list.filter(e => e.isPublic ?? true).length;
    const priv = list.length - pub;
    return { total: list.length, public: pub, private: priv };
  }
}
