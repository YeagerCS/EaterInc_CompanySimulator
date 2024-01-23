const tryFunctionAsync = async (func, req, res) => {
    try{
        await func(req, res)
    } catch(err){
        console.error(err)
        res.status(500).json({ error: "Internal Server Error"})
    }
}

export { tryFunctionAsync }