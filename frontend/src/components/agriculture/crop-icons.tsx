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

// Generic Crop Icon for fallback
export function GenericCropIcon({ className }: CropIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <circle cx="24" cy="24" r="20" fill="url(#generic-gradient)" />
      <path
        d="M24 36V24"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 24C24 24 18 20 18 16C18 12 21 10 24 10C27 10 30 12 30 16C30 20 24 24 24 24Z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M16 28C16 28 20 24 24 28C28 24 32 28 32 28"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="generic-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>
    </svg>
  )
}
