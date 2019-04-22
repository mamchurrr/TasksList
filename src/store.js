import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    setTasks: ({commit, state}) => {
      if(!state.axios) {
        axios.get('https://axios-9d3d5.firebaseio.com/tasks.json')
        .then(res => {
          commit('addTasks', res.data);               
        })
        .catch(error => console.log(error));
      } 
      commit('changeTasks'); 
    },
    setTask: ({commit, state}, taskParams) => {
      axios.get('https://axios-9d3d5.firebaseio.com/tasks.json')
        .then(res => {
            if(!state.axios) {
                commit('addTasks', res.data);               
            } 
            commit('addTask', taskParams);            
        })
        .catch(error => console.log(error))
    },
    updateTask: ({state}, taskRoute) => {
      axios.put('https://axios-9d3d5.firebaseio.com/tasks/' + taskRoute, {
                name: state.task.name
            })
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error))
    }
  },
  
  getters: {
    tasks: state => {
      return state.tasks;
    },
    task: state => {
      return state.task;
    }
  }
})