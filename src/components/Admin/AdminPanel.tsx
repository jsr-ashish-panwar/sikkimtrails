import React, { useState, useEffect } from 'react';
import { 
  X, LayoutDashboard, Calendar, MessageSquare, Package, LogOut, 
  ChevronRight, Trash2, Plus, Check, Clock, ShieldCheck, 
  TrendingUp, Users, Map, Star, Tag, Info, Camera, Image as ImageIcon
} from 'lucide-react';
import { adminStorage, Booking, HelpRequest, SpecialPackage, Experience, Itinerary } from '../../utils/adminStorage';

interface AdminPanelProps {
  onClose: () => void;
}

type TabType = 'dashboard' | 'bookings' | 'journeys' | 'helps' | 'content';

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // Data States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [helps, setHelps] = useState<HelpRequest[]>([]);
  const [packages, setPackages] = useState<SpecialPackage[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  
  // Management States
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const [newPackage, setNewPackage] = useState<Omit<SpecialPackage, 'id'>>({
    title: '',
    price: '',
    duration: '',
    popular: false,
    services: [''],
    safety: [''],
    offer: ''
  });

  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    name: '',
    description: '',
    price: '',
    duration: '',
    image: '',
    rating: 4.5
  });

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const refreshData = async () => {
    try {
      const [b, h, p, e, i] = await Promise.all([
        adminStorage.getBookings(),
        adminStorage.getHelpRequests(),
        adminStorage.getPackages(),
        adminStorage.getExperiences(),
        adminStorage.getItineraries()
      ]);
      setBookings(b.reverse());
      setHelps(h.reverse());
      setPackages(p.reverse());
      setExperiences(e.reverse());
      setItineraries(i.reverse());
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vidya@123') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied: Incorrect Security Key');
    }
  };

  const handleDelete = async (type: TabType | 'experience', id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    setIsDeleting(id);
    try {
      if (type === 'bookings') await adminStorage.deleteBooking(id);
      else if (type === 'helps') await adminStorage.deleteHelpRequest(id);
      else if (type === 'content') await adminStorage.deletePackage(id);
      else if (type === 'experience') await adminStorage.deleteExperience(id);
      else if (type === 'journeys') await adminStorage.deleteItinerary(id);
      await refreshData();
    } finally {
      setIsDeleting(null);
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminStorage.savePackage({
      ...newPackage,
      services: newPackage.services.filter(s => s.trim() !== ''),
      safety: newPackage.safety.filter(s => s.trim() !== '')
    });
    setNewPackage({ title: '', price: '', duration: '', popular: false, services: [''], safety: [''], offer: '' });
    setShowAddPackage(false);
    refreshData();
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminStorage.saveExperience(newExperience);
    setNewExperience({ name: '', description: '', price: '', duration: '', image: '', rating: 4.5 });
    setShowAddExperience(false);
    refreshData();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-fade-in border border-white/10">
          <div className="bg-gradient-to-br from-red-600 via-orange-600 to-red-700 p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-xl">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-tight">Admin Key</h2>
            <p className="text-xs font-bold opacity-70 uppercase tracking-[0.3em]">Secure Auth System</p>
          </div>
          <form onSubmit={handleLogin} className="p-10 space-y-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Security Access Key</label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-6 py-5 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-mono text-lg text-gray-900 dark:text-white"
                  required
                  autoFocus
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 active:translate-y-0 transition-all text-lg tracking-tight"
            >
              Authorize Securely
            </button>
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">Encrypted Connection</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-950 z-[100] flex flex-col md:flex-row overflow-hidden font-sans selection:bg-red-100 selection:text-red-900">
      {/* Premium Sidebar */}
      <div className="w-full md:w-80 bg-slate-900 border-r border-white/5 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-600/5 via-transparent to-transparent"></div>
        
        <div className="p-10 flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/50">
            <span className="text-white font-black text-xl">GI</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-white leading-none">Console</h2>
            <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.2em] mt-1">Management Hub</p>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2 relative z-10 mt-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'journeys', label: 'Spiritual Plans', icon: Map },
            { id: 'helps', label: 'Help Desk', icon: MessageSquare },
            { id: 'content', label: 'Content Mgr', icon: Package }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative group ${
                activeTab === tab.id 
                  ? 'bg-red-600 text-white shadow-2xl shadow-red-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110 ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`} />
              <span className="font-bold text-sm tracking-tight">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 relative z-10 bg-slate-900/50 backdrop-blur-md">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-500 hover:text-white hover:bg-red-600/10 transition-all font-bold text-sm group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] dark:bg-black transition-colors duration-500">
        <header className="bg-white dark:bg-slate-900 p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center sticky top-0 z-10">
          <div>
            <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-[0.3em] mb-1">System Terminal</p>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeTab === 'dashboard' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
            </h1>
          </div>
          <div className="flex gap-4">
             {activeTab === 'content' && (
               <div className="flex gap-2">
                  <button 
                    onClick={() => setShowAddExperience(true)}
                    className="bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Exp
                  </button>
                  <button 
                    onClick={() => setShowAddPackage(true)}
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Pkg
                  </button>
               </div>
            )}
            <button 
              onClick={onClose}
              className="p-3 text-slate-400 hover:text-red-600 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { label: 'Total Revenue', value: '₹' + bookings.reduce((acc, b) => acc + (parseInt(b.totalCost.split(' x ')[0].replace('₹', '').replace(',', '')) * b.participants || 0), 0).toLocaleString(), icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
                   { label: 'Active Bookings', value: bookings.length, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
                   { label: 'Unread Help', value: helps.length, icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10' },
                   { label: 'Journey Plans', value: itineraries.length, icon: Map, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/10' }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                      <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-[100%] opacity-40 group-hover:scale-125 transition-transform duration-500`}></div>
                      <stat.icon className={`h-10 w-10 ${stat.color} mb-6 relative z-10`} />
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                      <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h4>
                   </div>
                 ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-gray-100 dark:border-white/5">
                   <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-red-600" /> Recent Bookings
                   </h3>
                   <div className="space-y-4">
                      {bookings.slice(0, 5).map((b, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                           <div>
                              <p className="font-bold text-slate-900 dark:text-white">{b.experienceName}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">{b.date} • {b.participants} PPL</p>
                           </div>
                           <div className="text-right">
                              <p className="font-black text-red-600">{b.totalCost.split(' x ')[0]}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">Revenue</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-gray-100 dark:border-white/5">
                   <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                      <Info className="w-5 h-5 text-orange-600" /> Help Desk Status
                   </h3>
                   <div className="space-y-4">
                      {helps.slice(0, 5).map((h, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                           <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950 flex items-center justify-center rounded-xl text-orange-600 font-black text-xs">
                              {h.name.charAt(0)}
                           </div>
                           <div className="flex-1">
                              <p className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{h.subject}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">{h.name} • {new Date(h.createdAt!).toLocaleDateString()}</p>
                           </div>
                           <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings View */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {bookings.length === 0 ? (
                 <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-white/5">
                    <Calendar className="w-16 h-16 text-slate-100 dark:text-slate-800 mx-auto mb-6" />
                    <p className="text-slate-400 font-black uppercase tracking-widest">System Empty: No Bookings</p>
                 </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 dark:bg-red-900/10 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex flex-col lg:flex-row justify-between gap-10 relative z-10">
                      <div className="space-y-6 flex-1">
                        <div className="flex items-center gap-4">
                           <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                             ID: #{booking.id?.slice(-6)}
                           </div>
                           <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                             <Check className="w-4 h-4" /> Confirmed
                           </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{booking.experienceName}</h3>
                        <div className="flex flex-wrap gap-3">
                           {[
                             { icon: Calendar, label: booking.date, color: 'text-red-500' },
                             { icon: Clock, label: booking.time, color: 'text-orange-500' },
                             { icon: Users, label: `${booking.participants} Persons`, color: 'text-blue-500' }
                           ].map((inf, i) => (
                             <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-5 py-3 rounded-2xl border border-slate-100 dark:border-white/5">
                               <inf.icon className={`h-4 w-4 ${inf.color}`} />
                               <span className="text-sm font-black text-slate-600 dark:text-slate-300 tracking-tight">{inf.label}</span>
                             </div>
                           ))}
                        </div>
                        {booking.specialRequests && (
                          <div className="bg-orange-50/50 dark:bg-orange-900/10 p-6 rounded-[2rem] border border-orange-100/50 dark:border-orange-900/20">
                            <p className="text-[10px] font-black text-orange-800 dark:text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <Info className="w-3 h-3" /> Special Requests
                            </p>
                            <p className="text-sm text-orange-900 dark:text-orange-200 font-medium leading-relaxed italic">"{booking.specialRequests}"</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end justify-between min-w-[200px]">
                        <div className="text-right bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-white/5 w-full">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
                          <p className="text-4xl font-black text-red-600">{booking.totalCost.split(' x ')[0]}</p>
                          <p className="text-[10px] font-bold text-slate-300 uppercase mt-1">Calculated for {booking.participants} pax</p>
                        </div>
                        <button 
                          onClick={() => handleDelete('bookings', booking.id!)}
                          disabled={isDeleting === booking.id}
                          className="mt-6 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 p-5 rounded-[2rem] transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        >
                          {isDeleting === booking.id ? <Clock className="w-6 h-6 animate-spin" /> : <Trash2 className="w-6 h-6" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Spiritual Journeys View */}
          {activeTab === 'journeys' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {itineraries.length === 0 ? (
                 <div className="col-span-full text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-white/5">
                    <Map className="w-16 h-16 text-slate-100 dark:text-slate-800 mx-auto mb-6" />
                    <p className="text-slate-400 font-black uppercase tracking-widest">No Itinerary Plans generated yet</p>
                 </div>
              ) : (
                itineraries.map((it) => (
                  <div key={it.id} className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-xl transition-all relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 dark:bg-purple-900/10 rounded-bl-full group-hover:scale-150 transition-transform duration-500"></div>
                     <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600">
                           <Map className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Plan Generated</p>
                           <p className="text-xs font-bold text-slate-900 dark:text-white">{new Date(it.createdAt!).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting Point</p>
                              <p className="font-bold text-slate-900 dark:text-white">{it.startingPoint}</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                              <p className="font-bold text-slate-900 dark:text-white text-emerald-600">{it.destination}</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                              <p className="font-bold text-slate-900 dark:text-white">{it.duration}</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Spiritual Focus</p>
                              <p className="font-black text-red-600 dark:text-red-400">{it.spiritualFocus}</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-10 pt-8 border-t border-slate-50 dark:border-white/5 flex justify-between items-center">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-500 uppercase">Lang: {it.userLanguage}</span>
                        <button 
                          onClick={() => handleDelete('journeys', it.id!)}
                          className="text-slate-300 hover:text-red-500 p-2 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Help Desk View */}
          {activeTab === 'helps' && (
            <div className="space-y-6">
               {helps.length === 0 ? (
                 <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-white/5">
                    <MessageSquare className="w-16 h-16 text-slate-100 dark:text-slate-800 mx-auto mb-6" />
                    <p className="text-slate-400 font-black uppercase tracking-widest">Inbox Zero: No Help Requests</p>
                 </div>
              ) : (
                helps.map((help) => (
                  <div key={help.id} className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all relative group overflow-hidden">
                     <div className="absolute top-0 left-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/10 rounded-br-[4rem] group-hover:scale-110 transition-transform duration-500"></div>
                     <div className="flex flex-col lg:flex-row justify-between gap-10 relative z-10">
                        <div className="flex-1 space-y-6">
                           <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-500/20">
                                 {help.name.charAt(0)}
                              </div>
                              <div>
                                 <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{help.name}</h3>
                                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Received {new Date(help.createdAt!).toLocaleTimeString()}</p>
                              </div>
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-2">Subject Header</p>
                              <p className="text-xl font-black text-slate-800 dark:text-slate-100">{help.subject}</p>
                           </div>
                           <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/10 relative">
                              <div className="absolute top-4 right-6 text-slate-200 dark:text-slate-700 font-serif text-6xl">"</div>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic relative z-10">{help.message}</p>
                           </div>
                        </div>
                        <div className="flex flex-col items-end min-w-[150px]">
                           <div className="text-right mb-10">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-950 text-orange-600 rounded-full text-[10px] font-black uppercase ring-4 ring-orange-50">New Request</span>
                           </div>
                           <button 
                             onClick={() => handleDelete('helps', help.id!)}
                             className="bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 p-6 rounded-[2.5rem] transition-all shadow-sm active:scale-95 mt-auto"
                           >
                              <Trash2 className="w-6 h-6" />
                           </button>
                        </div>
                     </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Content Manager View */}
          {activeTab === 'content' && (
            <div className="space-y-16 animate-fade-in">
              {/* Special Packages Section */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <Package className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Tour Packages</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className={`bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-sm border-2 transition-all hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden group ${pkg.popular ? 'border-red-600' : 'border-slate-50 dark:border-white/5'}`}>
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black px-6 py-3 rounded-bl-3xl uppercase tracking-widest">
                          Special
                        </div>
                      )}
                      {pkg.offer && (
                        <div className="absolute top-12 right-0 bg-emerald-500 text-white text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest flex items-center gap-2">
                          <Tag className="w-3 h-3" /> {pkg.offer}
                        </div>
                      )}
                      
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 pr-10">{pkg.title}</h3>
                      <div className="flex items-baseline mb-6">
                        <span className="text-3xl font-black text-red-600">{pkg.price}</span>
                        <span className="text-slate-400 font-bold text-[10px] uppercase ml-2 tracking-widest">/ person</span>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl mb-6 inline-flex border border-slate-100 dark:border-white/5">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-tight">{pkg.duration}</span>
                      </div>

                      <div className="space-y-3 mb-10">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Includes</p>
                        {pkg.services.map((s, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400">
                            <Check className="w-4 h-4 text-emerald-500" /> {s}
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => handleDelete('content', pkg.id!)}
                        className="w-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-600 hover:text-white py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all transform active:scale-95"
                      >
                        Remove Package
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Cards Section */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <Camera className="w-8 h-8 text-orange-600" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Experience Cards</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-white/5 overflow-hidden group hover:shadow-2xl transition-all relative">
                      <div className="relative h-48 overflow-hidden">
                        <img src={exp.image} alt={exp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-black text-red-600 flex items-center gap-1 shadow-md">
                          <Star className="h-3 w-3 fill-current" /> {exp.rating || 4.5}
                        </div>
                      </div>
                      <div className="p-8">
                         <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-[0.2em] mb-2">{exp.duration}</p>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">{exp.name}</h4>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">{exp.price}</p>
                        <button 
                          onClick={() => handleDelete('experience', exp.id!)}
                          className="w-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-600 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                        >
                          Delete Experience
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Package Modal */}
      {showAddPackage && (
        <div className="fixed inset-0 bg-slate-950/80 z-[110] flex items-center justify-center p-4 backdrop-blur-lg animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/5">
            <div className="p-12">
              <div className="flex justify-between items-center mb-12">
                <div>
                   <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Forge Package</h2>
                   <p className="text-sm text-slate-400 font-bold mt-2">Design a new spiritual trail for travelers</p>
                </div>
                <button onClick={() => setShowAddPackage(false)} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl text-slate-400 hover:text-red-600 transition-all active:scale-95">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddPackage} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Package Identity</label>
                    <input
                      type="text"
                      value={newPackage.title}
                      onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                      placeholder="e.g., Sacred North Sikkkm Trail"
                      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-red-500/10 font-black text-slate-900 dark:text-white placeholder:text-slate-300"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing Model</label>
                    <input
                      type="text"
                      value={newPackage.price}
                      onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                      placeholder="e.g., ₹24,500"
                      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-red-500/10 font-black text-slate-900 dark:text-white placeholder:text-slate-300"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeframe</label>
                    <input
                      type="text"
                      value={newPackage.duration}
                      onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                      placeholder="e.g., 6 Days / 5 Nights"
                      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-red-500/10 font-black text-slate-900 dark:text-white placeholder:text-slate-300"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Special Offer Label</label>
                    <input
                      type="text"
                      value={newPackage.offer}
                      onChange={(e) => setNewPackage({...newPackage, offer: e.target.value})}
                      placeholder="e.g., EARLY BIRD 15% OFF"
                      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-black text-emerald-600 placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                  <div>
                    <p className="font-black text-slate-900 dark:text-white tracking-tight">Promote Package</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Highlight as "Special" in frontend</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={newPackage.popular}
                      onChange={(e) => setNewPackage({...newPackage, popular: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-16 h-9 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Services Matrix (Line Separated)</label>
                  <textarea
                    rows={4}
                    value={newPackage.services.join('\n')}
                    onChange={(e) => setNewPackage({...newPackage, services: e.target.value.split('\n')})}
                    placeholder="Premium Cabin&#10;Private Lama Guide&#10;Evening Prayer Access"
                    className="w-full px-8 py-6 bg-slate-50 dark:bg-slate-800 border-none rounded-[2rem] focus:ring-4 focus:ring-red-500/10 font-bold text-slate-900 dark:text-white placeholder:text-slate-200 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 transition-all text-xl tracking-tight"
                >
                  Deploy Package to Live
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Experience Modal */}
      {showAddExperience && (
        <div className="fixed inset-0 bg-slate-950/80 z-[110] flex items-center justify-center p-4 backdrop-blur-lg animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/5">
            <div className="p-12">
              <div className="flex justify-between items-center mb-12">
                <div>
                   <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">New Experience</h2>
                   <p className="text-sm text-slate-400 font-bold mt-2">Add a new spiritual or cultural activity</p>
                </div>
                <button onClick={() => setShowAddExperience(false)} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl text-slate-400 hover:text-red-600 transition-all active:scale-95">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddExperience} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience Name</label>
                    <input
                      type="text"
                      value={newExperience.name}
                      onChange={(e) => setNewExperience({...newExperience, name: e.target.value})}
                      placeholder="e.g., Sunrise Meditation"
                      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 font-black text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cost Point</label>
                    <input
                      type="text"
                      value={newExperience.price}
                      onChange={(e) => setNewExperience({...newExperience, price: e.target.value})}
                      placeholder="e.g., ₹1,500"
                      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 font-black text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</label>
                    <input
                      type="text"
                      value={newExperience.duration}
                      onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
                      placeholder="e.g., 2 Hours"
                      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 font-black text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={newExperience.rating}
                      onChange={(e) => setNewExperience({...newExperience, rating: parseFloat(e.target.value)})}
                      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 font-black text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-3 h-3" /> Image Resource URL
                  </label>
                  <input
                    type="text"
                    value={newExperience.image}
                    onChange={(e) => setNewExperience({...newExperience, image: e.target.value})}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 font-bold text-slate-900 dark:text-white"
                    required
                  />
                  <p className="text-[10px] text-slate-400 font-bold uppercase italic">* Use high-resolution Unsplash or direct links</p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description Narrative</label>
                  <textarea
                    rows={4}
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                    placeholder="Describe the mystical essence of this experience..."
                    className="w-full px-8 py-6 bg-slate-50 dark:bg-slate-800 border-none rounded-[2rem] focus:ring-4 focus:ring-orange-500/10 font-bold text-slate-900 dark:text-white resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 dark:bg-slate-800 text-white font-black py-6 rounded-[2rem] shadow-2xl hover:bg-black transition-all text-xl tracking-tight"
                >
                  Publish Experience
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
