import Mustache from 'mustache';
import fs from 'fs';
import chalk from 'chalk';

export function files(name, css, js, pug, cssPre, ts) {
    try {
        const bufferHtml = fs.readFileSync(`${__dirname}\\..\\bin\\templates\\index.html.mst`);
        const htmlData = bufferHtml.toString();

        const bufferPug = fs.readFileSync(`${__dirname}\\..\\bin\\templates\\index.pug.mst`);
        const pugData = bufferPug.toString();

        const htmlView = {
            title: name,
            css: css == true ? '\n\t<link rel="stylesheet" href="styles.css">' : '',
            js: js == true ? '\n\t<script src="script.js"></script>' : ''
        }
        const pugView = {
            title: name,
            css: css == true ? '\n\t\tlink(rel="stylesheet" href="styles.css")' : '',
            js: js == true ? '\n\t\tscript(src="script.js")' : ''
        }

        const htmlCode = Mustache.render(htmlData, htmlView);
        const pugCode = Mustache.render(pugData, pugView)

        try {
            fs.mkdirSync(name)
            console.log(`${chalk.greenBright('Successfully Created Directory')} ${chalk.greenBright.bold.underline(name)}`);
        } catch (err) {
            console.error(chalk.redBright(err));
            console.log(chalk.redBright.bold('NOT DONE'));
            return
        }
        try {
            const data = fs.writeFileSync(`${name}/index.${pug === true ? 'pug' : 'html'}`, pug === true ? pugCode : htmlCode);
            console.log(`${chalk.greenBright('Successfully Created')} ${chalk.greenBright.bold.underline(`index.${pug === true ? 'pug' : 'html'}`)}`);
        } catch (err) {
            console.error(chalk.redBright(err));
            console.log(chalk.redBright.bold('NOT DONE'));
            return
        }
        switch (cssPre) {
            case 'SASS':
                try {
                    const data = fs.writeFileSync(`${name}/styles.sass`, '');
                    console.log(`${chalk.greenBright('Successfully Created')} ${chalk.greenBright.bold.underline('styles.sass')}`);
                } catch (err) {
                    console.error(chalk.red(err));
                    console.log(chalk.redBright.bold('NOT DONE'));
                    return
                }
                break;
            case 'SCSS':
                try {
                    const data = fs.writeFileSync(`${name}/styles.scss`, '');
                    console.log(`${chalk.greenBright('Successfully Created')} ${chalk.greenBright.bold.underline('styles.scss')}`);
                } catch (err) {
                    console.error(chalk.red(err));
                    console.log(chalk.redBright.bold('NOT DONE'));
                    return
                }
                break;
            default:
                try {
                    const data = fs.writeFileSync(`${name}/styles.css`, '');
                    console.log(`${chalk.greenBright('Successfully Created')} ${chalk.greenBright.bold.underline('styles.css')}`);
                } catch (err) {
                    console.error(chalk.red(err));
                    console.log(chalk.redBright.bold('NOT DONE'));
                    return
                }
                break;
        }
        try {
            const data = fs.writeFileSync(`${name}/script.${ts === true ? 'ts' : 'js'}`, '');
            console.log(`${chalk.greenBright('Successfully Created')} ${chalk.greenBright.bold.underline(`script.${ts === true ? 'ts' : 'js'}`)}`);
        } catch (err) {
            console.error(chalk.redBright(err));
            console.log(chalk.redBright.bold('NOT DONE'));
            return
        }
        console.log(chalk.greenBright.bold('DONE'));
    } catch (err) {
        console.error(chalk.redBright(err));
        console.log(chalk.redBright.bold('NOT DONE'));
        return
    }
}