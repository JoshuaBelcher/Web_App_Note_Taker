import moment from 'moment'
import { getFilters } from './filters'
import {sortNotes, getNotes} from './notes'

// Generate the DOM structure for a note

const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    //setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //Setup the status message
    statusEl.textContent = lastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    

    return noteEl
}

//render application notes
const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter ((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }                      
}

const initializeEditPage = (noteID) => {
    const titleElement = document.querySelector('#note-title')
    const updateElement = document.querySelector('#note-update')
    const bodyElement = document.querySelector('#note-body')
    const notes = getNotes()
    const note = notes.find((note) => note.id === noteID)

    if (!note) {
        location.assign('/index.html')
    }

    //pull existing title/body/update values
    titleElement.value = note.title
    updateElement.textContent = lastEdited(note.updatedAt)
    bodyElement.value = note.body
}

// last updated function

const lastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateNoteDOM, renderNotes, lastEdited, initializeEditPage }