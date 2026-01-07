let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
  students.push({ name: name.value, course: course.value });
  localStorage.setItem("students", JSON.stringify(students));
  name.value = course.value = "";
  renderStudents();
}

function renderStudents() {
  let table = document.getElementById("studentTable");
  let search = document.getElementById("search").value.toLowerCase();
  table.innerHTML = "";

  students.filter(s => s.name.toLowerCase().includes(search))
    .forEach((s, i) => {
      table.innerHTML += `
        <tr>
          <td>${s.name}</td>
          <td>${s.course}</td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteStudent(${i})">Delete</button></td>
        </tr>`;
    });

  document.getElementById("totalStudents").innerText = students.length;
}

function deleteStudent(i) {
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function chart() {
  new Chart(document.getElementById("studentChart"), {
    type: "bar",
    data: {
      labels: ["Students"],
      datasets: [{
        label: "Count",
        data: [students.length],
        backgroundColor: "#eb25a9ff"
      }]
    }
  });
}

renderStudents();
chart();
