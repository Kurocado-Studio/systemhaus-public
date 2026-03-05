import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function handleTailwindClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
