import { useState, useEffect, FormEvent } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter,
  ArrowUpRight,
  Calendar,
  Stethoscope,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none text-slate-900">Dr. Neyyan's</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">Dental Clinic</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-6">
              <a href="tel:+919096980880" className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-primary transition-colors">
                <Phone size={16} className="text-primary" />
                +91 9096980880
              </a>
              <a href="#contact" className="btn-primary px-6 py-3 rounded-2xl text-sm font-bold">
                Book Appointment
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-semibold text-slate-600 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <a href="tel:+919096980880" className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                  <Phone size={20} className="text-primary" />
                  +91 9096980880
                </a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full btn-primary py-4 rounded-2xl text-center font-bold">
                  Book Appointment
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Lead captured:', formData);
    alert('Thank you! We will call you back shortly.');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="bg-primary-light p-10 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Sparkles size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Get a Call Back</h3>
              <p className="text-slate-500 text-sm">We'll help you find your perfect smile</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-5 rounded-l-2xl border border-r-0 border-slate-100 bg-slate-100 text-slate-500 text-sm font-bold">
                    +91
                  </span>
                  <input 
                    required
                    type="tel" 
                    placeholder="98765 43210"
                    className="w-full px-5 py-4 rounded-r-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Treatment</label>
                <select 
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none bg-no-repeat bg-[right_1.25rem_center]"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundSize: '1.2em' }}
                  value={formData.treatment}
                  onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                >
                  <option value="">Choose a service</option>
                  <option value="Root Canal">Root Canal</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="Tooth Extraction">Tooth Extraction</option>
                  <option value="Teeth Cleaning">Teeth Cleaning</option>
                  <option value="General Checkup">General Checkup</option>
                </select>
              </div>
              <button type="submit" className="w-full btn-primary py-4 rounded-2xl font-bold text-lg mt-4">
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FloatingWhatsApp = () => (
  <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
    <a 
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="w-12 h-12 bg-white text-slate-400 rounded-full flex items-center justify-center shadow-lg hover:text-primary transition-all duration-300 border border-slate-100"
    >
      <ArrowUpRight className="-rotate-45" size={20} />
    </a>
    <a 
      href="https://wa.me/919096980880" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300"
    >
      <MessageCircle size={32} fill="currentColor" />
    </a>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LeadPopup />
      <FloatingWhatsApp />

      {/* Hero Section */}
      <section id="home" className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-xs font-bold mb-8">
                <Star size={14} fill="currentColor" />
                4.8/5 Rating on Google
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold text-slate-900 leading-[1.05] mb-8">
                Advanced <br />
                <span className="text-primary">Dental Care.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-12 max-w-md leading-relaxed">
                Experience world-class dental treatments in Vasai East. We combine expertise with a gentle touch.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <a href="#contact" className="btn-primary px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
                  Book Now <ArrowUpRight size={20} />
                </a>
                <a href="tel:+919096980880" className="px-10 py-5 rounded-2xl font-bold text-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Phone size={20} /> Call Clinic
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200" 
                  alt="Happy Patient" 
                  className="w-full h-auto grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 glass p-8 rounded-[2.5rem] shadow-xl z-20 hidden sm:block"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center text-accent">
                    <Award size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Experience</p>
                    <p className="text-xl font-bold text-slate-900">15+ Years</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-spacing bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">Trust in Excellence.</h2>
            <p className="text-xl text-slate-500 leading-relaxed mb-10">
              Dr. Neyyan's Dental Clinic and Implant Center provides high-quality dental care with advanced treatments, experienced doctors, and affordable pricing in Vasai East.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-slate-600 font-medium">Advanced rotary instruments for painless RCT.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-slate-600 font-medium">Biocompatible implants for permanent results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-5xl font-bold mb-4">Treatments.</h2>
              <p className="text-slate-400 font-medium">Specialized care for every dental need.</p>
            </div>
            <a href="#contact" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View all services <ChevronRight size={20} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Root Canal', icon: <Stethoscope />, desc: 'Painless RCT using advanced rotary instruments.' },
              { title: 'Dental Implants', icon: <ShieldCheck />, desc: 'Permanent solution with biocompatible implants.' },
              { title: 'Tooth Extraction', icon: <Sparkles />, desc: 'Quick and painless wisdom tooth surgeries.' },
              { title: 'Teeth Cleaning', icon: <Sparkles />, desc: 'Professional scaling for a healthier smile.' },
              { title: 'Cavity Filling', icon: <ShieldCheck />, desc: 'Aesthetic tooth-colored natural restorations.' },
              { title: 'General Checkup', icon: <Calendar />, desc: 'Comprehensive oral health assessment.' },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="card-minimal group"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-8 group-hover:bg-primary-light group-hover:text-primary transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-spacing bg-slate-900 text-white overflow-hidden relative rounded-[4rem] mx-4 sm:mx-6 lg:mx-10 my-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-12">Why Dr. Neyyan's?</h2>
              <div className="space-y-10">
                {[
                  '4.8★ Rated Clinic on Google',
                  'Experienced & Caring Doctors',
                  'Affordable & Transparent Charges',
                  'Advanced Diagnostic Equipment',
                  'Hygienic & Clean Environment'
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={18} className="text-accent" />
                    </div>
                    <span className="text-xl font-medium text-slate-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600" 
                  alt="Clinic" 
                  className="rounded-[2.5rem] opacity-80 transition-all duration-500" 
                  referrerPolicy="no-referrer" 
                />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600" 
                  alt="Equipment" 
                  className="rounded-[2.5rem] opacity-80 mt-12 transition-all duration-500" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-20">
            <h2 className="text-5xl font-bold mb-4">Reviews.</h2>
            <div className="flex items-center gap-2 text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              <span className="text-slate-900 font-bold ml-2">4.8 / 5.0</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: 'Samji Mathew', text: 'Great experience for teeth cleaning and root canal. Clean clinic and professional staff.' },
              { name: 'Monika Verma', text: 'Tooth extraction was quick and painless. Dentist made me feel comfortable throughout the process.' },
              { name: 'Betina Hycinth', text: 'Overcame my fear of dentists here. Very caring and confidence-building experience. Highly recommended!' },
            ].map((review, idx) => (
              <div key={idx} className="flex flex-col">
                <p className="text-2xl text-slate-800 font-medium leading-snug mb-10">"{review.text}"</p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{review.name}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing bg-slate-50 rounded-[4rem] mx-4 sm:mx-6 lg:mx-10 mb-10">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-5xl font-bold mb-12">Visit Us.</h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Address</p>
                    <p className="text-xl text-slate-700 leading-relaxed">
                      Krishna Sagar, A-3, New Link Road, Opp. Fire Brigade, Vasai East, Maharashtra 401209
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Call Us</p>
                    <a href="tel:+919096980880" className="text-2xl font-bold text-slate-900 hover:text-primary transition-colors">
                      +91 9096980880
                    </a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <Clock size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Hours</p>
                    <p className="text-xl text-slate-700">Mon - Sat: 11:00 AM - 09:00 PM</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold mt-4 shadow-sm">
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      Currently Closed
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex flex-wrap gap-6">
                <a 
                  href="https://www.google.com/maps/dir//Dr.+Neyyan's+Dental+Clinic+and+Implant+Center" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary px-10 py-5 rounded-2xl font-bold flex items-center gap-2"
                >
                  Get Directions <ArrowUpRight size={20} />
                </a>
                <a 
                  href="https://wa.me/919096980880" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-accent px-10 py-5 rounded-2xl font-bold flex items-center gap-2"
                >
                  <MessageCircle size={20} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[600px] border-[12px] border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.658257448358!2d72.8258!3d19.4162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a96444444445%3A0x4444444444444444!2sDr.%20Neyyan's%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Dr. Neyyan's</h2>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Dental Excellence</p>
                </div>
              </div>
              <p className="text-xl text-slate-400 max-w-sm leading-relaxed mb-10">
                Providing advanced dental care with a focus on patient comfort and clinical excellence.
              </p>
              <div className="flex gap-6">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-10">Explore</h4>
              <ul className="space-y-6 text-slate-400 font-medium">
                <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#treatments" className="hover:text-primary transition-colors">Treatments</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-10">Hindi</h4>
              <p className="text-slate-400 font-medium leading-relaxed">
                दर. नियमन'से डेंटल क्लिनिक एंड इंप्लांट सेंटर
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <p>© 2026 Dr. Neyyan's Clinic.</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <a href="#" className="hover:text-slate-900">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
