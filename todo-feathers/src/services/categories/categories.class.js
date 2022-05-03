const { Service } = require('feathers-mongoose');

exports.Categories = class Categories extends Service {
    async find(params) {
        let categories;
        try {
            categories = await super.find({
                query: {
                    '$populate': {
                        path: 'tasks',
                        'populate': {
                            path: 'stepTasks',
                        }
                    }
                }
            });
        } catch (error) {
            console.log("error:" + error);
        }

        return categories;
    }

    async get(id, params) {
        let category;

        try {
            category = await super.get(id, {
                query: {
                    '$populate': {
                        path: 'tasks',
                        'populate': {
                            path: 'stepTasks',
                        }
                    }
                }
            });
        } catch (error) {
            console.log("error:" + error);
        }

        return category;
    }
};