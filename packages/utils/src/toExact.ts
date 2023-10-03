type Exact<T> = T & { readonly _exact: unique symbol }

export function toExact<T extends {}>(obj: T, allowedKeys: (keyof T)[]): Exact<T> {
    const r = {} as Exact<T>

    allowedKeys.forEach(key => {
        (r[key] as any) = obj[key]
    })

    return r
}