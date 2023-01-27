'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({
    async find(ctx) {

        const entries = await strapi.entityService.findMany('api::blog.blog', {
            populate: '*',
        })
        // console.log(entries)
        ctx.body = entries
    },

    async findOne(ctx) {
        const id = ctx.params.id

        const entries = await strapi.entityService.findOne('api::blog.blog', id, {
            populate: '*',
        })
        console.log(id)
        ctx.body = entries
    },

    async getUserPosts(ctx) {

        const user = ctx.state.user

        const entries = await strapi.entityService.findMany('api::blog.blog', {
            populate: '*',
            filters: {
                author: user.id
            }
        })
        // console.log(entries)
        ctx.body = entries
    },

    async getAllPostsFilters(ctx) {
        const entries = await strapi.entityService.findMany('api::blog.blog', {
            populate: '*',
            filters: {}
        })
        // console.log(entries)
        ctx.body = entries
    }
}));
