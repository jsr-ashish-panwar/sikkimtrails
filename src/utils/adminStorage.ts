
export interface Booking {
  id: string;
  experienceName: string;
  date: string;
  time: string;
  participants: number;
  specialRequests: string;
  totalCost: string;
  createdAt: string;
}

export interface HelpRequest {
  id: string;
  name: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface SpecialPackage {
  id: string;
  title: string;
  price: string;
  duration: string;
  services: string[];
  safety: string[];
  popular: boolean;
}

const STORAGE_KEYS = {
  BOOKINGS: 'ghoomo_bookings',
  HELP_REQUESTS: 'ghoomo_help_requests',
  PACKAGES: 'ghoomo_special_packages'
};

export const adminStorage = {
  // Bookings
  getBookings: (): Booking[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },
  saveBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const bookings = adminStorage.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return newBooking;
  },
  deleteBooking: (id: string) => {
    const bookings = adminStorage.getBookings().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  // Help Requests
  getHelpRequests: (): HelpRequest[] => {
    const data = localStorage.getItem(STORAGE_KEYS.HELP_REQUESTS);
    return data ? JSON.parse(data) : [];
  },
  saveHelpRequest: (request: Omit<HelpRequest, 'id' | 'createdAt'>) => {
    const requests = adminStorage.getHelpRequests();
    const newRequest: HelpRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    requests.push(newRequest);
    localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(requests));
    return newRequest;
  },
  deleteHelpRequest: (id: string) => {
    const requests = adminStorage.getHelpRequests().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(requests));
  },

  // Special Packages
  getPackages: (): SpecialPackage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    return data ? JSON.parse(data) : [];
  },
  savePackage: (pkg: Omit<SpecialPackage, 'id'>) => {
    const packages = adminStorage.getPackages();
    const newPackage: SpecialPackage = {
      ...pkg,
      id: Math.random().toString(36).substr(2, 9)
    };
    packages.push(newPackage);
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    return newPackage;
  },
  updatePackage: (id: string, updatedPkg: Partial<SpecialPackage>) => {
    const packages = adminStorage.getPackages().map(p => 
      p.id === id ? { ...p, ...updatedPkg } : p
    );
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  },
  deletePackage: (id: string) => {
    const packages = adminStorage.getPackages().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }
};
