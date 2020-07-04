import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type Task {
  _id: ID!
  title: String!,
  date: Date,
  content: String!
}

scalar Date

type Query {
  getTask(_id: ID!): Task
  allTasks: [Task]
}

input TaskInput {
  title: String!
  content: String!
}

input TaskUpdateInput {
  title: String
  content: String
}

type Mutation {
  createTask(input: TaskInput) : Task
  updateTask(_id: ID!, input: TaskUpdateInput): Task
  deleteTask(_id: ID!) : Task
}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
