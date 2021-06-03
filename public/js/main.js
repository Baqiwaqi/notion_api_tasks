const taskElement = document.querySelector("#tasks");
const loadingElement = document.querySelector("#loading");

let loading = false;

const getTasksFromBackend = async () => {
  loading = true;
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();
  loading = false;
  return data;
};

const addTasksToDom = async () => {
  const tasks = await getTasksFromBackend();
  console.log(tasks);
  if (!loading) {
    loadingElement.innerHTML = "";
  }
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
        <h3>${task.title}<h3>
        <ul>
            <li><strong>Status: </strong>${task.status}</li>
            <li><strong>Property: </strong>${task.property}</li>
        </ul>
        <div class="tags">${task.status}</div>
        `;
    taskElement.appendChild(div);
  });
};

addTasksToDom();
