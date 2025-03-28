'use client';

import React, { useState, useEffect, useRef } from 'react';

export function Sheet({ children }) {
  return <>{children}</>;
}

export function SheetTrigger({ children, asChild, ...props }) {
  const child = asChild ? (
    React.Children.only(children)
  ) : (
    <button {...props}>{children}</button>
  );

  return React.cloneElement(child, {
    ...child.props,
    ...props,
    'data-sheet-trigger': true,
  });
}

export function SheetContent({
  children,
  side = 'right',
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleTriggerClick = (e) => {
      if (e.target.closest('[data-sheet-trigger]')) {
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleTriggerClick);
    return () => document.removeEventListener('click', handleTriggerClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={`fixed ${
          side === 'left' ? 'left-0' : 'right-0'
        } top-0 h-full w-3/4 max-w-xs p-6 shadow-lg transition ease-in-out duration-300 ${className}`}
        {...props}
      >
        <div className="flex h-full flex-col">
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">Close</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
