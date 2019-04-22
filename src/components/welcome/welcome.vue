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
import { mapGetters } from 'vuex';
import { NAME_LIST, 
        DESCRIPTION_LIST, 
        ACTUAL_EFFORT, 
        ESTIMATED_EFFORT, 
        DUE_DATE, 
        NAME_TASK 
        } from '@/phrases/phrases.js';

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
    ...mapGetters(['tasks'])
  },
  methods: {
    taskDate(task) {
      let date;
      const { due_date } = task;
      if(due_date !== undefined){
        let dateArray = due_date.split('T');
        date = dateArray[0].split("-").reverse().join(".") + " в " + dateArray[1];
      }
      return date;
    }
  },
  created(){
    this.$store.dispatch('setTasks');
  },
}
</script>

<style scoped src="@/styles/welcome.css">
</style>
