# Todo List Description

This To-Do List application offers a robust and user-friendly interface for efficiently handling tasks. It empowers users to seamlessly create, modify, remove, and efficiently search for tasks, rendering it an indispensable tool for organizing and monitoring tasks and activities. Through its implementation, it illustrates prevalent paradigms and best practices for constructing a responsive web application using React and integrating it seamlessly with Firebase, showcasing the potential for creating efficient and modern web applications.

![Untitled](https://github.com/anb-hq/CnD_Vannlithi_Todolist/assets/137028238/5756c997-68a2-43d6-93e6-c688963b49d9)

## **Prerequisites**

List any prerequisites that users need to have installed on their system before they can run your project. This might include:

- Node.js
- npm or Yarn
- Firebase Server

## **Installation**

Provide step-by-step instructions on how to install and set up your project locally. Include code snippets and commands when necessary. For example:

```bash
bashCopy code
# Clone the repository
git clone https://github.com/yourusername/your-react-project.git

# Change directory to the project folder
cd your-react-project

#install react icon to see icon in my project
npm install react-icons --save

# Install dependencies
npm install

```

## **Usage**

Explain how to run and use your React project. Include any configuration details, environment variables, or special instructions. For example:

```bash

# Start the development server
npm start

```

## Feature

1. **Task Creation:**
    - Users can create new tasks by entering a title and description in the input fields provided.
    - When users click the "Add Task" button or press Enter, a new task is added to the list.
2. **Task Display:**
    - All tasks are displayed in a scrollable list in the main content area of the application.
    - Each task includes its title, description, creation date, and an option to mark it as completed.
3. **Task Completion:**
    - Users can mark tasks as completed by clicking the circle icon next to a task.
    - Completed tasks are visually distinguished with a strike-through style.
4. **Task Edit:**
    - Users can edit an existing task's title and description by clicking the clipboard icon (edit) next to the task.
    - Editing a task opens a form with the current task details pre-filled, allowing users to make changes.
    - Users can save the edited task by clicking the "Save" button or cancel the edit by clicking "Cancel."
5. **Task Deletion:**
    - Users can delete a task by clicking the trash icon next to the task.
    - Deleting a task removes it from the list.
6. **Task Count:**
    - The application displays the total count of tasks that are not completed.
    - It also shows the count of completed tasks.
7. **Search Functionality:**
    - Users can search for tasks by entering text in the search bar (provided by the **`Navbar`** component).
    - Tasks that match the search query (case-insensitive) are displayed, while others are filtered out.
8. **Date and Time Display:**
    - The application displays the current date and time, updating every second.
    - It provides a real-time reference to help users track when tasks were created.
9. **Styling and Theming:**
    - The application features styling and theming for a visually appealing interface.
    - Completed tasks are styled differently from active tasks.
    - Buttons and form elements have hover effects to improve user interaction.
10. **Firebase Integration:**
    - Integrates with Firebase Firestore for data storage.
    - Store and retrieve tasks from a Firebase collection.
11. **Interval Update:**
    - The application uses a **`setInterval`** function to update the current date and time every second.

# Other Relevant

To access my convention guide click link here:  [convention guide](https://nova-salsa-9b1.notion.site/Convention-Guide-863e8934ac7d4341acb5cc374e425266)

Figma: [UI design](https://www.figma.com/file/uMBTHZtXHa5Ge4LlmaLc68/TodoList?type=design&node-id=0%3A1&mode=design&t=1YpMdPER3a37c3jr-1)
