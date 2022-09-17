import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"
import loginService from "../services/login"

const orderByVotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.likes - a.likes)
}

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    likeBlog(state, action) {
      return orderByVotes(
        state.map((blog) =>
          blog.id !== action.payload
            ? blog
            : { ...blog, likes: blog.likes + 1 }
        )
      )
    },
    newBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      const index = state.findIndex(blog => blog.id === action.payload)
      const newBlogs = Array.from(state);
      newBlogs.splice(index, 1)
      return newBlogs
    },
    getBlogs(state, action) {
      return action.payload
    },
  },
})

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    show: false,
    timeoutID: null,
  },
  reducers: {
    setNotification(state, action) {
      return { ...state, message: action.payload }
    },
    showNotification(state, action) { // eslint-disable-line
      return { ...state, show: true }
    },
    hideNotification(state, action) { // eslint-disable-line
      return { ...state, show: false }
    },
    setTimeoutID(state, action) {
      return { ...state, timeoutID: action.payload }
    },
  },
})

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const userReducer = userSlice.reducer
export const { setUser } = userSlice.actions
export const blogReducer = blogSlice.reducer
export const { likeBlog, newBlog, getBlogs, deleteBlog } = blogSlice.actions
export const notificationReducer = notificationSlice.reducer
export const {
  setNotification,
  showNotification,
  hideNotification,
  setTimeoutID,
} = notificationSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(getBlogs(blogs))
  }
}

export const handleDelete = (id) => {
  return async (dispatch) => {
    if (window.confirm("do you really want to delete the blog?")) {
      try {
        await blogsService.deleteBlog(id)
        dispatch(setNotification("like successfully"))
        dispatch(showNotification())
        const timeoutID = setTimeout(() => dispatch(hideNotification()), 2000)
        dispatch(setTimeoutID(timeoutID))
        dispatch(deleteBlog(id))
      } catch (err) {
        console.log(err)
        dispatch(setNotification("não deletoou hein"))
        dispatch(showNotification())
        const timeoutID = setTimeout(() => dispatch(hideNotification()), 2000)
        dispatch(setTimeoutID(timeoutID))
      }
    }
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogsService.saveBlog(content)
      dispatch(newBlog(addedBlog))
      dispatch(setNotification("new blog added successfully"))
      dispatch(showNotification())
      const timeoutID = setTimeout(() => dispatch(hideNotification()), 2000)
      dispatch(setTimeoutID(timeoutID))
      // blogRef.current.changeVisibility()
    } catch (error) {
      dispatch(setNotification("deu error, try again"))
      dispatch(showNotification())
      const timeoutID = setTimeout(() => dispatch(hideNotification()), 2000)
      dispatch(setTimeoutID(timeoutID))
    }
  }
}

export const addLike = (updatedBlog) => {
  return async (dispatch) => {
    console.log(updatedBlog)
    try {
      const response = await blogsService.updateBlog(updatedBlog)
      dispatch(setNotification("like successfully"))
      dispatch(showNotification())
      const timeoutID = setTimeout(() => dispatch(hideNotification()), 2000)
      dispatch(setTimeoutID(timeoutID))
      dispatch(likeBlog(response.id))
    } catch (err) {
      console.log(err)
      dispatch(setNotification("não deu like"))
      dispatch(showNotification())
      const timeoutID = setTimeout(() => dispatch(hideNotification()), 2000)
      dispatch(setTimeoutID(timeoutID))
    }
  }
}

export const sendNotification = (message, time=2000) => {
  console.log(message, time)
  return async (dispatch) => {
    dispatch(setNotification(message))
    dispatch(showNotification())
    const timeoutID = setTimeout(() => dispatch(hideNotification()), time)
    console.log(timeoutID)
    dispatch(setTimeoutID(timeoutID))
  }
}

export const handleLogin = (userCredentials) => {
  console.log(userCredentials)
  return async (dispatch) => {
    try {
      const user = await loginService.login(userCredentials)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      dispatch(setUser(user))
      blogsService.setToken(user.token)
    } catch (error) {
      dispatch(setNotification("username and password don't match"))
      dispatch(showNotification())
      const timeoutID = setTimeout(() => dispatch(hideNotification()), 2000)
      dispatch(setTimeoutID(timeoutID))
    }
  }
}
