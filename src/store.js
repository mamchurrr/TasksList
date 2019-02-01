import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    task: {},
    axios: false,
  },
  mutations: {
    addTasks: (state, response) => {
      const data = response;
      const tasks = [];
      for (let key in data) {
        const task = data[key];
        task.id = key;
        if(task.obj_status === "active") {
          tasks.push(task);
        }
      }      
      state.tasks = tasks;
      state.axios = true;
    },
    changeTasks: (state) => {
      if(Object.keys(state.task).length) {
        const data = state.tasks;
        for (let key in data) {
          const task = data[key];
          let storeTaskId = state.task.id;
          task.id = key;
          data.splice(storeTaskId, 1, state.task);
        }
        state.tasks = data;
      }
    },
    addTask: (state, payload) => {
      let link = payload.path;
      let data = state.tasks;
      for (let key in data) {
        const task = data[key];
        if(link === '/task/' + task.id ) {
            let indexArray = payload.params;
            let gotTask = data[indexArray];
            state.task = gotTask;
        }             
      }
    },
  },
  actions: {

  },
  getters: {

  }
})