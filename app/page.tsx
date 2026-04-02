import { getClient } from '@/lib/drupal-client'
import { GET_HOMEPAGE_DATA } from '@/lib/queries'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600
export const dynamic = 'force-dynamic'



export async function generateMetadata(): Promise<Metadata> {
  const title = 'Apex Auto Works — Precision Auto Care You Can Trust'
  const description = 'Expert auto repair and maintenance for all makes and models. ASE-certified technicians, cutting-edge diagnostics, and honest service since 1994.'

  return {
    title,
    description,
    keywords: ['Auto Repair', 'Car Maintenance', 'ASE Certified', 'Oil Change', 'Brake Repair', 'Engine Diagnostics', 'Apex Auto Works'],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Home() {
  // Check if the app is properly configured
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  const client = getClient()
  const data = await client.raw(GET_HOMEPAGE_DATA) as any
  const homepageContent = data?.nodeHomepages?.nodes?.[0] || null

  // Check if connected but no content exists - show content import guide
  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  return <HomepageRenderer homepageContent={homepageContent} />
}
