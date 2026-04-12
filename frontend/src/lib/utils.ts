import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | null | undefined, fallback = 'Não prevista'): string {
  if (!date) return fallback
  const d = new Date(date)
  return isNaN(d.getTime()) ? fallback : d.toLocaleDateString('pt-BR')
}
