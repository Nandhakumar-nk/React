// Initializes the `step-tasks` service on path `/step-tasks`
const { StepTasks } = require('./step-tasks.class');
const createModel = require('../../models/step-tasks.model');
const hooks = require('./step-tasks.hooks');

module.exports = function(app) {
    const options = {
        Model: createModel(app),
        paginate: false
    };

    // Initialize our service with any options it requires
    app.use('/stepTasks', new StepTasks(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('stepTasks');

    service.hooks(hooks);
};