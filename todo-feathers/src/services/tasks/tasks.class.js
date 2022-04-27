const { Service } = require('feathers-mongoose');

exports.Tasks = class Tasks extends Service {
    constructor(options, app) {
        super(options, app);
        this.app = app;
    }

    async create(data, params) {
        const createdTask = await super.create({
            task: data.task,
            isCompleted: false,
            isImportant: false
        }, params);

        console.log("inside task class, taskResult    ", createdTask);
        const category = await this.app.service("categories").get(data.categoryId);
        console.log("inside task class, catResult    ", category);
        category.tasks.push(createdTask);
        await this.app.service("categories").patch(data.categoryId, category, params)
        return createdTask;
    }
};