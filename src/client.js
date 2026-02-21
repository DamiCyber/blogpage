import { createClient } from '@sanity/client'

export default createClient({
  projectId: 'o03a9pr7',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-02-20',
})