import { shallowMount, createLocalVue  } from '@vue/test-utils'
import Task from '@/components/tasks/task.vue'

import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)


describe('Вид компонента Task', () => {
  let state
  let store

  beforeEach(() => {
    state = {
      task: {
        name: "Task Test",
        description: "Text Task Test",
      },
    }

    store = new Vuex.Store({
      state
    })
  })

  it('Не рендерит input для изменения имени таски - без нажатия на Н1', () => {
    const TaskWrapper = shallowMount(Task, { store, localVue })
    expect(TaskWrapper.html()).not.toContain('<input>')
  })

  it('Рендерит input для изменения имени таски после нажатия', () => {
    const TaskWrapper = shallowMount(Task, { store, localVue })
    TaskWrapper.setData({
      changeName: true
    })
    expect(TaskWrapper.find('.changer').isVisible()).toBe(
      true
    )
  })
})