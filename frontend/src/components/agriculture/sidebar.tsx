'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import {
  LayoutDashboard,
  Sprout,
  TrendingUp,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  X,
  Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

interface CropData {
  id: number
  name: string
  area: string
  status: string
  progress: number
}

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  culturas?: CropData[]
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'crops', label: 'Culturas', icon: Sprout },
  { id: 'insumos', label: 'Insumos', icon: Package },
  { id: 'market', label: 'Mercado', icon: TrendingUp },
  { id: 'tasks', label: 'Tarefas', icon: ClipboardList },
  { id: 'analytics', label: 'Analises', icon: BarChart3 },
]

export function Sidebar({ activeSection, setActiveSection, isOpen, setIsOpen, culturas = [] }: SidebarProps) {
  const { logout } = useAuth()

  const culturasAtivas = culturas.length
  const areaTotal = culturas.reduce((acc, c) => {
    const area = parseFloat(c.area.replace(' ha', '')) || 0
    return acc + area
  }, 0)

  const calcularColheitaEstimada = () => {
    if (culturas.length === 0) return '-'

    const colheitaCount = culturas.filter(c => c.status === 'HARVEST').length
    if (colheitaCount > 0) {
      return `${colheitaCount} pronta(s)`
    }
    return '-'
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/35 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-72 transition-transform duration-300 ease-in-out border-r border-[#dce8df] bg-[#f7faf8]',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        initial={false}
      >
        <div className="flex h-full flex-col">
          <div className="relative px-4 py-4 border-b border-[#e1ece4]">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={44}
                className="brand-logo-green h-auto w-auto max-h-11"
                priority
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 lg:hidden text-slate-600 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Menu principal</p>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="mt-6 rounded-xl border border-[#deebe2] bg-white p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resumo</h3>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Culturas</span>
                  <span className="font-semibold text-slate-800">{culturasAtivas}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Area total</span>
                  <span className="font-semibold text-slate-800">{areaTotal > 0 ? `${areaTotal} ha` : '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Colheita est.</span>
                  <span className="font-semibold text-slate-800">{calcularColheitaEstimada()}</span>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="border-t border-[#e1ece4] p-3">
            <button className="mb-1 w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-slate-900 transition-colors">
              <Settings className="h-4 w-4" />
              <span className="font-medium">Configuracoes</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

