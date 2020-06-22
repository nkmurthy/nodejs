const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    const notes = listNotes()
    console.log(chalk.inverse('Your Notes!'))
    notes.forEach(note => {
        console.log(note.title)
    })
}

const addNote = (title, body) => {
    const notes = listNotes()
    //const duplicateNotes = notes.filter(note => note.title === title)
    const duplicateNote = notes.find(note => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note added!"))

    } else {
        console.log(chalk.red.inverse("Note already taken!"))
    }

}

const readNote = (title) => {
    const notes = listNotes()
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const listNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }

}

const removeNote = (title) => {
    const notes = listNotes()
    const notesToKeep = notes.filter(note => note.title !== title)
    if (notesToKeep.length < notes.length) {
        console.log(chalk.green.inverse("Note Removed!"))
    } else {
        console.log(chalk.red.inverse("No Note found!"))
    }
    saveNotes(notesToKeep)

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    readNote: readNote,
    removeNote: removeNote
}