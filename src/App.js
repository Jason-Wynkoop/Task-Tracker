//useEffect is used to create sideeffects or deal with the,
//if you want something to happen when the page loads
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'


function App() {

  const [showAddTask, setShowAddTask] = useState(false)


  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks();
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json()
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json()
    return data
  }

  // Add task
  const addTask = async (task) => {
    const response = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await response.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  /**
   * When a task component it double clicked, the state goes up
   * the tree and ends here
   * 
   * Map through each task.
   * Where the task.id equals to the id that is passed in
   * then have a specific object, else it will just be the task 
   * (no change, we only want to change the one we are dealing with)
   * 
   * The one we are dealing with the object I want to copy/spread across
   * copy all elements of that task, but change the reminder to the 
   * opposite true/false
   * @param {tasks id that was clicked} id 
   */
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await response.json()

    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task))
  }


  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ?
              <Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} /> : ('No tasks to show.')
            }
          </>
        )
        } />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
