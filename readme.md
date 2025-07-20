# Task Management API

This is a simple **Task Management API** built with **Node.js**, **Express**, and **MySQL** using **Sequelize** as the ORM. The API allows users to manage tasks, including the ability to create, read, update, and delete tasks. Tasks can also be filtered by their completion status.

## Features

* **Create Task**: Add a new task with a title and description.
* **Get Tasks**: Retrieve a list of all tasks.
* **Get Task by ID**: Retrieve a single task using its ID.
* **Update Task**: Mark a task as completed or modify its status.
* **Delete Task**: Delete a task from the database.

## Prerequisites

Before running the API, ensure that you have:

* **Node.js** and **npm** installed on your machine.
* A **MySQL** server running locally or remotely, with a database created for this project.
* The **MySQL credentials** (username, password, and database name) for setting up the connection.

## Improvements to Consider

While the API provides the basic CRUD operations for task management, there are a few areas that could be further enhanced:

* **Project Structure**: A single index file isn't an appropriate way to manage a project. How could this be improved?

* **Language Choice**: This project is written in JavaScript, and comes along with all of its shortcomings. What would a conversion to TypeScript look like?

* **Testing**: There are no tests, and no testing framework. Where would you begin?

* **Input Validation**: Ensure that all required fields are validated, and the user receives informative error messages when data is missing or invalid.

* **Error Handling**: Consider using error handling middleware to streamline error responses across different endpoints.

* **Authentication**: Currently, the API is open, which may not be ideal for production environments. Implementing authentication (e.g., JWT) could help secure the endpoints.

* **Pagination**: As the task list grows, returning all tasks at once might not be efficient. Implementing pagination for the `/tasks` endpoint would allow users to request smaller, more manageable chunks of data.
