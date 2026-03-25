'use client'

import { useState } from 'react'
import {
  Sidebar,
  DashboardHeader,
  DashboardOverview,
  CropManagement,
  MarketPrices,
  TasksPanel,
  WeatherWidget,
  AnalyticsPanel
} from '@/components/agriculture'

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <DashboardOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CropManagement compact />
              </div>
              <div className="space-y-6">
                <WeatherWidget />
                <TasksPanel compact />
              </div>
            </div>
            <AnalyticsPanel />
          </div>
        )
      case 'crops':
        return <CropManagement />
      case 'market':
        return <MarketPrices />
      case 'tasks':
        return <TasksPanel />
      case 'analytics':
        return <AnalyticsPanel />
      default:
        return (
          <div className="space-y-6">
            <DashboardOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CropManagement compact />
              </div>
              <div className="space-y-6">
                <WeatherWidget />
                <TasksPanel compact />
              </div>
            </div>
            <AnalyticsPanel />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="lg:pl-72 transition-all duration-300">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
