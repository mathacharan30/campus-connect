import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/Authslice';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.authUser.user);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navItems = [
    { name: 'Questions', path: '/questions', roles: ['teacher', 'student'] },
    { name: 'Notes', path: '/viewnotes', roles: ['teacher', 'student'] },
    { name: 'Blogs', path: '/blogs', roles: ['teacher', 'student', 'alumni'] },
    { name: 'Jobs and Hackathons', path: '/jobs', roles: ['teacher', 'student', 'alumni'] },
  ].filter(item => !user || item.roles.includes(user.userRole));

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[72px]',
          'bg-bg-primary/95 backdrop-blur-xl',
          'border-b border-border',
          isScrolled && 'shadow-lg shadow-black/20'
        )}
      >
        <div className="container-custom h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center h-full text-xl font-bold text-text-primary hover:text-brand-400 transition-colors"
            >
              <span>Campus</span>
              <span className="text-brand-400">Connect</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center h-full space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'relative flex items-center h-full px-4 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive(item.path)
                      ? 'text-brand-400'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-brand-500/10 rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center h-full space-x-3">
              {user ? (
                <>
                  <div className="flex items-center h-full">
                    <span className="text-sm text-text-secondary px-3">
                      {user.name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center h-10 px-4 text-sm font-medium text-text-primary bg-surface hover:bg-surface-hover border border-border rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center h-10 px-4 text-sm font-medium text-text-secondary hover:text-brand-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center h-10 px-4 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-10 w-10 text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-[72px] right-0 bottom-0 w-80 max-w-[85vw] bg-surface border-l border-border z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-4">
                {/* User Info */}
                {user && (
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-text-secondary">Signed in as</p>
                    <p className="text-base font-medium text-text-primary mt-1">
                      {user.name || user.email}
                    </p>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-3 text-base font-medium rounded-lg transition-all',
                        isActive(item.path)
                          ? 'text-brand-400 bg-brand-500/10'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Auth Buttons */}
                <div className="pt-4 border-t border-border space-y-2">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-base font-medium text-text-primary bg-surface hover:bg-surface-hover border border-border rounded-lg transition-all"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-4 py-3 text-base font-medium text-center text-text-primary hover:text-brand-400 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-4 py-3 text-base font-medium text-center text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-all"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
