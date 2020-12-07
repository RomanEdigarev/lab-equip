import {useCallback, useEffect, useState} from 'react'
import {server} from "./server";

type State<TData> = {
    data: TData | null,
    loading: boolean,
    error: boolean
}

type QueryResult<TData> = State<TData> & {refetch : () => void}

export const useQuery = <TData>(query: string) : QueryResult<TData> => {
    const [state, setState] = useState<State<TData>>({data: null, loading: false, error: false})

    const fetch = useCallback(() => {
        const fetchAPI = async () => {
            try {
                setState({data: null, loading: true, error: false})
                const {data, errors} = await server.graphqlAPI<TData>({query})
                setState({data, loading: false, error: false})

                if(errors && errors.length) {
                    throw new Error(errors[0].message)
                }

            } catch (e) {
                setState({data: null, loading: false, error: true})
                throw console.error(e)
            }
            
        }
        fetchAPI()
    }, [query])

    useEffect(() => {
        fetch()
    }, [fetch])

    return {...state, refetch: fetch}

}
