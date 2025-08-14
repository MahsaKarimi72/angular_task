export interface OrganizationRef { id: string; businessName?: string; }
export interface Venue {
  id: string; venueName: string; address1: string; city: string; state: string;
  country: string; postalZip: string; latitude?: number; longitude?: number;
}
export interface TicketPurchase { id: string; quantity: number; totalPrice: number; purchaseDate: string; }
export interface Coupon { id: string; code: string; discount: number; }
export interface Ticket {
  id: string; ticketName: string; price: number; currency: string; capacity: number;
  prefix?: string; postfix?: string; coupons?: Coupon[]; ticketPurchases?: TicketPurchase[]; dateAdded?: string;
}
export interface EventItem {
  id: string;
  title: string;
  status: 'Active' | 'Inactive';
  organizer: OrganizationRef;
  startDateTime: string; // ISO
  endDateTime: string;   // ISO
  timezone: string;      // e.g., "UTC"
  description?: string;
  primaryImageUrl?: string;
  coverImageUrl?: string;
  imageGalleryUrls?: string[];
  venue?: Venue;
  tickets?: Ticket[];
  dateAdded?: string; dateUpdated?: string | null; dateDeleted?: string | null;

  /** local-only flags (not in mock.json) */
  isPublic?: boolean;           // default true
  primaryImageDataUrl?: string; // from uploads
  coverImageDataUrl?: string;   // from uploads
}
