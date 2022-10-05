import {useAxios} from './query-context'
import {useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'

export interface GetSearchBookPayLoad {
  page?: number
  search?: string
  size?: number
}

export const useGetSearchBook = (payload: GetSearchBookPayLoad) => {
  const {page, size, search} = payload
  const axios = useAxios()

  const query = useQuery(
    ['get-search-book'],
    async () => {
      if (!search) {
        return
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
