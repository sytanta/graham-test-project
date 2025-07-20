const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

const sequelize = new Sequelize('tasks', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
});

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

app.use(express.json());

sequelize.sync()
  .then(() => console.log('Database connected and Task model synced'))
  .catch(err => console.error('Unable to connect to the database:', err));

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).send({ status: 'error', message: 'Title is required' });
  }

  try {
    const task = await Task.create({ title, description });
    res.status(201).json({ status: 'success', data: task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to create task' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json({ status: 'success', data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to retrieve tasks' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    res.status(200).json({ status: 'success', data: task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to retrieve task' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ status: 'error', message: 'Completed status must be a boolean' });
  }

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }

    task.completed = completed;
    await task.save();
    res.status(200).json({ status: 'success', data: task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }

    await task.destroy();
    res.status(204).json({ status: 'success', message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to delete task' });
  }
});

app.listen(port, () => {
  console.log(`Task Management API listening at http://localhost:${port}`);
});
