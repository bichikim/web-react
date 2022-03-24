import {Solid} from './componets/Solid'
import {Original} from './componets/Original'
import {PropsSyncText} from './componets/PropsSyncText'

export const App: FC = withSolid(() => {

  return () => (
    <div>
      <section>
        solid
        <Solid />
      </section>
      <br />
      <section>
        original
        <Original />
      </section>
      <br />
      <section>
        <PropsSyncText />
      </section>
    </div>
  )
})
