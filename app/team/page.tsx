import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_TEAM_MEMBERS } from '@/lib/queries'
import { TeamMembersData } from '@/lib/types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TeamMemberCard from '../components/TeamMemberCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Team Members | Apex Auto Works',
  description: 'Meet our certified auto repair technicians.',
}

async function getTeamMembers() {
  try {
    const client = getClient()
    const { data } = await client.raw(GET_TEAM_MEMBERS, { first: 50 })
    return data?.nodeTeamMembers?.nodes || []
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export default async function TeamMembersPage() {
  const items = await getTeamMembers()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <section
        className="relative overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-accent-500/10"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight mb-6">
              Our Team
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              ASE-certified professionals dedicated to keeping your vehicle in top condition.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-display font-semibold text-gray-600 mb-2 uppercase tracking-wide">No Team Members Yet</h2>
              <p className="text-gray-500">
                Team Members will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <TeamMemberCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
