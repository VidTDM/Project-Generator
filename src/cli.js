import arg from 'arg';
import inquirer from 'inquirer';
import { files } from './files.js';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--none': Boolean,
            '--all': Boolean,
            '-n': Boolean,
            '-a': Boolean
        },
        {
            argv: rawArgs.slice(2)
        }
    )
    return {
        name: args._[0],
        skipPrompts: args['-none'] || args['-n'] ||false,
        all: args['--all'] || args['-a'] || false,
    }
}

async function promptForMissingOptions(options) {
    const defaultName = 'project';
    if (options.skipPrompts) {
        return {
            ...options,
            name: options.name || defaultName
        }
    } if (options.all) {
        return {
            css: true,
            js: true,
            name: options.name || defaultName
        }
    }

    const questionsNormal = [];
    if (!options.name) {
        questionsNormal.push({
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            default: 'project'
        });
    }

    questionsNormal.push({
        type: 'confirm',
        name: 'css',
        message: 'Do you want CSS in you project?',
        default: false
    });

    questionsNormal.push({
        type: 'confirm',
        name: 'js',
        message: 'Do you want Javascript in you project?',
        default: false
    });

    questionsNormal.push({
        type: 'confirm',
        name: 'preproccesors',
        message: 'Do you want Preproccesors in your project?',
        default: false
    });

    const answersNormal = await inquirer.prompt(questionsNormal);

    const questionsPre = [];
    if (answersNormal.preproccesors) {
        questionsPre.push({
            type: 'confirm',
            name: 'pug',
            message: 'Do you want Pug(Jade) in your project?',
            default: false
        });

        if (answersNormal.css) {
            questionsPre.push({
                type: 'list',
                name: 'cssPre',
                message: 'Do you want Sass or Scss in your project',
                choices: [
                    'SCSS',
                    'SASS',
                    'None'
                ]
            });
        }

        if (answersNormal.js) {
            questionsPre.push({
                type: 'confirm',
                name: 'ts',
                message: 'Do you want Typescript in your project',
                default: true
            });
        }
    }

    const answersPre = await inquirer.prompt(questionsPre);
    return {
        ...options,
        name: options.name || answersNormal.name,
        css: answersNormal.css,
        js: answersNormal.js,
        pug: answersPre.pug || false,
        cssPre: answersPre.cssPre || false,
        ts: answersPre.ts || false,
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    files(options.name, options.css, options.js, options.pug, options.cssPre, options.ts);
}