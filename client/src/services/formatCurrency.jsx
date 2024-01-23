export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-us', {
        style: "currency",
        currency: "usd"
    }).format(amount)
}