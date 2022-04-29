const { Service } = require('feathers-mongoose');

exports.StepTasks = class StepTasks extends Service {
    constructor(options, app) {
        super(options, app);
        this.app = app;
    }

    async create(data, params) {
        console.log("inside stepTask create:" + data.stepTask);
        let createdStepTask;
        try {
            createdStepTask = await super.create({
                stepTask: data.stepTask,
                isCompleted: false
            }, params);

            console.log("inside stepTask class, stepTaskResult    ", createdStepTask);
            const task = await this.app.service("tasks").get(data.taskId);
            console.log("inside stepTask class, catResult    ", task);
            task.stepTasks.push(createdStepTask);
            await this.app.service("tasks").patch(data.taskId, task, params)
        } catch (error) {
            console.log("error:" + error);
        }

        return createdStepTask;
    }
};