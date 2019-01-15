console.log('Starting app.js');

// Module includes
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// My includes
const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
            describe: 'Body of note',
            demand: true,
            alias: 'b'
};

const argv = yargs
    .command('add','Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
    
var command = argv._[0];
console.log('Command: ', command);
// console.log('Process: ', process.argv);
console.log('Yargs', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note Created');
        console.log('Note Found');
        notes.logNote(note);
    }
    else {
        console.log('ERROR: A note with that title already exists!\n');
    }
}
else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
}
else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note Found');
        notes.logNote(note);
    }
    else {
        console.log(`ERROR: Could not find note title: ${argv.title}`);
    }
}
else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    if (noteRemoved) {
        console.log(`Removed note with title: ${argv.title}`);
    }
    else {
        console.log(`ERROR: No note found with title: ${argv.title}`);
    }
}
else {
    console.log('Command not recognized');
}
