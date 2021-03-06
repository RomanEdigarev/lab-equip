
type Body<TVariables> = {
    query: string
    variables? : TVariables
}

type Error = {
    message: string
}

export const server = {
    graphqlAPI: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            throw new Error('failed fetch from server')
        }

        return res.json() as Promise<{data: TData, errors: Error[]}>
    }
}
