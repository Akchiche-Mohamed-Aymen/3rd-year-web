const todolist = document.getElementById('todo-list')
const user =JSON.parse(localStorage.getItem('user'))
const addBtn = document.querySelector('.add')
const newTodoInput = document.querySelector('input')
addBtn.onclick = ()=>alert(5)
newTodoInput.onchange = ()=>{
    const text = newTodoInput.value
    console.log(text)
    if(text.length > 0){
        addBtn.disabled = false
        addBtn.style.background = ''
  }
  else{
    addBtn.disabled = true
        addBtn.style.background = 'gray'
  }

}
addBtn.disabled = true
addBtn.style.background = 'gray'
addBtn.onclick = ()=>alert(5)
document.getElementById('user-name').innerHTML = user.username
const titles = ['abc' , 'cdv']
function buildUI(){
    for(let i = 0 ; i < 2 ; i++){
        const todo = `<div class="todo-item p-4  flex items-center" id=${i}>
        <label class="custom-checkbox flex items-center">
            <input type="checkbox" class="todo-checkbox" onclick = 'update(${i})'>
            <div class="checkmark"></div>
        </label>
        <span class="todo-text ml-3 flex-1">${titles[i]}</span>
        <div class="flex space-x-2">
            <button class="edit-todo-btn w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary">
                <i class="ri-pencil-line"></i>
            </button>
            <button class="delete-todo-btn w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500">
                <i class="ri-delete-bin-line"></i>
            </button>
        </div>
    </div>
    `
    todolist.innerHTML+= todo
    
    }
}


function update(id) {
    const todo = document.getElementById(`${id}`)
    console.log(todo)
}