import {useState} from 'react'
import {server} from './server'

type State<TData> = {
    data: TData | null,
    loading: boolean,
    error: boolean
}

type MutationTuple<TData, TVariables> = [(variables? : TVariables | undefined) => Promise<void>, State<TData>]

export const useMutation = <TData = any, TVariables = any>(query: string) : MutationTuple<TData, TVariables> => {
    const [state, setState] = useState<State<TData>>({data: null, loading: false, error: false})

    const fetch = async (variables?: TVariables) => {
        try {
            setState({data: null, error: false, loading: true})

            const {data, errors} = await server.graphqlAPI<TData, TVariables>({query, variables})

            if (errors && errors.length) {
                throw new Error(errors[0].message)
            }

            setState({data, loading: false, error: false})

        } catch (e) {
            setState({data: null, error: true, loading: false})
            throw console.error(e)
        }
    }

    return [fetch, state!]

}
