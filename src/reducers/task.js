import moment from 'moment'

const task = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case 'ADD_TASK_LOADING':
    case 'INSERT_TASK_LOADING':
    case 'ADD_SUBTASK_LOADING':
    case 'INSERT_SUBTASK_LOADING':
      return {
        id: payload.id,
        upTaskId: payload.upTaskId,
        projectId: payload.projectId,
        assignee: payload.assignee,
        title: '',
        detail: '',
        createdAt: moment(),
        createdBy: '',
        completed: 'active'
      }
    case 'EDIT_TASK_TITLE':
      if (state.id === payload.id) {
        return {
          ...state,
          title: payload.title
        }
      }
      return state
    case 'EDIT_TASK_DETAIL':
      if (state.id === payload.id) {
        return {
          ...state,
          detail: payload.detail
        }
      }
      return state
    case 'EDIT_TASK_ASSIGNEE_LOADING':
      if (state.id === payload.id) {
        return {
          ...state,
          assignee: payload.assignee
        }
      }
      return state
    case 'EDIT_SUBTASK_ASSIGNEE_LOADING':
      if (state.id === payload.id) {
        return {
          ...state,
          assignee: payload.assignee,
          myOrder: payload.myOrder
        }
      }
      return state
    case 'EDIT_TASK_DUE_LOADING':
      if (state.id === payload.id) {
        return {
          ...state,
          dueAt: payload.dueAt
        }
      }
      return state
    case 'TOGGLE_TASK_LOADING':
      if (state.id === payload.id) {
        const completed = state.completed === 'active' ? 'completed' : 'active'
        return {
          ...state,
          completed
        }
      }
      return state
    case 'EDIT_TASK_PROJECT_LOADING':
      if (state.id === payload.id) {
        return {
          ...state,
          projectId: payload.projectId
        }
      }
      return state

    default:
      return state
  }
}

export default task

// task: id title projectId ~sectionId ~createDate dueDate ~tag ~fromWhere ~fromWho ~creator completed ~completeDate [assignee]
//
// ADD_TASK_FOR_PROJECT ADD_TASK_FOR_ME EDIT_TASK_TITLE EDIT_TASK_DETAIL EDIT_TASK_ASSIGNEE EDIT_TASK_DUE ADD_TASK_TAG EDIT_TASK_PROJECT EDIT_TASK_SECTION DELETE_TASK TOGGLE_TASK
