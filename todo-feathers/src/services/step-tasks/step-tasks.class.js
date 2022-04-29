const { Service } = require('feathers-mongoose');

exports.StepTasks = class StepTasks extends Service {
    constructor(options, app) {
        super(options, app);
        this.app = app;
    }

    async create(data, params) {
        const createdStepTask = await super.create({
            task: data.stepTask,
            isCompleted: false
        }, params);

        console.log("inside stepTask class, taskResult    ", createdTask);
        const task = await this.app.service("tasks").get(data.taskId);
        console.log("inside stepTask class, catResult    ", task);
        task.tasks.push(createdStepTask);
        await this.app.service("tasks").patch(data.taskId, task, params)
        return createdStepTask;
    }
};