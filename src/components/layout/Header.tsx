import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/district-logo.png';

const navItems = [
  { label: 'DISTRICT', href: '/' },
  { label: 'FLOWERS', href: 'https://flowers.district.com', external: true },
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
    // Check if we're on tree-solutions page with consultation form
    const consultationForm = document.getElementById('consultation-form');
    const contactSection = document.getElementById('contact');
    
    if (consultationForm) {
      consultationForm.scrollIntoView({ behavior: 'smooth' });
    } else if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to contact page
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
    if (item.external) {
      window.open(item.href, '_blank');
    } else {
      navigate(item.href);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-night-green/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-night-green py-4'
      )}
    >
      <div className="container-luxury px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between">
          {/* Logo - using wordmark */}
          <Link to="/" className="relative z-[60]">
            <img
              src={logo}
              alt="District"
              className="h-10 md:h-12 w-auto brightness-0 invert"
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
                  // Parent with dropdown
                  <button
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      'flex items-center gap-1 text-sm font-nav uppercase tracking-wider transition-colors duration-300',
                      activeDropdown === item.label ? 'text-pear' : 'text-ivory hover:text-pear'
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      activeDropdown === item.label && 'rotate-180'
                    )} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(item)}
                    className="flex items-center gap-1 text-sm font-nav uppercase tracking-wider text-ivory hover:text-pear transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in z-[100]">
                    <div className="bg-night-green/95 backdrop-blur-md rounded-sm shadow-xl py-3 min-w-[220px] border border-ivory/10">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={(e) => handleDropdownItemClick(e, child.href)}
                          className="block w-full text-left px-5 py-3 text-sm font-nav text-ivory hover:bg-pear/20 hover:text-pear transition-colors duration-200"
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
              variant="hero"
              size="sm"
              onClick={handleConsultation}
              className="font-nav"
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
              <Menu className="w-6 h-6 text-ivory" />
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
