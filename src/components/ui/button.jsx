const buttonVariants = {
  default: 'bg-primary text-white hover:bg-primary/90',
  outline: 'border border-gray-700 bg-transparent hover:bg-gray-800',
  ghost: 'bg-transparent hover:bg-gray-800',
};

const buttonSizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 px-3',
  lg: 'h-11 px-8',
  icon: 'h-10 w-10',
};

export function Button({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
