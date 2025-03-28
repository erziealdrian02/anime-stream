const badgeVariants = {
  default: 'bg-primary text-primary-foreground',
  outline: 'border border-gray-700 text-foreground',
};

export function Badge({
  children,
  className = '',
  variant = 'default',
  ...props
}) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${badgeVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
