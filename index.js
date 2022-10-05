#!/usr/bin/env node

//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
//                        Classification: UNCLASSIFIED
//==============================================================================
//                Copyright, Belford DBA Consulting, LLC, 2022
//                      Unpublished, All Rights Reserved
//==============================================================================
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/
//
// Section 25: Create Your Own Project Runner
// Lesson: 341
//
// nodejs.org/api 
// node --inspect-brk <prjctNm>
// 
// chmod +x index.js
// clear && ls -ltr
// npm init -y
// sudo npm link
//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
// NOTES: 
//------------------------------------------------------------------------------
// 
//
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/

const program  = require('caporal'); 
const chokidar = require('chokidar'); 
const debounce = require('lodash.debounce');

const prjctNm = "WatchIt"
const debug   = 1;    // 0: Off   1: On
const err     = 0; 

if (debug > 0) {
    console.log('DEBUG: Hi there from ' + prjctNm + '!');

    if (err) {
        if (debug > 0) {
            console.log('ERROR: ' + err);
            // throw new Error(err);
        };
    };
};

program
    .version('0.0.1')
    .argument('[filename]', 'Name of the file to execute.')
    .action((args) => {
        console.log(args);
    });

program.parse(process.argv);


/* const start = debounce(() => {
    console.log('Starting users program.');
}, 100);

chokidar 
    .watch('.')
    .on('add', start)
    .on('change', () => console.log('File Changed'))
    .on('unlink', () => console.log('File Unlinked')); */


