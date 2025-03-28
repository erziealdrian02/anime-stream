'use client';

import React, { useState, useRef, useEffect } from 'react';

export function DropdownMenu({ children }) {
  return <>{children}</>;
}

export function DropdownMenuTrigger({ children, asChild, ...props }) {
  const child = asChild ? (
    React.Children.only(children)
  ) : (
    <button {...props}>{children}</button>
  );

  return React.cloneElement(child, {
    ...child.props,
    ...props,
    'data-dropdown-trigger': true,
  });
}

export function DropdownMenuContent({
  children,
  align = 'center',
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const contentRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleTriggerClick = (e) => {
      const trigger = e.target.closest('[data-dropdown-trigger]');
      if (trigger) {
        triggerRef.current = trigger;
        setIsOpen((prev) => !prev);

        if (!isOpen) {
          const rect = trigger.getBoundingClientRect();
          let left;

          if (align === 'start') {
            left = rect.left;
          } else if (align === 'end') {
            left = rect.right;
          } else {
            left = rect.left + rect.width / 2;
          }

          setPosition({
            top: rect.bottom + window.scrollY,
            left: left + window.scrollX,
          });
        }
      } else if (!e.target.closest('[data-dropdown-content]') && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleTriggerClick);
    return () => document.removeEventListener('click', handleTriggerClick);
  }, [isOpen, align]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let { top, left } = position;

      // Adjust horizontal position if needed
      if (left + rect.width > viewportWidth) {
        left = viewportWidth - rect.width - 10;
      }

      if (left < 10) {
        left = 10;
      }

      // Adjust vertical position if needed
      if (top + rect.height > viewportHeight + window.scrollY) {
        // Position above the trigger
        if (triggerRef.current) {
          const triggerRect = triggerRef.current.getBoundingClientRect();
          top = triggerRect.top + window.scrollY - rect.height;
        } else {
          top = viewportHeight + window.scrollY - rect.height - 10;
        }
      }

      setPosition({ top, left });
    }
  }, [isOpen, position]);

  if (!isOpen) return null;

  const contentStyle = {
    position: 'absolute',
    top: `${position.top}px`,
    left: `${position.left}px`,
    transform:
      align === 'center'
        ? 'translateX(-50%)'
        : align === 'end'
        ? 'translateX(-100%)'
        : 'none',
  };

  return (
    <div
      ref={contentRef}
      style={contentStyle}
      className={`z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-700 bg-gray-900 p-1 shadow-md ${className}`}
      data-dropdown-content
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  asChild,
  className = '',
  ...props
}) {
  const child = asChild ? (
    React.Children.only(children)
  ) : (
    <button
      className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return React.cloneElement(child, {
    ...child.props,
    className: `${
      child.props.className || ''
    } ${className} relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-800`,
    ...props,
  });
}
