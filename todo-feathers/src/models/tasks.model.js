// tasks-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
    const modelName = 'Task';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema({
        task: { type: String, required: true },
        isImportant: { type: Boolean },
        isCompleted: { type: Boolean },
        stepTasks: [{
            type: mongooseClient.Schema.Types.ObjectId,
            ref: "StepTask"
        }]
    }, {
        timestamps: true
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);

};