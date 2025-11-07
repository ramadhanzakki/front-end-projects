const inputList = document.querySelector('#input')
const submitBtn = document.querySelector('#btn')
const list = document.querySelector('.task-child')
const darkMode = document.querySelector('#dark')

submitBtn.addEventListener('click', function createNewList(event) {
    event.preventDefault();
    
    const inputResult = inputList.value.trim()
    console.log(inputResult)

    if (inputResult !== '') {
        const createTaskList = `
            <div class="task-list">
                <div class="task">
                    <p>${inputResult}</p>
                </div>
                <div class="delete">
                    <button class="delete-btn">Hapus</button>
                </div>
            </div>
        `

        list.insertAdjacentHTML('afterbegin',createTaskList)

        inputList.value = ''
    }
})

darkMode.addEventListener('click', () => {
    const body = document.body
    const logos = document.querySelector('#logo')
    body.classList.toggle('dark-mode')
    if (body.classList.contains('dark-mode')) {
        logos.textContent = 'light_mode'
    } else {
        logos.textContent = 'dark_mode'
    }
})

list.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const deleteList = event.target.parentElement.parentElement
        deleteList.remove()
    }
})