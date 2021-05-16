import arg from 'arg';
import inquirer from 'inquirer';
import { files } from './files.js';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--yes': Boolean,
            '--css': Boolean,
            '--js': Boolean,
        },
        {
            argv: rawArgs.slice(2)
        }
    )
    return {
        name: args._[0],
        skipPrompts: args['--yes'] || false,
        css: args['--css'] || false,
        js: args['--js'] || false
    }
}

async function promptForMissingOptions(options) {
    const defaultName = 'project'
    if (options.skipPrompts) {
        return {
            ...options,
            name: options.name || defaultName
        }
    }

    const questions = [];
    if (!options.name) {
        questions.push({
            type: 'input',
            name: 'name',
            message: 'What is the name of your project',
            default: 'project'
        });
    }

    if (!options.css) {
        questions.push({
            type: 'confirm',
            name: 'css',
            message: 'Do you want css in you project',
            default: false
        });
    }

    if (!options.js) {
        questions.push({
            type: 'confirm',
            name: 'js',
            message: 'Do you want javascript in you project',
            default: false
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        name: options.name || answers.name,
        css: options.css || answers.css,
        js: options.js || answers.js    
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    files(options.name, options.css, options.js)
}