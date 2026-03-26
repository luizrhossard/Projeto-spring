'use client'

import { cn } from '@/lib/utils'

interface CropIconProps {
  className?: string
}

// Soja Icon - Modern soybean plant
export function SojaIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#soja-gradient)" />
      <path
        d="M24 38V24C24 24 20 20 20 16C20 12 22 10 24 10C26 10 28 12 28 16C28 20 24 24 24 24"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="20" cy="16" rx="2" ry="3" fill="white" opacity="0.8" />
      <ellipse cx="28" cy="16" rx="2" ry="3" fill="white" opacity="0.8" />
      <ellipse cx="22" cy="22" rx="1.5" ry="2.5" fill="white" opacity="0.6" />
      <ellipse cx="26" cy="22" rx="1.5" ry="2.5" fill="white" opacity="0.6" />
      <path
        d="M16 26C16 26 18 24 24 24C30 24 32 26 32 26"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="soja-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Milho Icon - Modern corn/maize
export function MilhoIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#milho-gradient)" />
      <path
        d="M24 36V12"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="24" cy="18" rx="6" ry="8" fill="#fbbf24" stroke="white" strokeWidth="1.5" />
      <ellipse cx="20" cy="16" rx="1.5" ry="2" fill="white" opacity="0.4" />
      <ellipse cx="24" cy="14" rx="1.5" ry="2" fill="white" opacity="0.4" />
      <ellipse cx="28" cy="16" rx="1.5" ry="2" fill="white" opacity="0.4" />
      <ellipse cx="20" cy="20" rx="1.5" ry="2" fill="white" opacity="0.4" />
      <ellipse cx="28" cy="20" rx="1.5" ry="2" fill="white" opacity="0.4" />
      <path
        d="M18 10C18 10 20 14 24 14C28 14 30 10 30 10"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 12C16 12 18 16 22 16"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 12C32 12 30 16 26 16"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="milho-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Café Icon - Modern coffee bean/cherry
export function CafeIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#cafe-gradient)" />
      <ellipse cx="20" cy="26" rx="7" ry="9" fill="#8b5a2b" stroke="white" strokeWidth="1.5" />
      <ellipse cx="28" cy="26" rx="7" ry="9" fill="#8b5a2b" stroke="white" strokeWidth="1.5" />
      <path
        d="M20 18C20 18 22 20 22 26"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M28 18C28 18 26 20 26 26"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M24 10C24 10 20 14 20 18C20 22 24 24 24 24C24 24 28 22 28 18C28 14 24 10 24 10Z"
        fill="#ef4444"
        stroke="white"
        strokeWidth="1"
      />
      <circle cx="24" cy="14" r="2" fill="white" opacity="0.3" />
      <defs>
        <linearGradient id="cafe-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a16207" />
          <stop offset="1" stopColor="#713f12" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Feijão Icon - Modern beans
export function FeijaoIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#feijao-gradient)" />
      <ellipse cx="18" cy="20" rx="5" ry="7" fill="white" stroke="white" strokeWidth="1" transform="rotate(-20 18 20)" />
      <ellipse cx="24" cy="28" rx="5" ry="7" fill="white" stroke="white" strokeWidth="1" transform="rotate(10 24 28)" />
      <ellipse cx="32" cy="22" rx="5" ry="7" fill="white" stroke="white" strokeWidth="1" transform="rotate(30 32 22)" />
      <path
        d="M15 16C15 16 16 20 18 20"
        stroke="#a16207"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M21 24C21 24 22 28 24 28"
        stroke="#a16207"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M29 18C29 18 30 22 32 22"
        stroke="#a16207"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <defs>
        <linearGradient id="feijao-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b45309" />
          <stop offset="1" stopColor="#92400e" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Algodão Icon - Modern cotton
