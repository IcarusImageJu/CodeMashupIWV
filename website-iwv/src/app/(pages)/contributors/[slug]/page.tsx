// Force this page to be dynamic so that Next.js does not cache it

import { draftMode } from 'next/headers'
import { fetchDoc } from '../../../_api/fetchDoc'
import type { Contributor } from '../../../../payload/payload-types'
import { notFound } from 'next/navigation'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Contributor({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let contributor: Contributor | null = null

  try {
    contributor = await fetchDoc<Contributor>({
      collection: 'contributors',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  // if (!contributor) {
  //   notFound()
  // }

  return <h1>Contributor</h1>
}
