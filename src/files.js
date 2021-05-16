import Mustache from 'mustache';
import fs from 'fs';
import chalk from 'chalk';

export function files(name, css, js) {
    try {
        const bufferStr = fs.readFileSync(`${__dirname}\\..\\bin\\templates\\index.html.mst`);
        const data = bufferStr.toString();

        const view = {
            title: name,
            css: css == true ? '\n\t<link rel="stylesheet" href="styles.css">' : '',
            js: js == true ? '\n\t<script src="script.js"></script>' : ''
        }

        const output = Mustache.render(data, view);

        try {
            fs.mkdirSync(name)
            console.log(`${chalk.greenBright('Successfully Created Directory')} ${chalk.greenBright.bold.underline(name)}`);
        } catch (err) {
            console.error(chalk.redBright(err));
            console.log(chalk.redBright.bold('NOT DONE'));
            return;
        }
        try {
            const data = fs.writeFileSync(`${name}/index.html`, output);
            console.log(`${chalk.greenBright('Successfully Created')} ${chalk.greenBright.bold.underline('index.html')}`);
        } catch (err) {
            console.error(chalk.redBright(err));
            console.log(chalk.redBright.bold('NOT DONE'));
            return;
        }
        if (css === true) {
            try {
                const data = fs.writeFileSync(`${name}/styles.css`, '');
                console.log(`${chalk.greenBright('Successfully Created')} ${chalk.greenBright.bold.underline('styles.css')}`);
            } catch (err) {
                console.error(chalk.red(err));
                console.log(chalk.redBright.bold('NOT DONE'));
                return;
            }
        } if (js === true) {
            try {
                const data = fs.writeFileSync(`${name}/script.js`, '');
                console.log(`${chalk.greenBright('Successfully Created')} ${chalk.greenBright.bold.underline('script.js')}`);
            } catch (err) {
                console.error(chalk.redBright(err));
                console.log(chalk.redBright.bold('NOT DONE'));
                return;
            }
        }
        console.log(chalk.greenBright.bold('DONE'));
    } catch (err) {
        console.error(chalk.redBright(err));
    }
}