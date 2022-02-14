module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/orders/:orderid/order-items',
            handler: 'order-item.createManyByOrder',
        }
    ]
}