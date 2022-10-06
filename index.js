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
// Lesson: 349
//
// nodejs.org/api 
// node --inspect-brk <prjctNm>
// 
// chmod +x index.js
// clear && ls -ltr
// npm init -y
// sudo npm link
// 
// npm i chalk@4.1.2
//
//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
// NOTES: 
//------------------------------------------------------------------------------
// 
//
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/

const program   = require('caporal'); 
const chalk     = require('chalk');
const { spawn } = require('child_process');
const chokidar  = require('chokidar'); 
const fs        = require('fs');
const debounce  = require('lodash.debounce');

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
    .action(async ({ filename}) => {
        // console.log(args);

        const name = filename || 'index.js';

        try {
            await fs.promises.access(name);
        } catch (err) {
            throw new Error(chalk.red(`ERROR: Could not the file ${name}`));
        }

        let proc; 
        const start = debounce(() => {
            // console.log('Starting users program.');
            if (proc) {
                proc.kill();
            }
            console.log(chalk.green('>>>>> Starting process...'));
            console.log(chalk.yellow('Use CRTL-C to stop process.'));
            proc = spawn('node', [name], { stdio: 'inherit' });
        }, 100);
        
        chokidar 
            .watch('.')
            .on('add',    start)
            .on('change', start)
            .on('unlink', start);
    });

program.parse(process.argv);


