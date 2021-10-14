// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';

const chokidar = require('chokidar');
const pluginDir = __dirname
const projectDir = vscode.workspace.workspaceFolders![0].uri.fsPath

// const ALL_MODE = "all";
const ANIMS_MODE = "anims";
const SCRIPTS_MODE = "scripts";

console.log('pluginDir: ' + pluginDir);
console.log('projectDir: ', + projectDir);

function runAssistant(mode: string) {
    const command = `"${pluginDir}\\rivals_workshop_assistant.exe" ` + `"${projectDir}" ` + mode;
    console.log("Running Assistant Command: ", command)
    child_process.execFile(command, [pluginDir], { shell: true }, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            vscode.window.showInformationMessage('Assistant error. Check dev console or log in extension folder.');
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

// called when extension is activated
export function activate(context: vscode.ExtensionContext) {
    console.log('Assistant activated');

    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        console.log(`File saved. Reexporting.`)
        runAssistant(SCRIPTS_MODE);
    });

    chokidar.watch(`${projectDir}/anims/`).on('change', (event: string, path: string) => {
        console.log(`${path} changed. Reexporting.`)
        runAssistant(ANIMS_MODE)
    })
}

// this method is called when your extension is deactivated
// noinspection JSUnusedGlobalSymbols
export function deactivate() {
    console.log('assistant inactive');
}
