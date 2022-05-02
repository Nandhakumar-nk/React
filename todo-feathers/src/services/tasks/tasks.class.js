const { Service } = require('feathers-mongoose');

exports.Tasks = class Tasks extends Service {
    constructor(options, app) {
        super(options, app);
        this.app = app;
    }

    async create(data, params) {
        let createdTask;
        try {
            createdTask = await super.create({
                task: data.task,
                isCompleted: false,
                isImportant: false
            }, params);
            console.log("inside task class, taskResult    ", createdTask);
            const category = await this.app.service("categories").get(data.categoryId);
            console.log("inside task class, catResult    ", category);
            category.tasks.push(createdTask);
            await this.app.service("categories").patch(data.categoryId, category, params);
        } catch (error) {
            console.log("error:" + error);
        }
        return createdTask;
    }

    async find(params) {
        let tasks;

        try {
            tasks = await super.find({
                query: { $populate: 'stepTasks', ...params.query }
            });
        } catch (error) {
            console.log("error:" + error);
        }

        return tasks;
    }

    async get(id, params) {
        let task;

        try {
            task = await super.get(id, {
                query: { $populate: 'stepTasks' }
            });

        } catch (error) {
            console.log("error:" + error);
        }

        return task;
    }
};