
export const required = (value: string) => {
    if(value) return undefined
    return 'Field is required'
}

export const maxLengthCreator = (maxLength: number) => {
    return (value: string) => {
        if (value.length > maxLength ) return `max length with ${maxLength} symbols`
        return undefined

    }}

