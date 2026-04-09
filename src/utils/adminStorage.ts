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
}

const API_BASE = '/api';

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
    const res = await axios.get(`${API_BASE}/help-requests`);
    return res.data;
  },
  saveHelpRequest: async (request: Omit<HelpRequest, 'id' | 'createdAt'>): Promise<HelpRequest> => {
    const res = await axios.post(`${API_BASE}/help-requests`, request);
    return res.data;
  },
  deleteHelpRequest: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/help-requests/${id}`);
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
  }
};
