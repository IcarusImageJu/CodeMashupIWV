// Force this page to be dynamic so that Next.js does not cache it

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { Contributor } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import CanvasCrossed from '../../../_components/CanvasCrossed'

import classes from './index.module.scss'

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

  return (
    <main>
      <div className={classes.hero}>
        <div className={classes.hero__image}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Julien Bonté" src={process.env.NEXT_PUBLIC_SERVER_URL + '/jbo.jpg'} />
        </div>
        <div className={classes.hero__title}>
          <CanvasCrossed className={classes.canvas} />
          <h1>
            Julien Bonté
            <span className={classes.hero__ui} />
          </h1>

          <p>
            Team Leader & Full stack developer chez{' '}
            <a target="_BLANK" href="https://ecov.fr">
              ecov
            </a>
            .
          </p>
          <ul className={[classes.socials, classes.hero__socials].join(' ')}>
            <li className={classes.socials__item}>
              <a href="https://www.linkedin.com/in/julien-bont%C3%A9-8272b0a8/" target="_BLANK">
                Linkedin
              </a>
            </li>
            <li>
              <a href="https://github.com/IcarusImageJu" target="_BLANK">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
