export interface ForProps {
  children?: (item: any, index: number) => ReactNode
  list: any[]
}

export const For: FPC<ForProps> = (props) => {
  const {list, children} = props

  if (typeof children === 'function') {
    return (
      <>
        {
          list.map((item, index) => {
            return children(item, index)
          })
        }
      </>
    )
  }
  return null
}
