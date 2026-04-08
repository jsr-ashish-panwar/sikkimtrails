import React, { useState, useEffect } from 'react';
import { X, LayoutDashboard, Calendar, MessageSquare, Package, LogOut, ChevronRight, Trash2, Plus, Check, Clock, ShieldCheck } from 'lucide-react';
import { adminStorage, Booking, HelpRequest, SpecialPackage } from '../../utils/adminStorage';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'helps' | 'packages'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [helps, setHelps] = useState<HelpRequest[]>([]);
  const [packages, setPackages] = useState<SpecialPackage[]>([]);
  
  // New Package Form State
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newPackage, setNewPackage] = useState<Omit<SpecialPackage, 'id'>>({
    title: '',
    price: '',
    duration: '',
    popular: false,
    services: [''],
    safety: ['']
  });

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const refreshData = () => {
    setBookings(adminStorage.getBookings().reverse());
    setHelps(adminStorage.getHelpRequests().reverse());
    setPackages(adminStorage.getPackages().reverse());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Vidya@123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password');
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Delete this booking?')) {
      adminStorage.deleteBooking(id);
      refreshData();
    }
  };

  const handleDeleteHelp = (id: string) => {
    if (window.confirm('Delete this help request?')) {
      adminStorage.deleteHelpRequest(id);
      refreshData();
    }
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Delete this package?')) {
      adminStorage.deletePackage(id);
      refreshData();
    }
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    adminStorage.savePackage({
      ...newPackage,
      services: newPackage.services.filter(s => s.trim() !== ''),
      safety: newPackage.safety.filter(s => s.trim() !== '')
    });
    setNewPackage({
      title: '',
      price: '',
      duration: '',
      popular: false,
      services: [''],
      safety: ['']
    });
    setShowAddPackage(false);
    refreshData();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black mb-2">Admin Portal</h2>
            <p className="text-sm opacity-80">GHOOMOINDIA Management System</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Enter Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-mono"
                required
              />
            </div>
            <div className="flex gap-3">
               <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-4 text-gray-400 font-bold hover:text-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Unlock Access
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 z-[100] flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
        <div className="p-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-gray-900 leading-tight">Admin</h2>
            <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Ghoomo India</p>
          </div>
          <button onClick={onClose} className="md:hidden p-2 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'helps', label: 'Help Requests', icon: MessageSquare },
            { id: 'packages', label: 'Special Packages', icon: Package }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-red-50 text-red-600 shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-red-600' : 'text-gray-400'}`} />
              <span className="font-bold text-sm tracking-tight">{tab.label}</span>
              {activeTab === tab.id && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white p-8 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h1>
          <div className="flex gap-4">
             {activeTab === 'packages' && (
              <button 
                onClick={() => setShowAddPackage(true)}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Package
              </button>
            )}
            <button 
              onClick={onClose}
              className="hidden md:flex bg-gray-100 text-gray-600 p-3 rounded-xl hover:bg-gray-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                 <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold">No bookings found</p>
                 </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full opacity-30 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-red-100 p-2 rounded-xl text-red-600">
                             <Clock className="w-4 h-4" />
                          </div>
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900">{booking.experienceName}</h3>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                            <Calendar className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-bold text-gray-600">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-bold text-gray-600">{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                            <LayoutDashboard className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-bold text-gray-600">{booking.participants} persons</span>
                          </div>
                        </div>
                        {booking.specialRequests && (
                          <div className="bg-red-50/50 p-4 rounded-2xl border border-red-50">
                            <p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-1">Special Requests</p>
                            <p className="text-sm text-red-600 italic">"{booking.specialRequests}"</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end justify-between">
                         <div className="text-right">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1 text-right">Revenue</p>
                            <p className="text-3xl font-black text-red-600">{booking.totalCost}</p>
                         </div>
                         <button 
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="bg-gray-50 text-gray-400 p-4 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                         >
                            <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'helps' && (
            <div className="space-y-4">
               {helps.length === 0 ? (
                 <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold">No help requests found</p>
                 </div>
              ) : (
                helps.map((help) => (
                  <div key={help.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-orange-50 rounded-br-full opacity-30 group-hover:scale-150 transition-transform duration-500"></div>
                     <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                        <div className="flex-1 space-y-4">
                           <div className="flex items-center gap-3">
                              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{new Date(help.createdAt).toLocaleDateString()} • {new Date(help.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                           </div>
                           <div>
                              <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Sender</p>
                              <h3 className="text-xl font-black text-gray-900">{help.name}</h3>
                           </div>
                           <div>
                              <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">Subject</p>
                              <p className="text-lg font-bold text-gray-800">{help.subject}</p>
                           </div>
                           <div className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100">
                              <p className="text-gray-600 leading-relaxed italic">"{help.message}"</p>
                           </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <button 
                              onClick={() => handleDeleteHelp(help.id)}
                              className="bg-gray-50 text-gray-400 p-4 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm mt-auto"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                     </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {packages.length === 0 ? (
                 <div className="col-span-full text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold">No special packages added yet</p>
                 </div>
              ) : (
                packages.map((pkg) => (
                  <div key={pkg.id} className={`bg-white rounded-[2.5rem] p-8 shadow-sm border-4 transition-all hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden group ${pkg.popular ? 'border-red-600 shadow-red-100' : 'border-gray-50'}`}>
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-4 py-2 rounded-bl-2xl uppercase tracking-widest">
                        Special
                      </div>
                    )}
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{pkg.title}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-black text-red-600">{pkg.price}</span>
                      <span className="text-gray-400 text-xs ml-2 uppercase font-bold tracking-widest">/ person</span>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl mb-6 inline-flex">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-bold text-gray-600">{pkg.duration}</span>
                    </div>

                    <div className="space-y-4 mb-8">
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Services</p>
                       {pkg.services.map((s, i) => (
                         <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                           <Check className="w-4 h-4 text-green-500" /> {s}
                         </div>
                       ))}
                    </div>

                    <button 
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all transform active:scale-95"
                    >
                      Remove Package
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Package Modal */}
      {showAddPackage && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-bounce-in">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                   <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Special Package</h2>
                   <p className="text-sm text-gray-400 font-bold">Fill in the details for the new traveler experience</p>
                </div>
                <button onClick={() => setShowAddPackage(false)} className="bg-gray-100 p-3 rounded-xl text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddPackage} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Package Title</label>
                    <input
                      type="text"
                      value={newPackage.title}
                      onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                      placeholder="e.g., Hidden Valleys of North Sikkim"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Price Display</label>
                    <input
                      type="text"
                      value={newPackage.price}
                      onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                      placeholder="e.g., ₹18,990"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Duration</label>
                    <input
                      type="text"
                      value={newPackage.duration}
                      onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                      placeholder="e.g., 4 Days / 3 Nights"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-4 h-full pt-10">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newPackage.popular}
                        onChange={(e) => setNewPackage({...newPackage, popular: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                      <span className="ml-3 text-sm font-black text-gray-900 uppercase tracking-widest">Mark as Special</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Services Included (One per line)</label>
                  <textarea
                    rows={4}
                    value={newPackage.services.join('\n')}
                    onChange={(e) => setNewPackage({...newPackage, services: e.target.value.split('\n')})}
                    placeholder="Luxury Hotel Stay&#10;Private Cab&#10;Daily Breakfast"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-red-200 hover:shadow-2xl hover:-translate-y-1 transition-all text-lg tracking-tight"
                >
                  Publish Special Package
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
