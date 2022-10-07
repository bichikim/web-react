import {useAxios} from './query-context'
import {useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'

export interface GetSearchBookPayLoad {
  page?: number
  search?: string
  size?: number
}

export interface BookType {
  authors: string[]
  contents: string
  datetime: string
  isbn: string
  price: number
  publisher: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  sale_price: number
  status: string
  thumbnail: string
  title: string
  translators: string[]
  url: string
}

export interface GetSearchBookMeta {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  total_count?: number
}

export interface GetSearchBookResponse {
  documents?: BookType[]
  meta?: GetSearchBookMeta
}

export const useGetSearchBook = (payload: GetSearchBookPayLoad) => {
  const {page, size, search} = payload
  const axios = useAxios()

  const query = useQuery(
    ['get-search-book'],
    async (): Promise<GetSearchBookResponse> => {
      if (!search) {
        return {}
      }
      const {data} = await axios.get('/v3/search/book', {
        params: {
          page,
          query: search,
          size,
        },
      })

      return data
    },
    {
      enabled: false,
    },
  )

  useEffect(() => {
    query.refetch()
  }, [query])

  return query
}
