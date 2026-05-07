import { useState } from 'react'
import './TaskBoard.css'

let nextId = 1

function TaskBoard() {
  const [tasks, setTasks] = useState([])
  const [inputText, setInputText] = useState('')

  function handleAdd() {
    const trimmed = inputText.trim()
    if (!trimmed) return
    setTasks(prev => [...prev, { id: nextId++, text: trimmed, done: false }])
    setInputText('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
  }

  function toggleDone(id) {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, done: !task.done } : task)
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const pending = tasks.filter(t => !t.done)
  const done = tasks.filter(t => t.done)

  return (
    <div className="board">
      <h1 className="board__title">Task Board</h1>

      <div className="board__input-row">
        <input
          className="board__input"
          type="text"
          placeholder="タスクを入力..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="board__add-btn" onClick={handleAdd}>追加</button>
      </div>

      {tasks.length === 0 && (
        <p className="board__empty">タスクがありません</p>
      )}

      <ul className="task-list">
        {pending.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleDone} onDelete={deleteTask} />
        ))}
        {done.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleDone} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  )
}

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.done ? ' task-item--done' : ''}`}>
      <input
        className="task-item__checkbox"
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-item__text">{task.text}</span>
      <button
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label="削除"
      >
        ×
      </button>
    </li>
  )
}

export default TaskBoard
