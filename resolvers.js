import Task from './models/task';

export const resolvers = {
  Query: {
    async getTask(root, { _id }) {
      return await Task.findById(_id);
    },
    async allTasks() {
      return await Task.find();
    }
  },
  Mutation: {
    async createTask(root, { input }) {
      return await Task.create(input);
    },
    async updateTask(root, { _id, input }) {
      return await Task.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteTask(root, { _id }) {
      return await Task.findOneAndRemove({ _id });
    }
  }
};
