import {ref} from '@vue/reactivity'
import {useSetup, withReactivity} from 'src/hooks/reactivity'
import {v4 as uuid} from 'uuid'

export interface TodoItemType {
  done?: boolean
  id: string
  message?: string
  title?: string
}

export interface TodoItemProps extends TodoItemType {
  name?: string
  onToggleDone?: (id: string, value?: boolean) => any
}

export const TodoItem = withReactivity<TodoItemProps>((props) => {
  console.log('rendered', props.id)
  return (
    <div>
      <div>
        <span>author {props.name}</span>
      </div>
      <div>
        <span>{props.title}</span>
        <span>{props.message}</span>
      </div>
      <button onClick={() => props.onToggleDone?.(props.id)}>
        {props.done ? 'done' : 'not yet'}
      </button>
    </div>
  )
})

export interface AddTodoItemProps {
  onAddItem?: (payload: Omit<TodoItemType, 'id'>) => any
}

export const AddTodoItem: FC<AddTodoItemProps> = (props) => {
  const state = useSetup((props) => {
    const title = ref('')
    const message = ref('')

    const createOnInput = (target: string) => (event: any) => {
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
      createOnInput,
      message,
      onAddItem,
      title,
    }
  }, props)

  return (
    <>
      <input onChange={state.createOnInput('title')}></input>
      <input onChange={state.createOnInput('message')}></input>
      <button onClick={state.onAddItem}>add</button>
    </>
  )
}

export interface TodoListProps {
  name?: string
}

export const TodoList: FC<TodoListProps> = (props) => {
  const state = useSetup(() => {
    const list = ref<TodoItemType[]>([])

    const addItem = (payload: Omit<TodoItemType, 'id'>) => {
      list.value.push({...payload, id: uuid()})
    }

    const fineIndexItem = (id: string) => {
      return list.value.findIndex((item) => item.id === id)
    }

    const modifyIndexItem = (index: number, payload?: Partial<Omit<TodoItemType, 'id'>>) => {
      if (index >= 0) {
        if (payload) {
          list.value.splice(index, 1, {...list.value[index], ...payload})
        } else {
          list.value.splice(index, 1)
        }
      }
    }

    const modifyItem = (id: string, payload?: Partial<Omit<TodoItemType, 'id'>>) => {
      const index = fineIndexItem(id)
      modifyIndexItem(index, payload)
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
      toggleDone,
    }
  })
  return (
    <>
      {state.list.map((item) => {
        return (
          <TodoItem
            onToggleDone={state.toggleDone}
            name={props.name}
            {...item}
            key={item.id}
          ></TodoItem>
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
      <div>to do example</div>
      <TodoList name="foo" />
    </>
  )
}
