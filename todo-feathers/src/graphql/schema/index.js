const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type StepTask {
    _id: ID!
    stepTask: String!
    isCompleted: Boolean!
    isImportant: Boolean!
  }

  type Task {
    _id: ID!
    task: String!
    stepTasks: [StepTask!]
    isCompleted: Boolean!
    isImportant: Boolean!
  }
  
  type Task1 {
    _id: ID!
    task: String!
    stepTasks: [ID]
    isCompleted: Boolean!
    isImportant: Boolean!
  }
  
  type Category {
    _id: ID!
    title: String!
    tasks: [Task1]
  }

  type Query {
    categories:[Category!]
    tasks:[Task!]
    stepTasks:[StepTask!]
  }

  input CategoryInput {
    title: String!
  }

  input TaskInput {
    categoryId: ID!
    task: String!
  }

  input StepTaskInput {
    taskId: ID!
    stepTask: String!
  }

  type Mutation {
    createCategory(category:CategoryInput): Category
    createTask(task:TaskInput): Task
    createStepTask(stepTask:StepTaskInput): StepTask
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)