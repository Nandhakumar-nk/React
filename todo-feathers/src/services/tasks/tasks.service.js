// Initializes the `tasks` service on path `/tasks`
const { Tasks } = require('./tasks.class');
const createModel = require('../../models/tasks.model');
const hooks = require('./tasks.hooks');

module.exports = function(app) {
    const options = {
        Model: createModel(app),
        paginate: false,
        whitelist: '$populate'
    };

    // Initialize our service with any options it requires
    app.use('/tasks', new Tasks(options, app));
    app.use("/importantTasks", {

        async find(params) {
            let importantTasks;
            try {
                importantTasks = await app.service('tasks').find({
                    query: {
                        isImportant: true,
                        isCompleted: false
                    }
                });
            } catch (error) {
                console.log("error:" + error);
            }

            return importantTasks;
        }
    })

    // Get our initialized service so that we can register hooks
    const service = app.service('tasks');

    service.hooks(hooks);
};