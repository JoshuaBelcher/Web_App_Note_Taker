import { initializeEditPage, lastEdited } from './views'
import { updateNote, removeNote } from './notes'

const titleElement = document.querySelector('#note-title')
const updateElement = document.querySelector('#note-update')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const noteID = location.hash.substring(1)

initializeEditPage(noteID)


//change and save title/body/update values
titleElement.addEventListener('input',(e) => {
    const note = updateNote(noteID, {
        title: e.target.value
    })
    updateElement.textContent = lastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteID, {
        body: e.target.value
    })
    updateElement.textContent = lastEdited(note.updatedAt)
})

//setup the remove note button
removeElement.addEventListener('click', (e) => {
    removeNote(noteID)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteID)
    }
})