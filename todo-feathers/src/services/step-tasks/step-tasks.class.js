const { Service } = require('feathers-mongoose');

exports.StepTasks = class StepTasks extends Service {
    constructor(options, app) {
        super(options, app);
        this.app = app;
    }

    async create(data, params) {

        const createdTask = await super.create({ step_task: data.step_task }, params);;

        console.log("inside task class, taskResult    ", createdTask);
        await this.app.service("tasks").patch(data.id, {
            step_tasks: createdTask
        }, params)
        return createdTask;
    }
};