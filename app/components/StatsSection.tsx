'use client'

import { DrupalHomepage } from '@/lib/types'

interface StatsSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

const defaultStats = [
  { value: '30+', label: 'Years of Experience' },
  { value: '15K+', label: 'Vehicles Serviced' },
  { value: '25+', label: 'Certified Technicians' },
  { value: '98%', label: 'Customer Satisfaction' },
]

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const rawStats = (homepageContent as any)?.stats || (homepageContent as any)?.statsItems || []
  const stats = rawStats.length > 0 ? rawStats : defaultStats

  return (
    <section className="relative py-20 bg-white -mt-16 md:-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: any, i: number) => (
            <div key={stat.id || i} className="text-center relative">
              <div className="inline-block">
                <div className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
                  {stat.number || stat.value || stat.statValue}
                </div>
              </div>
              <div className="text-gray-600 mt-2 font-medium uppercase tracking-wide text-sm">
                {stat.label || stat.statLabel || stat.title}
              </div>
              {/* Angled separator between stats */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-primary-200 to-transparent" style={{ transform: 'translateY(-50%) rotate(15deg)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
