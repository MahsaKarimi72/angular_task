# Event Management Module — AGENT Guide

## 1) Purpose
Feature module to create, view, edit, delete events for the logged-in organization using mock data (`/src/assets/mock-data/mock.json`). Uses NG-ZORRO UI.

Key paths:
- `src/app/event-management/`
  - `services/event.service.ts` — in-memory state & CRUD
  - `components/event-list/` — search/filter/sort + actions
  - `components/event-form/` — shared create/edit form
  - `components/event-details/` — responsive detail view
  - `pages/*` — thin wrappers for routing
  - `models/event.model.ts` — typed event model

## 2) Architecture / Data Flow
- Service loads from JSON once, seeds localStorage, exposes streams via RxJS.
- UI subscribes to `myEvents$()`. User actions call service methods.
- Filtering/search/sort done client-side with `filterSearchSort(...)`.

## 3) How to Extend
- **Add a new form field (e.g., Category)**
  1. Add `category?: string` to `EventItem`.
  2. In `event-form.component.ts`, add control: `category: ['']`.
  3. In template, add `<nz-select formControlName="category">...</nz-select>`.
  4. Map it in `submit()` → include in emitted payload.
  5. Show in list table & details: update templates.
- **Add a new filter to list (e.g., Category)**
  1. Add `category` UI control in `event-list.component.html`.
  2. Pass selected value into `filterSearchSort(...)`.
  3. Update `filterSearchSort` to filter by category.
- **Enhance detail view (e.g., Tickets)**
  - Add an `nz-table` in `event-details` to display `tickets` and capacity/price.

## 4) AI Agent Notes
- Follow naming: `EventItem`, `EventService`, `Event*Component`.
- Avoid changing storage key `event_mgmt_events` to preserve user data.
- Do not introduce new packages.
- Keep forms reactive; validation: required `title`, valid date order.

## 5) Known Limitations / TODO
- Timezone list is static.
- Uploads are stored as base64; no real backend.
- Public/private flag is local-only, not present in original JSON.
- No route guards (login assumed).
- Minimal unit tests (add if required).

## 6) Prompt Example
> “Add a **Category** field (select) to the Event Form with options Conference, Concert, Gala; filter by Category on the list; show Category as a tag in details.”
