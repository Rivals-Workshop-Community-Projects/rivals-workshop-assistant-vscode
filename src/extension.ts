// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';

const chokidar = require('chokidar');
const pluginDir = __dirname
const projectDir = vscode.workspace.workspaceFolders![0].uri.fsPath
const command = `"${pluginDir}\\rivals_workshop_assistant.exe" `+ `"${projectDir}"`;

console.log('pluginDir: ' + pluginDir);
console.log('workspace directory: ' + command);
console.log('assistant command: ' + command);

function run() {
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
        run();
    });

    chokidar.watch(`${projectDir}/anims/`).on('change', (event: string, path: string) => {
        console.log(`${path} changed. Reexporting.`)
        run()
    })
}

// this method is called when your extension is deactivated
// noinspection JSUnusedGlobalSymbols
export function deactivate() {
    console.log('assistant inactive');
}
