import { MetadataRoute } from 'next'
import { programs } from '@/lib/programs-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://recoverly.net'
  
  // Static pages
  const staticPages = [
    '',
    '/programs',
    '/meetings',
    '/quiz',
    '/resources',
    '/resources/first-meeting',
    '/resources/coping',
    '/resources/family',
    '/resources/crisis',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic program pages
  const programPages = programs.map(program => ({
    url: `${baseUrl}/programs/${program.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...programPages]
}