const yargs = require('yargs')
const notes = require("./notes.js")
const validator = require('validator')


yargs.version('2.0.0')



yargs.command({
    command: 'ADD',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: 'true',
            type: 'string'
        }, body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    describe: 'Add a new Note',
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
});



yargs.command({
    command: 'REMOVE',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove the Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
});

yargs.command({
    command: 'LIST',
    describe: 'List all Notes',
    handler() {
         notes.getNotes()
    }
});

yargs.command({
    command: 'READ',
    describe: 'Read the Note',
    builder: {
        title: {
            describe: 'Read the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
});
yargs.parse();
