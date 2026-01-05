// Dodaj zadatak
const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");

document.getElementById("addTaskBtn").addEventListener("click", () => {
    modal.style.display = "block";
    taskInput.value = "";
    taskInput.focus();
});

// Handle modal buttons
document.getElementById("modalAdd").addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return;

    const task = createTask(text);
    document.querySelector('[data-status="todo"] .taskList').appendChild(task);

    modal.style.display = "none";
});

document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
});


// Kreiraj novi zadatak
function createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;

    task.draggable = true;

    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });

    return task;
}

// Handle Drag & Drop
document.querySelectorAll(".taskList").forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        list.appendChild(dragging);
    });
});

// Ocisti plocu
const clearModal = document.getElementById("clearModal");

document.getElementById("ClearBoardBtn").addEventListener("click", () => {
    clearModal.style.display = "block";
});

// â€śDA - Ocisti plocuâ€ť button
document.getElementById("ClearYes").addEventListener("click", () => {
    document.querySelectorAll(".taskList").forEach(list => list.innerHTML = "");
    clearModal.style.display = "none";
});

// â€śNE â€“ Cancelâ€ť button
document.getElementById("clearNo").addEventListener("click", () => {
    clearModal.style.display = "none";
});

// Zatvori van modala
window.addEventListener("click", e => {
    if (e.target === clearModal) {
        clearModal.style.display = "none";
    }
});

// Snimi plocu kao PNG
document.getElementById("saveBoardBtn").addEventListener("click", () => {
    html2canvas(document.body).then(canvas => {
        const link = document.createElement("a");
        link.download = "kanban_board.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Ucitaj html2canvas dynamically

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});