//const { app } = require(".../app.js");

module.exports = {
    getResolver: function(app) {
        return {
            createCategory: async args => {
                console.log("insideCreateCategory");
                try {
                    const createdCategory = await app.service('categories').create(args.category);

                    return createdCategory;
                } catch (error) {
                    throw error;
                }
            },

            createTask: async args => {
                try {
                    const createdTask = await app.service('tasks').create(args.task);

                    return createdTask;
                } catch (error) {
                    throw error;
                }
            },

            createStepTask: async args => {
                try {
                    const createdStepTask = await app.service('stepTasks').create(args.stepTask);

                    return createdStepTask;
                } catch (error) {
                    throw error;
                }
            },

            categories: async() => {
                try {
                    const categories = await app.service('categories').find();

                    return categories;
                } catch (error) {
                    throw error
                }
            },

            tasks: async() => {
                try {
                    const tasks = await app.service('tasks').find();

                    return tasks;
                } catch (error) {
                    throw error
                }
            },

            stepTasks: async() => {
                try {
                    const stepTasks = await app.service('stepTasks').find();

                    return stepTasks;
                } catch (error) {
                    throw error
                }
            }
        }
    }
};