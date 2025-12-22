import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/district-logo.png';

const navItems = [
  { label: 'DISTRICT', href: '/' },
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out',
        isScrolled
          ? 'py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-b border-ivory/20'
          : 'py-5 bg-transparent'
      )}
      style={{
        // Liquid glass gradient effect when scrolled
        background: isScrolled 
          ? 'linear-gradient(135deg, hsla(60, 3%, 78%, 0.65) 0%, hsla(60, 30%, 98%, 0.45) 50%, hsla(155, 22%, 16%, 0.15) 100%)'
          : 'transparent'
      }}
    >
      <div className="container-luxury px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between">
          {/* Logo - Pear colored monogram with DISTRICT wordmark */}
          <Link to="/" className="relative z-[60] flex flex-col items-center group">
            <img
              src={logo}
              alt="District"
              className={cn(
                "h-10 md:h-12 w-auto transition-all duration-500",
                // Pear color filter for the logo
                "brightness-0 saturate-100",
                "[filter:invert(90%)_sepia(12%)_saturate(648%)_hue-rotate(31deg)_brightness(103%)_contrast(87%)]"
              )}
            />
            <span 
              className={cn(
                "font-heading text-xs tracking-[0.3em] mt-1 transition-all duration-500",
                isScrolled ? "text-night-green" : "text-pear"
              )}
            >
              DISTRICT
            </span>
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
                      'flex items-center gap-1 text-sm font-nav uppercase tracking-wider transition-all duration-300 relative',
                      'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:origin-right before:scale-x-0 before:transition-transform before:duration-300',
                      isScrolled 
                        ? 'text-night-green hover:text-slate-moss before:bg-night-green' 
                        : 'text-ivory/90 hover:text-pear before:bg-pear',
                      activeDropdown === item.label && (isScrolled ? 'text-slate-moss' : 'text-pear'),
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
                      'flex items-center gap-1 text-sm font-nav uppercase tracking-wider transition-all duration-300 relative',
                      'before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:origin-right before:scale-x-0 before:transition-transform before:duration-300',
                      isScrolled 
                        ? 'text-night-green hover:text-slate-moss before:bg-night-green' 
                        : 'text-ivory/90 hover:text-pear before:bg-pear',
                      'hover:before:scale-x-100 hover:before:origin-left'
                    )}
                  >
                    {item.label}
                  </button>
                )}

                {/* Dropdown - Liquid Glass Style */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-3 animate-fade-in z-[100]">
                    <div 
                      className="rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.15)] py-3 min-w-[220px] border border-ivory/30 backdrop-blur-xl"
                      style={{
                        background: 'linear-gradient(135deg, hsla(60, 3%, 78%, 0.85) 0%, hsla(60, 30%, 98%, 0.75) 50%, hsla(155, 22%, 16%, 0.2) 100%)'
                      }}
                    >
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={(e) => handleDropdownItemClick(e, child.href)}
                          className="block w-full text-left px-5 py-3 text-sm font-nav text-night-green hover:bg-pear/30 hover:text-night-green transition-all duration-200 hover:pl-6"
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
                "font-nav text-xs tracking-wider uppercase transition-all duration-500",
                "shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
                "hover:-translate-y-0.5",
                isScrolled 
                  ? "bg-night-green text-ivory hover:bg-slate-moss" 
                  : "bg-pear/90 text-night-green hover:bg-pear border border-pear/50"
              )}
              size="sm"
            >
              REQUEST A CONSULTATION
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
              <Menu className={cn(
                "w-6 h-6 transition-colors duration-300",
                isScrolled ? "text-night-green" : "text-ivory"
              )} />
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
                <button
                  onClick={() => {
                    handleNavClick(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-nav text-night-green hover:text-slate-moss transition-colors uppercase tracking-wider"
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
                        className="block w-full text-sm font-nav text-slate-moss hover:text-night-green transition-colors uppercase tracking-wider"
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
              className="mt-6 font-nav"
            >
              REQUEST A CONSULTATION
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
