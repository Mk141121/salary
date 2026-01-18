// Utility: Class Name Merger
// Combines class names and handles conditional classes
// Similar to clsx + tailwind-merge

type ClassValue = string | number | boolean | null | undefined | ClassValue[]

/**
 * Combines multiple class names into a single string
 * Filters out falsy values and flattens arrays
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === 'string') {
      classes.push(input)
    } else if (typeof input === 'number') {
      classes.push(String(input))
    } else if (Array.isArray(input)) {
      const nested = cn(...input)
      if (nested) classes.push(nested)
    }
  }

  // Join and clean up whitespace
  return classes
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Conditionally apply class names based on a condition
 */
export function cond(condition: boolean, trueClass: string, falseClass?: string): string {
  return condition ? trueClass : (falseClass || '')
}

/**
 * Create variants for a component
 * Usage: const buttonVariants = variants({ primary: 'bg-blue-500', secondary: 'bg-gray-500' })
 */
export function variants<T extends Record<string, string>>(config: T) {
  return (variant: keyof T): string => config[variant] || ''
}

export default cn
