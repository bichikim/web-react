import {Solid} from './componets/Solid'
import {Original} from './componets/Original'
import {PropsSyncText} from './componets/PropsSyncText'
import {Events} from './componets/Events'
import {DeepMemo} from './componets/DeepMemo'
import {Zustand} from './componets/Zustand'
import {HookState} from './componets/HookState'

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
      <section>
        <Events />
      </section>
      <section>
        <DeepMemo />
      </section>
      <section>
        <Zustand />
      </section>
      <section>
        <HookState />
      </section>
    </div>
  )
})
