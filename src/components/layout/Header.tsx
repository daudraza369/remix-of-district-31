import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/district-logo.png';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Plantscaping (Office & F&B)', href: '/services/plantscaping' },
      { label: 'Tree Customization', href: '/services/tree-customization' },
      { label: 'Tree Restoration', href: '/services/tree-restoration' },
      { label: 'Green Walls', href: '/services/green-walls' },
      { label: 'Custom Planter Design', href: '/services/planters' },
      { label: 'Maintenance', href: '/services/maintenance' },
    ],
  },
  { label: 'Collection', href: '/collection' },
  { label: 'Tree Solutions', href: '/tree-solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDropdownItemClick = (href: string) => {
    setActiveDropdown(null);
    navigate(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container-luxury px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-[60]">
            <img
              src={logo}
              alt="District Interiors"
              className={cn(
                'h-12 md:h-14 w-auto transition-all duration-300',
                isMobileMenuOpen ? 'brightness-100' : isScrolled ? 'brightness-100' : 'brightness-0 invert'
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  // Parent with dropdown - use button instead of link
                  <button
                    onClick={() => navigate(item.href)}
                    className={cn(
                      'flex items-center gap-1 text-sm uppercase tracking-wider font-semibold transition-colors duration-300',
                      isScrolled
                        ? 'text-night-green hover:text-slate-moss'
                        : 'text-ivory hover:text-stone'
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      activeDropdown === item.label && 'rotate-180'
                    )} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-1 text-sm uppercase tracking-wider font-semibold transition-colors duration-300',
                      isScrolled
                        ? 'text-night-green hover:text-slate-moss'
                        : 'text-ivory hover:text-stone'
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in z-[100]">
                    <div className="bg-ivory rounded-sm shadow-xl py-3 min-w-[280px] border border-stone/30">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleDropdownItemClick(child.href)}
                          className="block w-full text-left px-5 py-3 text-sm text-night-green hover:bg-pear/30 transition-colors duration-200"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Button
              variant={isScrolled ? 'default' : 'hero'}
              size="sm"
              onClick={scrollToContact}
            >
              Request a Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-[60] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-night-green" />
            ) : (
              <Menu
                className={cn(
                  'w-6 h-6',
                  isScrolled ? 'text-night-green' : 'text-ivory'
                )}
              />
            )}
          </button>
        </nav>

        {/* Mobile Menu - Full screen solid background */}
        <div
          className={cn(
            'fixed inset-0 bg-ivory z-50 lg:hidden transition-all duration-500 overflow-y-auto',
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        >
          <div className="flex flex-col items-center justify-center min-h-full gap-5 py-24 px-6">
            {navItems.map((item, index) => (
              <div key={item.label} className="text-center">
                <Link
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-heading text-night-green hover:text-slate-moss transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-3 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm text-slate-moss hover:text-night-green transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              variant="default"
              size="lg"
              onClick={scrollToContact}
              className="mt-6"
            >
              Request a Consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
