export interface SwitchChildren {
  no?: ReactNode
  yes?: ReactNode
}

export interface SwitchProps {
  children?: (() => SwitchChildren) | ReactNode | SwitchChildren
  when: any
}

export const Switch: FPC<SwitchProps> = (props) => {
  const {when, children} = props

  if (typeof children !== 'function') {
    if (
      typeof children === 'object' &&
      children !== null &&
      ('yes' in children || 'no' in children)
    ) {
      if (when) {
        return <>{children.yes ?? null}</>
      }
      return <>{children.no ?? null}</>
    }

    if (when) {
      return <>{children}</>
    }
    return null
  }

  const node = children()
  if ('yes' in node || 'no' in node) {
    if (when) {
      return <>{node.yes ?? null}</>
    }
    return <>{node.no ?? null}</>
  }
  if (when) {
    return <>{node}</>
  }
  return null
}
