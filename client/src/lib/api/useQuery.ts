import {useEffect, useState} from 'react'
import {server} from "./server";

type State<TData> = {
    data: TData | null
}


export const useQuery = <TData>(query: string) => {
    const [state, setState] = useState<State<TData>>({data: null})

    useEffect(() => {
        const fetchAPI = async () => {
            const {data} = await server.graphqlAPI<TData>({query})
            setState({data})
        }

        fetchAPI()

    }, [query])

    return state

}
