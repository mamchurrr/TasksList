import { shallowMount, createLocalVue  } from '@vue/test-utils'
import Task from '@/components/tasks/task.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const routes = [{
  path: "/task/1",
  params: { taskId: "1" }
}]

const router = new VueRouter({
  routes
})


describe('Вид компонента Task', () => {
  let actions;
  let store;  

  beforeEach(() => {
    actions = {
      updateTask: jest.fn(),
    }
    store = new Vuex.Store({
      state: {
        task: {
          name: "Task Test",
          description: "Text Task Test",
        },
      },
      getters: {
        task: state => {
          return state.task;
        }
      },
      actions
    })
  })

  it('вызывает "updateTask", при блюре названия', () => {
    const wrapper = shallowMount(Task, { store, localVue, router })
    const h1 = wrapper.find('h1')
    h1.trigger('click')
    const input = wrapper.find('input')
    input.element.value = "bla-bla"
    input.trigger('blur')
    expect(actions.updateTask).toHaveBeenCalled()
  })

  it("renders a username using a real Vuex getter", () => {
    const wrapper = shallowMount(Task, { store, localVue })
  
    expect(wrapper.find("h1").text()).toBe("Task Test")
  })
})