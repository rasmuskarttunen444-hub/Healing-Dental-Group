import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, MapPin, Clock, ChevronRight, Star, CheckCircle2, Shield, Heart, Baby, Sparkles, Users, ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'services' | 'about' | 'new-patients' | 'reviews' | 'contact' | 'book' | 'results';

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Services', value: 'services' },
    { label: 'New Patients', value: 'new-patients' },
    { label: 'Results', value: 'results' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="bg-primary p-2 rounded-lg mr-2">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">HEALING</span>
              <span className="text-xs font-medium text-primary uppercase tracking-widest">Dental Group</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setCurrentPage(link.value)}
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === link.value ? 'text-primary' : 'text-slate-600'}`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage('book')}
              className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <a href="tel:9148745121" className="mr-4 p-2 text-primary">
              <Phone className="w-6 h-6" />
            </a>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => { setCurrentPage(link.value); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4">
                <button 
                  onClick={() => { setCurrentPage('book'); setIsMobileMenuOpen(false); }}
                  className="w-full bg-primary text-white px-6 py-4 rounded-xl font-bold text-center shadow-lg"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBook }: { onBook: () => void }) => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary-soft rounded-bl-[100px] hidden lg:block" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <MapPin className="w-3 h-3 mr-1" /> Hartsdale, NY • Westchester County
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Gentle, Family-Focused <span className="text-primary">Dental Care</span> in Hartsdale
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            Comprehensive care for children and adults—all in one place. We focus on comfort, education, and long-term relationships for your family's brightest smiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBook}
              className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center"
            >
              Book Appointment
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a 
              href="tel:9148745121"
              className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5 text-primary" />
              (914) 874-5121
            </a>
          </div>
          
          <div className="mt-12 flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-white" alt="Patient" referrerPolicy="no-referrer" />
              ))}
            </div>
            <div>
              <div className="flex items-center text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-slate-500 font-medium">Trusted by 500+ Westchester families</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-12 lg:mt-0 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/dentist-patient/800/600" 
              alt="Gentle Dentist Interaction" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 max-w-[200px]">
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-1.5 rounded-full mr-2">
                <CheckCircle2 className="text-green-600 w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-900">New Patient?</span>
            </div>
            <p className="text-xs text-slate-500 leading-tight">We accept most major insurance plans in Westchester.</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="py-12 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: Heart, text: "Family-friendly care" },
          { icon: Shield, text: "Experienced specialists" },
          { icon: Users, text: "Serving Westchester" },
          { icon: CheckCircle2, text: "Accepting new patients" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <item.icon className="w-8 h-8 text-primary mb-3" />
            <span className="text-sm font-semibold text-slate-700">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesOverview = ({ onLearnMore }: { onLearnMore: (s: string) => void }) => {
  const services = [
    {
      title: "Preventive Care",
      desc: "Routine cleanings, digital X-rays, and exams to keep your smile healthy.",
      icon: Shield,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Pediatric Dentistry",
      desc: "Specialized, gentle care for our youngest patients in a fun environment.",
      icon: Baby,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Gum & Advanced Care",
      desc: "Expert periodontal treatments and restorative surgery for complex needs.",
      icon: Users,
      color: "bg-teal-50 text-teal-600"
    },
    {
      title: "Cosmetic Dentistry",
      desc: "Professional whitening, veneers, and smile makeovers for your confidence.",
      icon: Sparkles,
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Dental Solutions</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Everything your family needs for optimal oral health, all under one roof in Hartsdale.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mb-6`}>
                <s.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{s.desc}</p>
              <button 
                onClick={() => onLearnMore(s.title)}
                className="text-primary font-bold text-sm flex items-center group"
              >
                Learn More 
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChoose = () => (
  <section className="py-24 bg-primary-soft">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        <div className="mb-12 lg:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Why Westchester Families Trust Healing Dental Group</h2>
          <div className="space-y-8">
            {[
              { title: "Personalized, Gentle Care", desc: "We treat every patient like family, with a focus on comfort and anxiety-free visits." },
              { title: "Modern Technology", desc: "Digital X-rays, advanced diagnostics, and minimally invasive techniques for better results." },
              { title: "Full-Service Dentistry", desc: "From pediatric care to complex periodontal surgery, we handle it all in-house." },
              { title: "Friendly, Welcoming Environment", desc: "Our Hartsdale office is designed to be a relaxing space for patients of all ages." }
            ].map((item, i) => (
              <div key={i} className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-health" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/dental-office/800/800" 
            className="rounded-[40px] shadow-2xl" 
            alt="Modern Dental Office" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-health/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Patients Say</h2>
        <div className="flex justify-center items-center space-x-1 text-yellow-400 mb-2">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <p className="text-slate-500 font-medium">4.8/5 Average Rating on Google</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Sarah M.", text: "The staff is incredibly friendly and they were so patient with my 5-year-old. Best pediatric dentist experience in Westchester!", location: "Scarsdale, NY" },
          { name: "David R.", text: "I've always had dental anxiety, but the team here explained everything so clearly. I felt completely at ease during my procedure.", location: "Hartsdale, NY" },
          { name: "Elena K.", text: "Modern office, short wait times, and very professional care. They accept my insurance and the billing was transparent.", location: "White Plains, NY" }
        ].map((t, i) => (
          <div key={i} className="bg-slate-50 p-8 rounded-3xl relative">
            <div className="absolute -top-4 left-8 bg-primary text-white p-2 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-slate-700 italic mb-6 leading-relaxed">"{t.text}"</p>
            <div>
              <p className="font-bold text-slate-900">{t.name}</p>
              <p className="text-xs text-slate-500">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
        <p className="text-slate-600 mb-8">Our team will call you within 24 hours to confirm your appointment time.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-primary font-bold hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-50">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Request an Appointment</h3>
      <p className="text-slate-500 text-sm mb-8">Fill out the form below and we'll contact you shortly.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
          <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
          <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="(914) 874-5121" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Service Needed</label>
        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none bg-white">
          <option>General Cleaning & Exam</option>
          <option>Pediatric Visit</option>
          <option>Gum Treatment / Periodontal</option>
          <option>Cosmetic Consultation</option>
          <option>Emergency Care</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Preferred Time</label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input type="radio" name="time" className="w-4 h-4 text-primary" defaultChecked />
            <span className="ml-3 text-sm font-medium text-slate-700">Morning</span>
          </label>
          <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
            <input type="radio" name="time" className="w-4 h-4 text-primary" />
            <span className="ml-3 text-sm font-medium text-slate-700">Afternoon</span>
          </label>
        </div>
      </div>

      <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all">
        Book My Appointment
      </button>
      <p className="text-center text-xs text-slate-400 mt-4">
        By clicking, you agree to be contacted by Healing Dental Group.
      </p>
    </form>
  );
};

const ResultsGallery = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Real Smiles, Real Results</h2>
        <p className="text-slate-600">See the transformations we've achieved for our Westchester patients.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Full Smile Makeover", type: "Cosmetic" },
          { title: "Professional Whitening", type: "Whitening" },
          { title: "Restorative Crowns", type: "Restorative" },
          { title: "Invisalign Transformation", type: "Orthodontics" },
          { title: "Gum Health Recovery", type: "Periodontal" },
          { title: "Pediatric Care Success", type: "Pediatric" }
        ].map((item, i) => (
          <div key={i} className="group relative rounded-3xl overflow-hidden shadow-lg bg-white">
            <img 
              src={`https://picsum.photos/seed/smile${i}/600/400`} 
              alt={item.title} 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{item.type}</span>
              <h4 className="text-white font-bold text-xl">{item.title}</h4>
            </div>
            <div className="p-4 md:hidden">
               <h4 className="text-slate-900 font-bold">{item.title}</h4>
               <p className="text-xs text-primary font-bold uppercase">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <footer className="bg-slate-900 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center mb-6">
            <Sparkles className="text-primary w-8 h-8 mr-2" />
            <span className="text-2xl font-bold tracking-tight">HEALING DENTAL</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Providing gentle, comprehensive dental care for families in Hartsdale and throughout Westchester County since 2010.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">Our Services</button></li>
            <li><button onClick={() => setCurrentPage('new-patients')} className="hover:text-white transition-colors">New Patient Info</button></li>
            <li><button onClick={() => setCurrentPage('results')} className="hover:text-white transition-colors">Smile Gallery</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">Meet the Team</button></li>
            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
              <span>The Fortune Building<br />280 N Central Ave #420, Hartsdale, NY 10530</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 text-primary mr-3" />
              <a href="tel:9148745121" className="hover:text-white">(914) 874-5121</a>
            </li>
            <li className="flex items-center">
              <Clock className="w-5 h-5 text-primary mr-3" />
              <span>Mon-Fri: 9am - 6pm</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Location</h4>
          <div className="rounded-xl overflow-hidden h-48 bg-slate-800 relative">
            <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs text-center p-4">
              [Google Maps Embed for Hartsdale, NY]
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-10 flex flex-col md:row justify-between items-center text-xs text-slate-500">
        <p>© 2026 Healing Dental Group. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
);

const MobileStickyCTA = ({ onBook }: { onBook: () => void }) => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-100 flex gap-3">
    <a 
      href="tel:9148745121" 
      className="flex-1 bg-slate-100 text-slate-900 py-3 rounded-xl font-bold text-center flex items-center justify-center"
    >
      <Phone className="w-5 h-5 mr-2 text-primary" />
      Call
    </a>
    <button 
      onClick={onBook}
      className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold text-center shadow-lg shadow-blue-200"
    >
      Book Now
    </button>
  </div>
);

// --- Page Components ---

const HomePage = ({ onBook, setCurrentPage }: { onBook: () => void, setCurrentPage: (p: Page) => void }) => (
  <>
    <Hero onBook={onBook} />
    <TrustSection />
    <ServicesOverview onLearnMore={(s) => setCurrentPage('services')} />
    <WhyChoose />
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img src="https://picsum.photos/seed/family-dental/800/600" className="rounded-3xl shadow-xl" alt="Happy Family" referrerPolicy="no-referrer" />
          </div>
          <div className="order-1 lg:order-2 mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">A Lifetime of Healthy Smiles for Your Family</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              From your child's first tooth to specialized care for seniors, we provide a continuous path of oral health. Our team is trained to handle pediatric needs with extra care, ensuring kids grow up with a positive view of the dentist.
            </p>
            <ul className="space-y-4 mb-10">
              {["Kid-friendly environment", "Gentle sedation options", "Parent education focus", "Flexible family scheduling"].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700 font-medium">
                  <Heart className="w-5 h-5 text-primary mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setCurrentPage('new-patients')}
              className="text-primary font-bold flex items-center hover:underline"
            >
              See New Patient Specials <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
    <Testimonials />
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-health rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready for a Better Dental Experience?</h2>
        <p className="text-xl text-slate-300 mb-12">Join hundreds of Westchester families who trust Healing Dental Group for their oral health.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={onBook}
            className="px-10 py-5 bg-primary text-white rounded-full font-bold text-xl shadow-2xl hover:bg-blue-700 transition-all"
          >
            Schedule Your Visit Today
          </button>
          <a 
            href="tel:9148745121"
            className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-xl hover:bg-white/20 transition-all"
          >
            Call (914) 874-5121
          </a>
        </div>
      </div>
    </section>
  </>
);

const ServicesPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-12">Our Dental Services</h1>
      <div className="grid md:grid-cols-2 gap-12">
        {[
          { title: "General Dentistry", items: ["Cleanings & Prevention", "Fillings & Sealants", "Digital X-Rays", "Oral Cancer Screenings"] },
          { title: "Pediatric Care", items: ["First Visit Orientation", "Fluoride Treatments", "Sealants", "Gentle Extractions"] },
          { title: "Periodontal Care", items: ["Deep Cleanings (Scaling)", "Gum Disease Treatment", "Bone Grafting", "Dental Implants"] },
          { title: "Cosmetic Services", items: ["Teeth Whitening", "Porcelain Veneers", "Bonding", "Invisalign"] }
        ].map((cat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-primary mb-6">{cat.title}</h3>
            <ul className="space-y-4">
              {cat.items.map((item, j) => (
                <li key={j} className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-health mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const NewPatientsPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Welcome to Healing Dental Group</h1>
        <p className="text-lg text-slate-600 mb-12">We're excited to meet you! Here's everything you need to know for your first visit to our Hartsdale office.</p>
        
        <div className="space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Insurance & Financing</h3>
            <p className="text-slate-600 mb-4">We accept most major PPO insurance plans. Our team will help you maximize your benefits and handle all the paperwork.</p>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Accepted Providers Include:</p>
              <p className="text-slate-700">Aetna, Cigna, Delta Dental, MetLife, UnitedHealthcare, Guardian, and many more.</p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">What to Expect</h3>
            <div className="grid gap-4">
              {[
                "Comprehensive oral exam",
                "Digital X-rays (if needed)",
                "Professional cleaning",
                "Personalized treatment plan discussion"
              ].map((step, i) => (
                <div key={i} className="flex items-center p-4 bg-white border border-slate-100 rounded-xl">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">{i+1}</div>
                  <span className="font-medium text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage onBook={() => setCurrentPage('book')} setCurrentPage={setCurrentPage} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'new-patients' && <NewPatientsPage />}
        {currentPage === 'results' && <ResultsGallery />}
        {currentPage === 'about' && (
          <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">Meet Our Team</h1>
            <div className="grid md:grid-cols-2 gap-12">
              <img src="https://picsum.photos/seed/dentist/800/1000" className="rounded-3xl shadow-xl" alt="Lead Dentist" referrerPolicy="no-referrer" />
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">Dr. [Name], Lead Dentist</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  With over 15 years of experience in family and restorative dentistry, Dr. [Name] is dedicated to providing the highest quality care in Westchester. Our philosophy is built on trust, education, and patient comfort.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-health mr-3" /> NYU College of Dentistry Graduate</div>
                  <div className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-health mr-3" /> Member of ADA & NYSDA</div>
                  <div className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-health mr-3" /> Specialized in Anxiety-Free Care</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentPage === 'contact' && (
          <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-12 text-center">Contact Us</h1>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Our Location</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-bold">Healing Dental Group</p>
                      <p className="text-slate-600">The Fortune Building<br />280 N Central Ave #420, Hartsdale, NY 10530</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-primary mr-4" />
                    <a href="tel:9148745121" className="text-lg font-bold hover:text-primary transition-colors">(914) 874-5121</a>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-bold">Office Hours</p>
                      <ul className="text-slate-600 text-sm space-y-1">
                        <li>Monday: 9:00 AM - 6:00 PM</li>
                        <li>Tuesday: 9:00 AM - 6:00 PM</li>
                        <li>Wednesday: 9:00 AM - 6:00 PM</li>
                        <li>Thursday: 9:00 AM - 6:00 PM</li>
                        <li>Friday: 9:00 AM - 4:00 PM</li>
                        <li>Saturday: By Appointment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <BookingForm />
            </div>
          </div>
        )}
        {currentPage === 'book' && (
          <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-2xl mx-auto px-4">
              <BookingForm />
            </div>
          </div>
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
      <MobileStickyCTA onBook={() => setCurrentPage('book')} />
    </div>
  );
}
