import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useOnce} from '@winter-love/react-hooks'
import Axios, {AxiosInstance} from 'axios'
import {
  createContext,
  createElement,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface QueryContext {
  axios: AxiosInstance
  updateAuthorization: Dispatch<SetStateAction<string>>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
})

export const queryContext = createContext<null | QueryContext>(null)

export interface QueryProviderProps {
  children: ReactNode
}

export const QueryProvider = (props: QueryProviderProps) => {
  // todo token is from somewhere (env)
  const [token, setToken] = useState('c5b65eb42d62119a052daaa1389c3483')
  const authorization = useRef('')
  authorization.current = `KakaoAK ${token}`
  const axios = useOnce(() => {
    const axios = Axios.create({
      baseURL: 'https://dapi.kakao.com',
    })
    axios.interceptors.request.use((config) => {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = authorization.current
      return config
    })
    return axios
  })

  const value = useMemo(() => {
    return {axios, updateAuthorization: setToken}
  }, [axios, setToken])

  return createElement(queryContext.Provider, {value}, [
    createElement(QueryClientProvider, {client: queryClient}, props.children),
  ])
}

export const useAxios = () => {
  const {axios} = useContext(queryContext) ?? {}

  if (!axios) {
    throw new Error('useAxios must be used within a QueryProvider')
  }

  return axios
}

export const useUpdateToken = () => {
  const {updateAuthorization} = useContext(queryContext) ?? {}
  if (!updateAuthorization) {
    throw new Error('useAxios must be used within a QueryProvider')
  }
  return updateAuthorization
}
