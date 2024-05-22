import { Page } from '../../payload/payload-types'
import { Gutter } from '../_components/Gutter'
import RichText from '../_components/RichText'
import classes from './index.module.scss'

const Home = ({hero}: {hero: Page['hero']}) => {
  return (
    <div className={classes.container}>
      <Gutter className={classes.gutter}>
        <div className={classes.titling}>
          <h1 className={classes.titling__title}>
            IWV<br></br>Lab
          </h1>
          <p className={classes.titling__text}>
            <RichText className={classes.richText} content={hero.richText} />
          </p>
        </div>
      </Gutter>
    </div>
  )
}

export default Home