export function AlgodaoIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#algodao-gradient)" />
      <circle cx="24" cy="24" r="10" fill="white" opacity="0.95" />
      <circle cx="20" cy="20" r="5" fill="white" />
      <circle cx="28" cy="20" r="5" fill="white" />
      <circle cx="20" cy="28" r="5" fill="white" />
      <circle cx="28" cy="28" r="5" fill="white" />
      <circle cx="24" cy="24" r="4" fill="white" />
      <path
        d="M16 12C16 12 18 8 24 8C30 8 32 12 32 12"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 14L16 10"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M30 14L32 10"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="1" fill="#e5e7eb" opacity="0.5" />
      <circle cx="28" cy="20" r="1" fill="#e5e7eb" opacity="0.5" />
      <circle cx="20" cy="28" r="1" fill="#e5e7eb" opacity="0.5" />
      <circle cx="28" cy="28" r="1" fill="#e5e7eb" opacity="0.5" />
      <defs>
        <linearGradient id="algodao-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#84cc16" />
          <stop offset="1" stopColor="#65a30d" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Cana-de-Açúcar Icon - Modern sugarcane
export function CanaIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#cana-gradient)" />
      <rect x="20" y="10" width="8" height="28" rx="4" fill="white" opacity="0.9" />
      <line x1="20" y1="14" x2="28" y2="14" stroke="#a3e635" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="18" x2="28" y2="18" stroke="#a3e635" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="22" x2="28" y2="22" stroke="#a3e635" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="26" x2="28" y2="26" stroke="#a3e635" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="30" x2="28" y2="30" stroke="#a3e635" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="34" x2="28" y2="34" stroke="#a3e635" strokeWidth="1.5" opacity="0.6" />
      <path
        d="M28 16C32 16 36 20 36 24"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 20C16 20 12 24 12 28"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 28C32 28 34 30 34 34"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="cana-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Arroz Icon - Modern rice plant
export function ArrozIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#arroz-gradient)" />
      <path
        d="M24 38V20"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 20C24 20 16 18 14 12"
        stroke="#d4a574"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 20C24 20 32 18 34 12"
        stroke="#d4a574"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 16C24 16 20 14 18 10"
        stroke="#c9a86c"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 16C24 16 28 14 30 10"
        stroke="#c9a86c"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="12" r="2" fill="#fef3c7" />
      <circle cx="18" cy="10" r="2" fill="#fef3c7" />
      <circle cx="34" cy="12" r="2" fill="#fef3c7" />
      <circle cx="30" cy="10" r="2" fill="#fef3c7" />
      <circle cx="24" cy="14" r="2" fill="#fef3c7" />
      <defs>
        <linearGradient id="arroz-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#84cc16" />
          <stop offset="1" stopColor="#4d7c0f" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Trigo Icon - Modern wheat
export function TrigoIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#trigo-gradient)" />
      <path
        d="M24 38V16"
        stroke="#d4a574"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="24" cy="12" rx="3" ry="5" fill="#fbbf24" />
      <ellipse cx="20" cy="14" rx="2.5" ry="4" fill="#fbbf24" transform="rotate(-20 20 14)" />
      <ellipse cx="28" cy="14" rx="2.5" ry="4" fill="#fbbf24" transform="rotate(20 28 14)" />
      <ellipse cx="24" cy="18" rx="2.5" ry="4" fill="#fcd34d" />
      <ellipse cx="20" cy="20" rx="2" ry="3" fill="#fcd34d" transform="rotate(-15 20 20)" />
      <ellipse cx="28" cy="20" rx="2" ry="3" fill="#fcd34d" transform="rotate(15 28 20)" />
      <ellipse cx="24" cy="24" rx="2" ry="3" fill="#fde68a" />
      <path
        d="M24 16L24 12"
        stroke="#d4a574"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="trigo-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Abacaxi Icon
export function AbacaxiIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="24" r="20" fill="url(#abacaxi-gradient)" />
      <path d="M24 36V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 30C20 30 24 26 28 30" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M16 26C16 26 20 22 24 26" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 26C32 26 28 22 24 26" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="24" cy="18" rx="6" ry="4" fill="#fbbf24" opacity="0.8" />
      <path d="M18 16C18 16 20 14 24 14C28 14 30 16 30 16" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="abacaxi-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" /><stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Banana Icon
