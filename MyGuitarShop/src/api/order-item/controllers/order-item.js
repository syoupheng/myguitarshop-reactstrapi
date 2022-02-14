'use strict';

/**
 *  order-item controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order-item.order-item',  ({ strapi }) => ({
    async createManyByOrder(ctx) {
        const { id } = ctx.state.user;
        const { status, order_items } = ctx.request.body;
        const quantities = [
            {quantity: 1},
            {quantity: 2},
            {quantity: 3}
        ]

        const products = [
            {product: 1},
            {product: 2},
            {product: 3}
        ]
        try {
            return await strapi.db.connection.context.transaction(async trx => {
                // const order = await strapi.db.query('api::order.order').create({
                //     data: {
                //       status: status,
                //     //   users_permissions_user: id,
                //     },
                // });
    
                // const orderItems = await order_items.map(order_item => strapi.db.query('api::order-item.order-item').create({
                //     data: {
                //         order: 9999,
                //         ...order_item
                //     }
                // }, null, { transacting }));
                // const order = await trx.raw(`INSERT INTO orders (status) VALUES ('${status}');`);
                const orderId = await trx('orders').insert({status: status});
                await trx('orders_users_permissions_user_links').insert({order_id: orderId, user_id: id});
                // const orderItemIds = await trx('order_items').insert(quantities);
                // let ids = [];
                // for (let i = 0; i < quantities.length; i++) {
                //     ids.push(parseInt(orderItemIds) + i);
                // }
                // console.log(ids);
    
                // let order_item_order_fields = [];
                // ids.forEach(id => {
                //     order_item_order_fields.push({
                //         order_id: orderId,
                //         order_item_id: id
                //     })
                // });
    
                // console.log(order_item_order_fields)
                // await trx('order_items_order_links').insert(order_item_order_fields)
    
                // let order_item_product_fields = [];
                // ids.forEach(id => {
                //     order_item_product_fields.push({
                //         product_id: 0,
                //         order_item_id: id
                //     })
                // });
    
                // products.forEach(product => {
                //     order_item_product_fields.push({
                //         product_id: 0,
                //         order_item_id: id
                //     })
                // });
    
                // console.log(order_item_order_fields)
                // await trx('order_items_order_links').insert(order_item_order_fields)
                let orderItemId;
                await Promise.all(
                    order_items.map(order_item => {
                        orderItemId = trx.insert({quantity: order_item.quantity}).into('order_items')
                        .then((orderItemId) => {
                            trx('order_items_order_links').insert ({order_item_id: orderItemId, order_id: orderId});
                            trx('order_items_product_links').insert ({order_item_id: orderItemId, product_id: order_item.product});
                        })
                        // trx('order_items_order_links').insert ({order_item_id: orderItemId, order_id: orderId});
                        // await trx('order_items_product_links').insert ({order_item_id: orderItemId, product_id: order_item.product});
                        // trx.raw(`INSERT INTO order_items_order_links (order_item_id, order_id) VALUES (${orderItemId}, ${orderId});`);
                        // trx.raw(`INSERT INTO order_items_product_links (order_item_id, product_id) VALUES (${orderItemId}, ${order_item.product});`);
                    })
                );
    
                // await order_items.map(async order_item => {
                //     let orderItemId = await trx.insert({quantity: order_item.quantity}).into('order_items');
                //     await trx.raw(`INSERT INTO order_items_order_links (order_item_id, order_id) VALUES (${orderItemId}, ${orderId});`);
                //     await trx.raw(`INSERT INTO order_items_product_links (order_item_id, product_id) VALUES (${orderItemId}, ${order_item.product});`);
                // }); 
    
                return {orderId, user: id};
            });
        } catch (error) {
            console.log(error);
        }
        
    },
}));
