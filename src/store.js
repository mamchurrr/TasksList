import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    task: {},
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
      console.log('state updated');
      console.log(state.tasks);
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