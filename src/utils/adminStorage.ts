import axios from 'axios';

export interface Booking {
  id?: string;
  experienceName: string;
  date: string;
  time: string;
  participants: number;
  specialRequests: string;
  totalCost: string;
  createdAt?: string;
}

export interface HelpRequest {
  id?: string;
  name: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface SpecialPackage {
  id?: string;
  title: string;
  price: string;
  duration: string;
  services: string[];
  safety: string[];
  popular: boolean;
  offer?: string;
}

export interface Experience {
  id?: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  rating?: number;
}

export interface Itinerary {
  id?: string;
  startingPoint: string;
  destination: string;
  duration: string;
  spiritualFocus: string;
  userLanguage: string;
  createdAt?: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const adminStorage = {
  // Bookings
  getBookings: async (): Promise<Booking[]> => {
    const res = await axios.get(`${API_BASE}/bookings`);
    return res.data;
  },
  saveBooking: async (booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
    const res = await axios.post(`${API_BASE}/bookings`, booking);
    return res.data;
  },
  deleteBooking: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/bookings/${id}`);
  },

  // Help Requests
  getHelpRequests: async (): Promise<HelpRequest[]> => {
    try {
      const res = await axios.get(`${API_BASE}/help-requests`);
      return res.data;
    } catch (e) {
      console.warn("Backend offline, fetching from local storage");
      const local = localStorage.getItem('local_help_requests');
      return local ? JSON.parse(local) : [];
    }
  },
  saveHelpRequest: async (request: Omit<HelpRequest, 'id' | 'createdAt'>): Promise<HelpRequest> => {
    try {
      const res = await axios.post(`${API_BASE}/help-requests`, request);
      return res.data;
    } catch (e) {
      console.warn("Backend offline, saving to local storage");
      const local = localStorage.getItem('local_help_requests');
      const requests = local ? JSON.parse(local) : [];
      const newRequest = { ...request, id: Date.now().toString(), createdAt: new Date().toISOString() };
      requests.push(newRequest);
      localStorage.setItem('local_help_requests', JSON.stringify(requests));
      return newRequest;
    }
  },
  deleteHelpRequest: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE}/help-requests/${id}`);
    } catch (e) {
      const local = localStorage.getItem('local_help_requests');
      if (local) {
        const requests = JSON.parse(local).filter((r: any) => r.id !== id);
        localStorage.setItem('local_help_requests', JSON.stringify(requests));
      }
    }
  },

  // Special Packages
  getPackages: async (): Promise<SpecialPackage[]> => {
    const res = await axios.get(`${API_BASE}/packages`);
    return res.data;
  },
  savePackage: async (pkg: Omit<SpecialPackage, 'id'>): Promise<SpecialPackage> => {
    const res = await axios.post(`${API_BASE}/packages`, pkg);
    return res.data;
  },
  updatePackage: async (id: string, updatedPkg: Partial<SpecialPackage>): Promise<SpecialPackage> => {
    const res = await axios.put(`${API_BASE}/packages/${id}`, updatedPkg);
    return res.data;
  },
  deletePackage: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/packages/${id}`);
  },

  // Experiences
  getExperiences: async (): Promise<Experience[]> => {
    const res = await axios.get(`${API_BASE}/experiences`);
    return res.data;
  },
  saveExperience: async (exp: Omit<Experience, 'id'>): Promise<Experience> => {
    const res = await axios.post(`${API_BASE}/experiences`, exp);
    return res.data;
  },
  deleteExperience: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/experiences/${id}`);
  },

  // Itineraries
  getItineraries: async (): Promise<Itinerary[]> => {
    const res = await axios.get(`${API_BASE}/itineraries`);
    return res.data;
  },
  saveItinerary: async (itinerary: Omit<Itinerary, 'id' | 'createdAt'>): Promise<Itinerary> => {
    const res = await axios.post(`${API_BASE}/itineraries`, itinerary);
    return res.data;
  },
  deleteItinerary: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/itineraries/${id}`);
  }
};
