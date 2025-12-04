import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import logo from '@/assets/district-logo.png';

const contactInfo = {
  email: 'Sales@district.sa',
  phone: '+966 056 228 8177',
  whatsapp: '+966 50 060 6506',
  address: 'Al Zoubair Ibn Al Awwam, Ar Rawabi, Riyadh 14214',
  googleMaps: 'https://share.google/OwSIbmaVwv0vXcatO',
};

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/districtflora', abbr: 'IG' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@districtflora', abbr: 'TT' },
  { label: 'Snapchat', href: '#', abbr: 'SC' },
];

export function Footer() {
  return (
    <footer className="bg-night-green py-16 px-6 md:px-12 lg:px-20">
      <div className="container-luxury">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <img src={logo} alt="District Interiors" className="h-16 w-auto mb-6 brightness-0 invert" />
            <p className="text-stone/80 max-w-md leading-relaxed mb-6">
              Transforming spaces through expert plantscaping, luxury softscaping, and custom tree fabrication.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-ivory/10 flex items-center justify-center hover:bg-pear hover:text-night-green transition-colors duration-300"
                  aria-label={social.label}
                >
                  <span className="text-xs font-semibold text-ivory hover:text-night-green">{social.abbr}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-ivory mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 text-stone/80 hover:text-pear transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 text-stone/80 hover:text-pear transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '').replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-stone/80 hover:text-pear transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>WhatsApp: {contactInfo.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-stone/80 hover:text-pear transition-colors duration-300"
                >
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>{contactInfo.address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-ivory mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Services', 'Collection', 'Projects', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="text-stone/80 hover:text-pear transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-ivory mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Plantscaping', href: '/services/plantscaping' },
                { label: 'Tree Customization', href: '/services/tree-customization' },
                { label: 'Tree Restoration', href: '/services/tree-restoration' },
                { label: 'Green Walls', href: '/services/green-walls' },
                { label: 'Custom Planter Design', href: '/services/planters' },
                { label: 'Maintenance', href: '/services/maintenance' },
              ].map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-stone/80 hover:text-pear transition-colors duration-300"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone/60 text-sm">
            © {new Date().getFullYear()} District Interiors. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-stone/60 hover:text-pear text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-stone/60 hover:text-pear text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}