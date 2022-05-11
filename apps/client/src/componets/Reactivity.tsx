import {ref} from '@vue/reactivity'
import {useSetup, withReactivity} from 'src/hooks/reactivity'
import {v4 as uuid} from 'uuid'
import {styled} from '@stitches/react'

export interface TodoItem {
  done?: boolean
  id: string
  message?: string
  title?: string
}

export interface TodoItemProps extends TodoItem {
  name?: string
  onRemoveItem?: (id: string) => any
  onToggleDone?: (id: string, value?: boolean) => any
}

export const TodoItemContainer =
  styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  })

export const TodoItemActionContainer =
  styled('div', {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  })

export const TodoItem = withReactivity<TodoItemProps>((props) => {

  const state = useSetup((props) => {

    const onRemoveItem = () => {
      props.onRemoveItem?.(props.id)
    }

    return {
      onRemoveItem,
    }
  }, props)

  // check how many times rendered
  console.log('rendered', props.id)

  return (
    <TodoItemContainer>
      <div>
        <span>
          author {props.name}
        </span>
      </div>
      <div>
        <span>{props.title}</span>
        <span>{props.message}</span>
      </div>
      <TodoItemActionContainer>
        <button onClick={() => props.onToggleDone?.(props.id)}>{props.done ? 'done' : 'not yet'}</button>
        <button onClick={state.onRemoveItem}>remove</button>
      </TodoItemActionContainer>
    </TodoItemContainer>
  )
})

export interface AddTodoItemProps {
  onAddItem?: (payload: Omit<TodoItem, 'id'>) => any
}

export const AddTodoItemContainer =
  styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  })

export const AddTodoItem: FC<AddTodoItemProps> = (props) => {
  const state = useSetup((props) => {
    const title = ref('')
    const message = ref('')

    const onInputFactory = (target: string) => (event: any) => {
      const {value} = event.target ?? {}
      if (typeof value === 'undefined') {
        return
      }
      switch (target) {
        case 'title':
          title.value = value
          return
        case 'message':
          message.value = value
      }
    }

    const onAddItem = () => {
      props.onAddItem?.({
        done: false,
        message: message.value,
        title: title.value,
      })
    }

    return {
      message,
      onAddItem,
      onInputFactory,
      title,
    }
  }, props)

  return (
    <AddTodoItemContainer>
      <label htmlFor="title">
        <span>Title</span>
        <input id="title" onChange={state.onInputFactory('title')}></input>
      </label>
      <label htmlFor="message">
        <span>Message</span>
        <input id="message" onChange={state.onInputFactory('message')}></input>
      </label>
      <button onClick={state.onAddItem}>add</button>
    </AddTodoItemContainer>
  )
}

export interface TodoListProps {
  name?: string
}

export const TodoList: FC<TodoListProps> = (props) => {
  const state = useSetup(() => {
    const list = ref<TodoItem[]>([])

    const addItem = (payload: Omit<TodoItem, 'id'>) => {
      list.value.push({...payload, id: uuid()})
    }

    const fineIndexItem = (id: string) => {
      return list.value.findIndex((item) => item.id === id)
    }

    const modifyIndexItem = (index: number, payload?: Partial<Omit<TodoItem, 'id'>>) => {
      if (index >= 0) {
        if (payload) {
          list.value.splice(index, 1, {...list.value[index], ...payload})
        } else {
          list.value.splice(index, 1)
        }
      }
    }

    const modifyItem = (id: string, payload?: Partial<Omit<TodoItem, 'id'>>) => {
      const index = fineIndexItem(id)
      modifyIndexItem(index, payload)
    }

    const removeItem = (id: string) => {
      const index = fineIndexItem(id)
      if (index !== -1) {
        list.value.splice(index, 1)
      }
    }

    const toggleDone = (id: string, value?: boolean) => {
      if (typeof value === 'undefined') {
        const index = fineIndexItem(id)
        const item = list.value[index]
        if (item) {
          modifyIndexItem(index, {done: !item.done})
        }
        return
      }
      modifyItem(id, {done: value})
    }

    return {
      addItem,
      list,
      modifyItem,
      removeItem,
      toggleDone,
    }
  })

  return (
    <>
      {state.list.map((item) => {
        return (
          <TodoItem
            onToggleDone={state.toggleDone}
            onRemoveItem={state.removeItem}
            name={props.name}
            {...item}
            key={item.id}
          />
        )
      })}
      <div>
        <AddTodoItem onAddItem={state.addItem} />
      </div>
    </>
  )
}

export interface ReactivityProps {
  name?: string
}

export const Reactivity: FC<ReactivityProps> = () => {
  return (
    <>
      <TodoList name="foo" />
    </>
  )
}

