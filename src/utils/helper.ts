export const maskValues = (value: any) => {
    return value.replace(/(\d{2})(.*)(\d{2})/, '$1******$4')
}