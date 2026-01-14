import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterOverhaul() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { name: 'Questions & Answers', path: '/questions' },
      { name: 'Lecture Materials', path: '/viewnotes' },
      { name: 'Placement Blogs', path: '/blogs' },
    ],
    Resources: [
      { name: 'Jobs & Hackathons', path: '/jobs' },
      { name: 'Community', path: '/questions' },
    ],
    Support: [
      { name: 'About', path: '/' },
      { name: 'Contact', path: '/' },
    ],
  };

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-block text-2xl font-bold text-text-primary hover:text-brand-400 transition-colors mb-4"
            >
              Campus<span className="text-brand-400">Connect</span>
            </Link>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              Empowering the next generation of developers and leaders through collaboration and shared knowledge.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-secondary hover:text-brand-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-tertiary">
              &copy; {currentYear} CampusConnect. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
