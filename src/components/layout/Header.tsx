import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logoBrandmark from '@/assets/district-brandmark.png';
import logoBrandmarkNightGreen from '@/assets/district-brandmark-night-green.png';
import logoLockup from '@/assets/district-logo-lockup.png';
import logoLockupNightGreen from '@/assets/district-logo-lockup-night-green.png';

// Pages that have dark hero sections where transparent header works well
const HERO_PAGES = ['/', '/flowers', '/hospitality', '/projects', '/tree-solutions'];

const navItems = [
  { label: 'FLOWERS', href: '/flowers' },
  {
    label: 'INTERIORS',
    href: '/services',
    children: [
      { label: 'PLANTSCAPING', href: '/services/plantscaping' },
      { label: 'TREE SOLUTIONS', href: '/tree-solutions' },
      { label: 'PLANT MAINTENANCE', href: '/services/maintenance' },
      { label: 'CUSTOM PLANTERS', href: '/services/planters' },
      { label: 'GREEN WALLS', href: '/services/green-walls' },
    ],
  },
  { label: 'HOSPITALITY', href: '/hospitality' },
  { label: 'PROJECTS', href: '/projects' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if current page has a dark hero that works with transparent header
  const hasHeroSection = HERO_PAGES.includes(location.pathname);
  const shouldUseTransparentHeader = hasHeroSection && !isScrolled;

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

  const handleConsultation = () => {
    setIsMobileMenuOpen(false);
    const consultationForm = document.getElementById('consultation-form');
    const contactSection = document.getElementById('contact');
    
    if (consultationForm) {
      consultationForm.scrollIntoView({ behavior: 'smooth' });
    } else if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  const handleDropdownItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(null);
    navigate(href);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    navigate(item.href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ease-out',
        isScrolled || !hasHeroSection
          ? 'py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-b border-ivory/20'
          : 'py-5 bg-transparent'
      )}
      style={{
        // Liquid glass gradient effect when scrolled OR on non-hero pages
        background: (isScrolled || !hasHeroSection)
          ? 'linear-gradient(135deg, hsla(60, 3%, 78%, 0.75) 0%, hsla(60, 30%, 98%, 0.6) 50%, hsla(155, 22%, 16%, 0.2) 100%)'
          : 'transparent'
      }}
    >
      <div className="container-luxury px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between">
          {/* Logo - Full lockup at top, night-green brandmark when scrolled */}
          <Link to="/" className="relative z-[60] flex flex-col items-center group">
            {/* Full logo lockup - ivory on hero pages with transparent header, night-green otherwise */}
            <img
              src={shouldUseTransparentHeader ? logoLockup : logoLockupNightGreen}
              alt="District Interiors"
              className={cn(
                "h-16 md:h-20 w-auto transition-all duration-500",
                isScrolled ? "opacity-0 h-0 absolute" : "opacity-100"
              )}
            />
            {/* Brandmark only - night-green when scrolled (always on solid background) */}
            <img
              src={logoBrandmarkNightGreen}
              alt="District"
              className={cn(
                "h-10 md:h-12 w-auto transition-all duration-500",
                isScrolled ? "opacity-100" : "opacity-0 h-0 absolute"
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
                  <button
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      'flex items-center gap-1 text-sm font-nav font-bold uppercase tracking-wider transition-all duration-300 relative',
                      'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:origin-right before:scale-x-0 before:transition-transform before:duration-300',
                      shouldUseTransparentHeader
                        ? 'text-ivory/90 hover:text-pear before:bg-pear' 
                        : 'text-night-green hover:text-slate-moss before:bg-night-green',
                      activeDropdown === item.label && (shouldUseTransparentHeader ? 'text-pear' : 'text-slate-moss'),
                      'hover:before:scale-x-100 hover:before:origin-left'
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform duration-300',
                      activeDropdown === item.label && 'rotate-180'
                    )} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      'flex items-center gap-1 text-sm font-nav font-bold uppercase tracking-wider transition-all duration-300 relative',
                      'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:origin-right before:scale-x-0 before:transition-transform before:duration-300',
                      shouldUseTransparentHeader
                        ? 'text-ivory/90 hover:text-pear before:bg-pear' 
                        : 'text-night-green hover:text-slate-moss before:bg-night-green',
                      'hover:before:scale-x-100 hover:before:origin-left'
                    )}
                  >
                    {item.label}
                  </button>
                )}

                {/* Dropdown - Solid Glass Card Style for readability */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-3 animate-fade-in z-[1500]">
                    <div 
                      className="rounded-md py-3 min-w-[240px] border border-ivory/40 backdrop-blur-2xl"
                      style={{
                        background: 'linear-gradient(145deg, hsla(60, 3%, 78%, 0.92) 0%, hsla(60, 30%, 96%, 0.88) 100%)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)'
                      }}
                    >
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={(e) => handleDropdownItemClick(e, child.href)}
                          className="block w-full text-left px-5 py-3 text-sm font-heading text-night-green hover:text-night-green transition-all duration-200 hover:pl-6 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-[2px] before:bg-pear before:transition-all before:duration-200 hover:before:w-3 hover:before:ml-2"
                          style={{ 
                            background: 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(90deg, hsla(72, 46%, 83%, 0.4) 0%, transparent 100%)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button - Premium elevated style */}
            <Button
              onClick={handleConsultation}
              className={cn(
                "font-heading text-xs tracking-wider uppercase transition-all duration-500",
                "shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
                "hover:-translate-y-0.5",
                shouldUseTransparentHeader
                  ? "bg-pear/90 text-night-green hover:bg-pear border border-pear/50" 
                  : "bg-night-green text-ivory hover:bg-slate-moss"
              )}
              size="sm"
            >
              REQUEST A CONSULTATION
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-[1100] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-night-green" />
            ) : (
              <Menu className={cn(
                "w-6 h-6 transition-colors duration-300",
                shouldUseTransparentHeader ? "text-ivory" : "text-night-green"
              )} />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu - Full screen solid background - OUTSIDE container for full coverage */}
      <div
        className={cn(
          'fixed inset-0 bg-ivory z-[1050] lg:hidden transition-all duration-500 overflow-y-auto',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        )}
      >
        <div className="flex flex-col items-center justify-center min-h-full gap-5 py-24 px-6">
          {navItems.map((item, index) => (
            <div key={item.label} className="text-center">
              <button
                onClick={() => {
                  handleNavClick(item);
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-heading text-night-green hover:text-slate-moss transition-colors uppercase tracking-wider"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </button>
              {item.children && (
                <div className="mt-3 space-y-2">
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      onClick={() => {
                        navigate(child.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-sm font-heading text-slate-moss hover:text-night-green transition-colors uppercase tracking-wider"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button
            variant="default"
            size="lg"
            onClick={handleConsultation}
            className="mt-6 font-heading"
          >
            REQUEST A CONSULTATION
          </Button>
        </div>
      </div>
    </header>
  );
}
