import React from 'react';
import { 
  Check, 
  Hotel, 
  Map, 
  Car, 
  Utensils, 
  ShieldCheck, 
  Navigation, 
  AlertCircle, 
  Headphones, 
  Smartphone,
  Shield,
  Clock,
  MapPin,
  Star,
  MessageCircle
} from 'lucide-react';
import { adminStorage } from '../utils/adminStorage';
import { useState, useEffect } from 'react';

interface PackageProps {
  t: any;
}

const Packages: React.FC<PackageProps> = ({ t }) => {
  const tp = t?.tourPackages || {
    title: 'Tour Packages',
    subtitle: 'Discover our curated spiritual journeys.',
    basic: { title: 'Basic', duration: '3 Days', services: [] },
    premium: { title: 'Premium', duration: '5 Days', services: [] },
    luxury: { title: 'Luxury', duration: '7 Days', services: [] },
    safetySection: { title: 'Safety', description: 'Your safety is our priority.', features: { gps: {}, sos: {}, support: {}, partners: {} } }
  };
  const [specialPackages, setSpecialPackages] = useState<any[]>([]);

  useEffect(() => {
    // Load special packages from storage
    const fetchPackages = async () => {
      try {
        const loaded = await adminStorage.getPackages();
        setSpecialPackages(Array.isArray(loaded) ? loaded : []);
      } catch (error) {
         console.error('Failed to load packages:', error);
      }
    };
    fetchPackages();
  }, []);

  const handlePackageBooking = (packageName: string) => {
    const message = `Namaste! I am interested in the ${packageName} from Sikkim Trails. Please provide more details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918650882398?text=${encodedMessage}`, '_blank');
  };

  const packages = [
    {
      title: tp.basic?.title,
      price: '₹5,999',
      duration: tp.basic?.duration,
      popular: false,
      services: [
        { icon: <Hotel className="h-4 w-4" />, text: tp.basic?.services?.[0] },
        { icon: <Map className="h-4 w-4" />, text: tp.basic?.services?.[1] },
        { icon: <Car className="h-4 w-4" />, text: tp.basic?.services?.[2] },
        { icon: <Utensils className="h-4 w-4" />, text: tp.basic?.services?.[3] }
      ],
      safety: [
        tp.safetySection?.features?.gps?.title,
        tp.safetySection?.features?.support?.title
      ]
    },
    {
      title: tp.premium?.title,
      price: '₹12,499',
      duration: tp.premium?.duration,
      popular: true,
      services: [
        { icon: <Hotel className="h-4 w-4" />, text: tp.premium?.services?.[0] },
        { icon: <Map className="h-4 w-4" />, text: tp.premium?.services?.[1] },
        { icon: <Utensils className="h-4 w-4" />, text: tp.premium?.services?.[2] },
        { icon: <Car className="h-4 w-4" />, text: tp.premium?.services?.[3] },
        { icon: <Navigation className="h-4 w-4" />, text: tp.premium?.services?.[4] }
      ],
      safety: [
        tp.safetySection?.features?.gps?.title,
        tp.safetySection?.features?.sos?.title,
        tp.safetySection?.features?.support?.title
      ]
    },
    {
      title: tp.luxury?.title,
      price: '₹24,999',
      duration: tp.luxury?.duration,
      popular: false,
      services: [
        { icon: <Hotel className="h-4 w-4" />, text: tp.luxury?.services?.[0] },
        { icon: <Map className="h-4 w-4" />, text: tp.luxury?.services?.[1] },
        { icon: <Utensils className="h-4 w-4" />, text: tp.luxury?.services?.[2] },
        { icon: <Car className="h-4 w-4" />, text: tp.luxury?.services?.[3] },
        { icon: <Navigation className="h-4 w-4" />, text: tp.luxury?.services?.[4] }
      ],
      safety: [
        tp.safetySection?.features?.gps?.title,
        tp.safetySection?.features?.sos?.title,
        tp.safetySection?.features?.support?.title,
        tp.safetySection?.features?.partners?.title
      ]
    }
  ];

  const safetyFeatures = [
    { 
      icon: <Navigation className="h-6 w-6" />, 
      title: tp.safetySection?.features?.gps?.title, 
      desc: tp.safetySection?.features?.gps?.desc 
    },
    { 
      icon: <AlertCircle className="h-6 w-6" />, 
      title: tp.safetySection?.features?.sos?.title, 
      desc: tp.safetySection?.features?.sos?.desc 
    },
    { 
      icon: <Headphones className="h-6 w-6" />, 
      title: tp.safetySection?.features?.support?.title, 
      desc: tp.safetySection?.features?.support?.desc 
    },
    { 
      icon: <Smartphone className="h-6 w-6" />, 
      title: tp.safetySection?.features?.partners?.title, 
      desc: tp.safetySection?.features?.partners?.desc 
    }
  ];

  return (
    <div id="packages" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">{tp.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            {tp.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`relative bg-white rounded-[3rem] overflow-hidden transition-all duration-300 transform hover:-translate-y-4 shadow-xl border-4 ${
                pkg.popular ? 'border-red-600 shadow-2xl scale-105 z-10' : 'border-gray-100'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-lg font-black text-gray-900 mb-1">{pkg.title}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-black text-red-600">{pkg.price}</span>
                  <span className="text-gray-400 text-sm ml-2">/ person</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-8 bg-gray-50 p-2 rounded-xl">
                  <Clock className="h-4 w-4 mr-2 text-red-600" />
                  {pkg.duration}
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Services Included</p>
                  {pkg.services?.map((svc, idx) => (
                    svc.text && (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="bg-red-50 p-1.5 rounded-lg mr-3 text-red-600">
                          {svc.icon}
                        </div>
                        <span className="line-clamp-1">{svc.text}</span>
                      </div>
                    )
                  ))}
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Safety Features</p>
                  {pkg.safety?.map((safe, idx) => (
                    safe && (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <ShieldCheck className="h-4 w-4 mr-3 text-green-500 shrink-0" />
                        <span className="line-clamp-1">{safe}</span>
                      </div>
                    )
                  ))}
                </div>

                <button 
                  onClick={() => handlePackageBooking(pkg.title || '')}
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    pkg.popular 
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200' 
                      : 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-200'
                  }`}
                >
                  Book Now
                  <Check className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Render Special Packages */}
          {specialPackages.map((pkg) => (
            <div 
              key={`special-${pkg.id}`} 
              className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 transform hover:-translate-y-4 shadow-xl border-4 ${
                pkg.popular ? 'border-red-600 shadow-2xl scale-105 z-10' : 'border-gray-100'
              }`}
            >
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                Special Offer
              </div>
              
              <div className="p-8">
                <h3 className="text-lg font-black text-gray-900 mb-1">{pkg.title}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-black text-red-600">{pkg.price}</span>
                  <span className="text-gray-400 text-sm ml-2">/ person</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-8 bg-gray-50 p-2 rounded-xl">
                  <Clock className="h-4 w-4 mr-2 text-red-600" />
                  {pkg.duration}
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Services Included</p>
                  {pkg.services?.map((svc: string, idx: number) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="bg-red-50 p-1.5 rounded-lg mr-3 text-red-600">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="line-clamp-1">{svc}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handlePackageBooking(pkg.title)}
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white hover:opacity-90 shadow-lg shadow-red-200`}
                >
                  Book Now
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Tracking System Section */}
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-48 h-48 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-red-100 text-red-600 p-3 rounded-2xl inline-block mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">{tp.safetySection.title}</h2>
              <p className="text-gray-600 mb-8 max-w-lg">
                {tp.safetySection.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {safetyFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-red-50 p-2 rounded-xl mr-4 text-red-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{feature.title}</h4>
                      <p className="text-[10px] text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
               <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1527352723447-44bc8f761ca7?auto=format&fit=crop&q=80&w=800" 
                    alt="Safety Tracking" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/60 to-transparent flex items-end p-8">
                     <div className="text-white">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                           <span className="text-[10px] uppercase font-bold tracking-widest">Live Monitoring Active</span>
                        </div>
                        <p className="text-sm font-bold">Safe Journey Guaranteed</p>
                     </div>
                  </div>
               </div>
               
               {/* Decorative dots grid */}
               <div className="absolute -top-6 -right-6 grid grid-cols-4 gap-2 opacity-20">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-red-600 rounded-full"></div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;