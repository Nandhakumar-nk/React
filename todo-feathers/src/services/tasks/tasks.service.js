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
    //custom service
    //app.use('/importantTasks', {rest methods});

    // Get our initialized service so that we can register hooks
    const service = app.service('tasks');

    service.hooks(hooks);
};