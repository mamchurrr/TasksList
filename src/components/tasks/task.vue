<template>
    <div id="task">
        <h1 @click="changeName=!changeName" v-if="!changeName"> {{ task.name }} </h1>
        <div class="changer" v-else >
            <input  type="text" v-model="task.name">
            <button @click="saveChanges">Save</button>
        </div> 
        <p> {{ task.description }} </p>
        
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            changeName: false,
        }
    },
    computed: {
        task() {
            return this.$store.state.task;
        }
    },
    
    methods: {
        saveChanges: function() {
            this.changeName = !this.changeName
            axios.put('https://axios-9d3d5.firebaseio.com/tasks/' + this.$route.params.taskId, {
                name: this.task.name
            })
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error))
        }
    },
    created(){
        axios.get('https://axios-9d3d5.firebaseio.com/tasks.json')
        .then(res => {
            this.$store.commit('addTasks', res.data);
            this.$store.commit('addTask', {
                path: this.$route.path,
                params: this.$route.params.taskId
                });            
        })
        .catch(error => console.log(error))
    }

}
</script>


<style scoped>
    #task {
        width: 80%;
        margin: auto;    
    }

    h1 {
        text-align: center;
    }

    p {
        text-align: center;
    }

    .changer {
        text-align: center;
        margin: 20px;
    }

    .changer input {
        font-size: 2em;
        font-weight: bold;
        margin-right: 20px;
        padding: 2px 13px;
        border-radius: 5px;
    }

    .changer button {
        font-size: 2em;
        color: #fff;
        background-color: #665599;
        padding: 2px 13px;
        border-radius: 5px;
    }
    
</style>
