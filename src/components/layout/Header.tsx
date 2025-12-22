import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  { label: 'OUR COLLECTION', href: '/collection' },
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
    navigate('/contact');
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
    <>
      {/* Main Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ease-out',
          isScrolled || !hasHeroSection
            ? 'py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-b border-ivory/20'
            : 'py-5 bg-transparent'
        )}
        style={{
          background: (isScrolled || !hasHeroSection)
            ? 'linear-gradient(135deg, hsla(60, 3%, 78%, 0.75) 0%, hsla(60, 30%, 98%, 0.6) 50%, hsla(155, 22%, 16%, 0.2) 100%)'
            : 'transparent'
        }}
      >
        <div className="container-luxury px-6 md:px-12 lg:px-20">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-[60] flex flex-col items-center group shrink-0 mr-6 xl:mr-10">
              <img
                src={shouldUseTransparentHeader ? logoLockup : logoLockupNightGreen}
                alt="District Interiors"
                className={cn(
                  "h-16 md:h-18 lg:h-20 xl:h-22 w-auto transition-all duration-500",
                  isScrolled ? "opacity-0 h-0 absolute" : "opacity-100"
                )}
              />
              <img
                src={logoBrandmarkNightGreen}
                alt="District"
                className={cn(
                  "h-10 md:h-11 lg:h-12 w-auto transition-all duration-500",
                  isScrolled ? "opacity-100" : "opacity-0 h-0 absolute"
                )}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-9">
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
                        'flex items-center gap-1.5 font-nav font-bold uppercase tracking-[0.12em] transition-all duration-300 relative',
                        'text-[14px] xl:text-[15px] 2xl:text-[16px]',
                        'before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[1.5px] before:origin-right before:scale-x-0 before:transition-transform before:duration-300',
                        shouldUseTransparentHeader
                          ? 'text-ivory hover:text-pear before:bg-pear' 
                          : 'text-night-green hover:text-slate-moss before:bg-night-green',
                        activeDropdown === item.label && (shouldUseTransparentHeader ? 'text-pear' : 'text-slate-moss'),
                        'hover:before:scale-x-100 hover:before:origin-left'
                      )}
                      style={shouldUseTransparentHeader ? { textShadow: '0 2px 8px rgba(0,0,0,0.4)' } : undefined}
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        'w-4 h-4 xl:w-[18px] xl:h-[18px] transition-transform duration-300',
                        activeDropdown === item.label && 'rotate-180'
                      )} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        'flex items-center gap-1 font-nav font-bold uppercase tracking-[0.12em] transition-all duration-300 relative',
                        'text-[14px] xl:text-[15px] 2xl:text-[16px]',
                        'before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[1.5px] before:origin-right before:scale-x-0 before:transition-transform before:duration-300',
                        shouldUseTransparentHeader
                          ? 'text-ivory hover:text-pear before:bg-pear' 
                          : 'text-night-green hover:text-slate-moss before:bg-night-green',
                        'hover:before:scale-x-100 hover:before:origin-left'
                      )}
                      style={shouldUseTransparentHeader ? { textShadow: '0 2px 8px rgba(0,0,0,0.4)' } : undefined}
                    >
                      {item.label}
                    </button>
                  )}

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 animate-fade-in z-[1500]">
                      {/* Dropdown arrow */}
                      <div 
                        className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-night-green"
                      />
                      <div 
                        className="relative rounded-sm overflow-hidden min-w-[240px]"
                        style={{
                          background: 'linear-gradient(180deg, hsl(155 22% 16%) 0%, hsl(155 22% 20%) 100%)',
                          boxShadow: '0 25px 60px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                        }}
                      >
                        {/* Decorative top accent line */}
                        <div className="h-[2px] bg-gradient-to-r from-transparent via-pear to-transparent" />
                        
                        <div className="py-3">
                          {item.children.map((child, index) => (
                            <button
                              key={child.label}
                              onClick={(e) => handleDropdownItemClick(e, child.href)}
                              className="group relative block w-full text-center px-6 py-3.5 text-sm font-nav font-bold uppercase tracking-wider text-ivory/80 hover:text-pear transition-all duration-300"
                              style={{ animationDelay: `${index * 40}ms` }}
                            >
                              {/* Hover background effect */}
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-pear/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              {/* Left accent bar on hover */}
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-pear group-hover:h-6 transition-all duration-300 rounded-r-full" />
                              <span className="relative">{child.label}</span>
                            </button>
                          ))}
                        </div>
                        
                        {/* Decorative bottom accent line */}
                        <div className="h-[2px] bg-gradient-to-r from-transparent via-slate-moss/50 to-transparent" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* CTA Button */}
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

            {/* Mobile Menu Button - Only show when menu is closed */}
            {!isMobileMenuOpen && (
              <button
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  shouldUseTransparentHeader ? "text-ivory" : "text-night-green"
                )} />
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Menu - Elite Off-Canvas Experience */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] lg:hidden overflow-hidden"
          >
            {/* Elegant gradient background */}
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(160deg, hsl(60 30% 97%) 0%, hsl(60 10% 94%) 50%, hsl(155 15% 92%) 100%)'
              }}
            />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[60%] h-[40%] opacity-[0.03]"
              style={{
                background: 'radial-gradient(ellipse at top right, hsl(155 22% 20%) 0%, transparent 70%)'
              }}
            />
            <div className="absolute bottom-0 left-0 w-[50%] h-[30%] opacity-[0.02]"
              style={{
                background: 'radial-gradient(ellipse at bottom left, hsl(72 68% 72%) 0%, transparent 70%)'
              }}
            />

            {/* Subtle vertical line accent */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-8 top-32 bottom-32 w-[1px] origin-top"
              style={{ background: 'linear-gradient(180deg, transparent 0%, hsl(155 22% 20% / 0.15) 20%, hsl(155 22% 20% / 0.15) 80%, transparent 100%)' }}
            />

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute top-8 right-8 p-3 z-[10000] group"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-night-green/5 scale-0 group-hover:scale-150 transition-transform duration-500" />
                <X className="w-7 h-7 text-night-green relative z-10 transition-transform duration-300 group-hover:rotate-90" />
              </div>
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="absolute top-8 left-8"
            >
              <img 
                src={logoBrandmarkNightGreen} 
                alt="District" 
                className="h-12 w-auto"
              />
            </motion.div>

            {/* Menu Content */}
            <div className="relative flex flex-col items-start justify-center min-h-full pl-16 pr-8 py-28">
              <nav className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.2 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        handleNavClick(item);
                        setIsMobileMenuOpen(false);
                      }}
                      className="group flex items-center gap-4 py-3 text-left"
                    >
                      {/* Animated line accent */}
                      <span className="w-0 h-[2px] bg-pear group-hover:w-8 transition-all duration-500 ease-out" />
                      
                      <span className="text-2xl sm:text-3xl font-heading text-night-green tracking-wide uppercase transition-all duration-300 group-hover:text-slate-moss group-hover:translate-x-2">
                        {item.label}
                      </span>
                      
                      <ArrowRight className="w-5 h-5 text-pear opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </button>

                    {/* Submenu items with elegant reveal */}
                    {item.children && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                        className="ml-12 space-y-0.5 pb-2"
                      >
                        {item.children.map((child, childIndex) => (
                          <motion.button
                            key={child.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: 0.35 + index * 0.08 + childIndex * 0.05 
                            }}
                            onClick={() => {
                              navigate(child.href);
                              setIsMobileMenuOpen(false);
                            }}
                            className="group/sub flex items-center gap-3 py-2 text-left w-full"
                          >
                            <span className="w-3 h-[1px] bg-slate-moss/40 group-hover/sub:w-6 group-hover/sub:bg-pear transition-all duration-300" />
                            <span className="text-sm sm:text-base font-nav text-slate-moss uppercase tracking-widest transition-all duration-300 group-hover/sub:text-night-green group-hover/sub:tracking-[0.2em]">
                              {child.label}
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button with elegant entrance */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12"
              >
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleConsultation}
                  className="relative overflow-hidden group font-heading text-sm tracking-widest uppercase bg-night-green text-ivory hover:bg-night-green px-8 py-6"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pear/20 via-pear/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-3">
                    REQUEST A CONSULTATION
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>

              {/* Decorative footer text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute bottom-8 left-16 text-[11px] font-nav uppercase tracking-[0.3em] text-slate-moss/50"
              >
                Crafting Green Spaces
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}