export function BananaIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="24" r="20" fill="url(#banana-gradient)" />
      <path d="M14 32C14 32 18 20 28 14C32 11 36 12 36 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 30C16 30 20 22 28 16" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M18 28C18 28 22 20 28 16" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <defs>
        <linearGradient id="banana-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" /><stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Laranja Icon
export function LaranjaIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="24" r="18" fill="#f97316" />
      <circle cx="24" cy="24" r="16" fill="url(#laranja-gradient)" />
      <path d="M24 14V24" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 14C24 14 20 16 20 20" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 14C24 14 28 16 28 20" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="22" r="2" fill="#15803d" opacity="0.6" />
      <defs>
        <linearGradient id="laranja-gradient" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fb923c" /><stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Manga Icon
export function MangaIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="24" r="20" fill="url(#manga-gradient)" />
      <path d="M24 36C24 36 18 28 18 20C18 12 22 10 24 10C26 10 30 12 30 20C30 28 24 36 24 36Z" fill="#fbbf24" stroke="white" strokeWidth="1.5" />
      <path d="M24 12L24 26" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 18L24 14L28 18" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="manga-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" /><stop offset="1" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Uva Icon
export function UvaIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="24" r="20" fill="url(#uva-gradient)" />
      <circle cx="20" cy="22" r="5" fill="#7c3aed" stroke="white" strokeWidth="1" />
      <circle cx="28" cy="22" r="5" fill="#8b5cf6" stroke="white" strokeWidth="1" />
      <circle cx="24" cy="28" r="5" fill="#6d28d9" stroke="white" strokeWidth="1" />
      <circle cx="18" cy="28" r="4" fill="#7c3aed" stroke="white" strokeWidth="1" />
      <circle cx="30" cy="28" r="4" fill="#8b5cf6" stroke="white" strokeWidth="1" />
      <path d="M24 14V18" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 14C24 14 20 16 18 14" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 14C24 14 28 16 30 14" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="uva-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" /><stop offset="1" stopColor="#6b21a8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Melancia Icon
export function MelanciaIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="24" r="20" fill="url(#melancia-gradient)" />
      <path d="M12 24C12 24 16 16 24 16C32 16 36 24 36 24C36 24 32 32 24 32C16 32 12 24 12 24Z" fill="#22c55e" stroke="white" strokeWidth="1.5" />
      <path d="M16 24C16 24 20 20 24 24C28 20 32 24 32 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M18 24C18 24 22 22 24 24" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M26 24C26 24 28 22 30 24" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <defs>
        <linearGradient id="melancia-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ef4444" /><stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Tomate Icon
export function TomateIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="26" r="16" fill="url(#tomate-gradient)" />
      <path d="M24 10V18" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 12L24 18L28 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="24" cy="18" rx="4" ry="3" fill="#15803d" />
      <path d="M20 20C20 20 22 18 24 20" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <defs>
        <linearGradient id="tomate-gradient" x1="8" y1="10" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ef4444" /><stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Batata Icon
export function BatataIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="24" r="20" fill="url(#batata-gradient)" />
      <ellipse cx="24" cy="26" rx="14" ry="10" fill="#a16207" />
      <circle cx="18" cy="22" r="1.5" fill="#78350f" opacity="0.5" />
      <circle cx="28" cy="24" r="1.5" fill="#78350f" opacity="0.5" />
      <circle cx="22" cy="28" r="1.5" fill="#78350f" opacity="0.5" />
      <circle cx="30" cy="28" r="1.5" fill="#78350f" opacity="0.5" />
      <defs>
        <linearGradient id="batata-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d97706" /><stop offset="1" stopColor="#92400e" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Generic Crop Icon for fallback
export function GenericCropIcon({ className }: CropIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-8 h-8", className)}>
      <circle cx="24" cy="24" r="20" fill="url(#generic-gradient)" />
      <path d="M24 36V24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 24C24 24 18 20 18 16C18 12 21 10 24 10C27 10 30 12 30 16C30 20 24 24 24 24Z" fill="white" opacity="0.9" />
      <path d="M16 28C16 28 20 24 24 28C28 24 32 28 32 28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <defs>
        <linearGradient id="generic-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" /><stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>
    </svg>
  )
}
