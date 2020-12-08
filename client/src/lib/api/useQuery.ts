import {useCallback, useEffect, useReducer, useState} from 'react'
import {server} from "./server";

type State<TData> = {
    data: TData | null,
    loading: boolean,
    error: boolean
}

type Action<TData> = {type: 'FETCHING'} | {type: 'FETCH_SUCCESS', payload: TData} | {type: 'FETCH_ERROR'}
type QueryResult<TData> = State<TData> & {refetch : () => void}


const reducer = <TData>() => (state: State<TData>, action: Action<TData>) : State<TData> => {
    switch (action.type) {
        case "FETCHING": {
            return {...state, loading: true, error: false}
        }
        case "FETCH_SUCCESS": {
            return {data: action.payload, error: false, loading: false}
        }
        case "FETCH_ERROR": {
            return {...state, error: true, loading: false}
        }
        default: { throw new Error() }
    }
}

export const useQuery = <TData>(query: string) : QueryResult<TData> => {
    // const [state, setState] = useState<State<TData>>({data: null, loading: false, error: false})
    const [state, dispatch] = useReducer(reducer<TData>(), {data: null, loading: false, error: false})

    const fetch = useCallback(() => {
        const fetchAPI = async () => {
            try {
                // setState({data: null, loading: true, error: false})
                dispatch({type: 'FETCHING'})
                const {data, errors} = await server.graphqlAPI<TData>({query})
                // setState({data, loading: false, error: false})
                dispatch({type: 'FETCH_SUCCESS', payload: data})

                if(errors && errors.length) {
                    throw new Error(errors[0].message)
                }

            } catch (e) {
                // setState({data: null, loading: false, error: true})
                dispatch({type: 'FETCH_ERROR'})
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
