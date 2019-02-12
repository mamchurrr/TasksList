<template>
  <div id="welcome">
    <h1> {{ NAME_LIST }} </h1>
    <p> {{ DESCRIPTION_LIST }} </p>
    <div class="tasks">
      <div class="task" v-for="task in tasks" :key="task.id" :class="{ 'red': task.is_high_priority }"> 
        <router-link tag="div" :to="{ name: 'task.show', params: { taskId: task.id }}" >
          <div class="name"> 
            <h3> {{ NAME_TASK }} {{ task.name }}  </h3>
            
          </div>
          <div>
            <ul class="tags" >
              <li v-for="tag in task.tags" :key="tag" class="tag"> {{ tag }} </li>
            </ul>         
          </div>
          <div> {{ ACTUAL_EFFORT }} {{ task.actual_effort + " часа"}} </div>
          <div> {{ ESTIMATED_EFFORT }} {{ task.estimated_effort + " часа"}} </div>
          <div> {{ DUE_DATE }} {{ taskDate(task) }}  </div>
        </router-link>       
      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
import { NAME_LIST, DESCRIPTION_LIST, ACTUAL_EFFORT, ESTIMATED_EFFORT, DUE_DATE, NAME_TASK } from '../../phrases/phrases.js';

export default {
  data() {
    return {
      NAME_LIST,
      DESCRIPTION_LIST,
      ACTUAL_EFFORT,
      ESTIMATED_EFFORT,
      DUE_DATE,
      NAME_TASK,
    }
  },

  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    taskDate(task) {
      let date
      let due = task.due_date;
      if(due!==undefined){
        let dateArray = due.split('T');
        date = dateArray[0].split("-").reverse().join(".") + " в " + dateArray[1];
      }
      return date;
    }
  },
  created(){
    if(!this.$store.state.axios) {
      axios.get('https://axios-9d3d5.firebaseio.com/tasks.json')
      .then(res => {
        this.$store.commit('addTasks', res.data);               
      })
      .catch(error => console.log(error));
    } 
    this.$store.commit('changeTasks');   
  },
}
</script>

<style scoped>
  @import url('../../styles/welcome.css'); 
</style>