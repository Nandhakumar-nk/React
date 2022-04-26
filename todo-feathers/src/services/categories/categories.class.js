const { Service } = require('feathers-mongoose');

exports.Categories = class Categories extends Service {
    async find(params) {
        const categories = await super.find({
            query: { $populate: 'tasks' }
        });

        return categories;
    }

    async get(id, params) {
        const category = await super.get(id, {
            query: { $populate: 'tasks' }
        });

        return category;
    }
};