import React from 'react';

export default function AuthLayout({ children, title = 'CampusConnect', subtitle = 'Learn, share and grow with your campus community.' }) {
  return (
    <div className="min-h-[calc(100vh-72px)] grid md:grid-cols-2 gap-0">
      {/* Left: Brand & copy */}
      <div className="hidden md:flex flex-col justify-center px-10 lg:px-14 border-r border-border bg-bg-secondary/40">
        <div className="max-w-md" data-animate="fade-up">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="mt-3 text-text-secondary leading-relaxed">
            {subtitle}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-text-secondary/90">
            <li>• Ask questions and get peer help</li>
            <li>• Share materials and interview prep</li>
            <li>• Post jobs and hackathons</li>
          </ul>
        </div>
      </div>

      {/* Right: Auth form slot */}
      <div className="flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md" data-animate="fade-up">
          {children}
        </div>
      </div>
    </div>
  );
}

