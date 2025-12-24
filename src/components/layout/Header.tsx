import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoBrandmark from "@/assets/district-brandmark.png";
import logoBrandmarkNightGreen from "@/assets/district-brandmark-night-green.png";
import logoBrandmarkPear from "@/assets/district-brandmark-pear.png";
import logoLockup from "@/assets/district-logo-lockup.png";
import logoLockupNightGreen from "@/assets/district-logo-lockup-night-green.png";

// Pages that have dark hero sections where transparent header works well
const HERO_PAGES = ["/", "/flowers", "/hospitality", "/projects", "/tree-solutions"];

const navItems = [
  { label: "DISTRICT", href: "/" },
  { label: "FLOWERS", href: "/flowers" },
  {
    label: "Greenery",
    href: "/services",
    children: [
      { label: "PLANTSCAPING", href: "/services/plantscaping" },
      { label: "TREE SOLUTIONS", href: "/tree-solutions" },
      { label: "PLANT MAINTENANCE", href: "/services/maintenance" },
      { label: "CUSTOM PLANTERS", href: "/services/planters" },
      { label: "GREEN WALLS", href: "/services/green-walls" },
    ],
  },
  { label: "STYLING", href: "/styling" },
  { label: "HOSPITALITY", href: "/hospitality" },
  { label: "COLLECTION", href: "/collection" },
  { label: "PROJECTS", href: "/projects" },
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleConsultation = () => {
    setIsMobileMenuOpen(false);
    navigate("/contact");
  };

  const handleDropdownItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(null);
    navigate(href);
  };

  const handleNavClick = (item: (typeof navItems)[0]) => {
    navigate(item.href);
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ease-out",
          isScrolled || !hasHeroSection
            ? "py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-b border-ivory/20"
            : "py-5 bg-transparent",
        )}
        style={{
          background:
            isScrolled || !hasHeroSection
              ? "linear-gradient(135deg, hsla(60, 3%, 78%, 0.75) 0%, hsla(60, 30%, 98%, 0.6) 50%, hsla(155, 22%, 16%, 0.2) 100%)"
              : "transparent",
        }}
      >
        <div className="container-luxury px-6 md:px-12 lg:px-20">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-[60] flex flex-col items-center group shrink-0 mr-6 xl:mr-10">
              {/* Transparent header: show pear brandmark */}
              <img
                src={logoBrandmarkPear}
                alt="District Interiors"
                className={cn(
                  "h-12 md:h-14 lg:h-16 w-auto transition-all duration-500",
                  shouldUseTransparentHeader && !isScrolled ? "opacity-100" : "opacity-0 h-0 absolute",
                )}
              />
              {/* Scrolled/sticky header: show night-green brandmark */}
              <img
                src={logoBrandmarkNightGreen}
                alt="District"
                className={cn(
                  "h-10 md:h-11 lg:h-12 w-auto transition-all duration-500",
                  !shouldUseTransparentHeader || isScrolled ? "opacity-100" : "opacity-0 h-0 absolute",
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
                        "flex items-center gap-1.5 font-nav font-bold uppercase tracking-[0.12em] transition-all duration-300 relative",
                        "text-[14px] xl:text-[15px] 2xl:text-[16px]",
                        "before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[1.5px] before:origin-right before:scale-x-0 before:transition-transform before:duration-300",
                        shouldUseTransparentHeader
                          ? "text-ivory hover:text-pear before:bg-pear"
                          : "text-night-green hover:text-slate-moss before:bg-night-green",
                        activeDropdown === item.label && (shouldUseTransparentHeader ? "text-pear" : "text-slate-moss"),
                        "hover:before:scale-x-100 hover:before:origin-left",
                      )}
                      style={shouldUseTransparentHeader ? { textShadow: "0 2px 8px rgba(0,0,0,0.4)" } : undefined}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 xl:w-[18px] xl:h-[18px] transition-transform duration-300",
                          activeDropdown === item.label && "rotate-180",
                        )}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        "flex items-center gap-1 font-nav font-bold uppercase tracking-[0.12em] transition-all duration-300 relative whitespace-nowrap",
                        "text-[14px] xl:text-[15px] 2xl:text-[16px]",
                        "before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[1.5px] before:origin-right before:scale-x-0 before:transition-transform before:duration-300",
                        shouldUseTransparentHeader
                          ? "text-ivory hover:text-pear before:bg-pear"
                          : "text-night-green hover:text-slate-moss before:bg-night-green",
                        "hover:before:scale-x-100 hover:before:origin-left",
                      )}
                      style={shouldUseTransparentHeader ? { textShadow: "0 2px 8px rgba(0,0,0,0.4)" } : undefined}
                    >
                      {item.label}
                    </button>
                  )}

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 animate-fade-in z-[1500]">
                      {/* Elegant gradient connector */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-pear/60 to-transparent" />
                      <div
                        className="relative rounded-sm overflow-hidden min-w-[240px]"
                        style={{
                          background: "linear-gradient(180deg, hsl(155 22% 16%) 0%, hsl(155 22% 20%) 100%)",
                          boxShadow:
                            "0 25px 60px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
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
                    : "bg-night-green text-ivory hover:bg-slate-moss",
                )}
                size="sm"
              >
                REQUEST A CONSULTATION
              </Button>
            </div>

            {/* Mobile Menu Button - Only show when menu is closed */}
            {!isMobileMenuOpen && (
              <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                <Menu
                  className={cn(
                    "w-6 h-6 transition-colors duration-300",
                    shouldUseTransparentHeader ? "text-ivory" : "text-night-green",
                  )}
                />
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
            {/* Rich gradient background */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, hsl(155 22% 18%) 0%, hsl(155 20% 22%) 35%, hsl(155 18% 28%) 65%, hsl(155 15% 32%) 100%)",
              }}
            />

            {/* Decorative gradient orbs */}
            <div
              className="absolute top-[-10%] right-[-10%] w-[60%] h-[50%] opacity-30 blur-3xl"
              style={{
                background: "radial-gradient(ellipse at center, hsl(72 68% 72% / 0.4) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-[-5%] left-[-10%] w-[50%] h-[40%] opacity-20 blur-3xl"
              style={{
                background: "radial-gradient(ellipse at center, hsl(72 68% 72% / 0.3) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-[40%] left-[20%] w-[30%] h-[30%] opacity-10 blur-2xl"
              style={{
                background: "radial-gradient(ellipse at center, hsl(60 30% 97% / 0.2) 0%, transparent 70%)",
              }}
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
                <div className="absolute inset-0 rounded-full bg-pear/10 scale-0 group-hover:scale-[2] transition-transform duration-500" />
                <X className="w-7 h-7 text-ivory/90 relative z-10 transition-all duration-300 group-hover:rotate-90 group-hover:text-pear" />
              </div>
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="absolute top-8 left-8"
            >
              <img src={logoLockup} alt="District Interiors" className="h-14 w-auto" />
            </motion.div>

            {/* Menu Content - Centered */}
            <div className="relative flex flex-col items-center justify-center min-h-full px-8 py-28">
              <nav className="w-full max-w-sm">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* Gradient separator - before first item */}
                    {index === 0 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="h-[1px] mb-4 origin-center"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, hsl(72 68% 72% / 0.4) 50%, transparent 100%)",
                        }}
                      />
                    )}

                    <button
                      onClick={() => {
                        handleNavClick(item);
                        setIsMobileMenuOpen(false);
                      }}
                      className="group relative flex items-center justify-center w-full py-4 text-center overflow-hidden rounded-lg transition-all duration-300"
                    >
                      {/* Hover background effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-pear/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <span className="absolute inset-0 bg-gradient-to-b from-ivory/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                      {/* Side accent bars on hover */}
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-gradient-to-r from-pear to-transparent group-hover:w-8 transition-all duration-500" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-gradient-to-l from-pear to-transparent group-hover:w-8 transition-all duration-500" />

                      <span className="relative text-2xl sm:text-3xl font-heading text-ivory/90 tracking-wide uppercase transition-all duration-300 group-hover:text-pear group-hover:tracking-widest">
                        {item.label}
                      </span>
                    </button>

                    {/* Submenu items */}
                    {item.children && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                        className="space-y-1 pb-3"
                      >
                        {item.children.map((child, childIndex) => (
                          <motion.button
                            key={child.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.35 + index * 0.08 + childIndex * 0.05,
                            }}
                            onClick={() => {
                              navigate(child.href);
                              setIsMobileMenuOpen(false);
                            }}
                            className="group/sub relative flex items-center justify-center w-full py-2 text-center overflow-hidden rounded transition-all duration-300"
                          >
                            {/* Subtle hover bg for submenu */}
                            <span className="absolute inset-0 bg-ivory/5 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 rounded" />

                            <span className="relative text-sm sm:text-base font-nav text-ivory/60 uppercase tracking-[0.15em] transition-all duration-300 group-hover/sub:text-pear group-hover/sub:tracking-[0.25em]">
                              {child.label}
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Gradient separator - after each item */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
                      className="h-[1px] mt-1 origin-center"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, hsl(72 68% 72% / 0.25) 50%, transparent 100%)",
                      }}
                    />
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleConsultation}
                  className="relative overflow-hidden group font-heading text-sm tracking-widest uppercase bg-pear text-night-green hover:bg-pear border-0 px-8 py-6 shadow-[0_0_40px_rgba(206,219,115,0.3)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-ivory/30 via-ivory/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-3 font-bold">
                    REQUEST A CONSULTATION
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>

              {/* Decorative footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <div
                  className="h-[1px] w-24 mx-auto mb-4"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, hsl(72 68% 72% / 0.3) 50%, transparent 100%)",
                  }}
                />
                <p className="text-[11px] font-nav uppercase tracking-[0.3em] text-ivory/40">Crafting Green Spaces</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
