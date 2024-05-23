import React from 'react'

import { Page } from '../../payload/payload-types'
import CanvasCrossed from '../_components/CanvasCrossed'
import { Gutter } from '../_components/Gutter'
import RichText from '../_components/RichText'

import classes from './index.module.scss'

const Home = ({ hero }: { hero: Page['hero'] }) => {
  return (
    <div className={classes.container}>
      <CanvasCrossed className={classes.canvas} />
      <Gutter className={classes.gutter}>
        <div className={classes.titling}>
          <h1 className={classes.titling__title}>
            IWV
            <br />
            Lab
          </h1>
          <RichText className={classes.titling__text} content={hero.richText} />
        </div>
      </Gutter>
    </div>
  )
}

export default Home
