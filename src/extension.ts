// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';

const chokidar = require('chokidar');

const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath
const command = __dirname+ `\\rivals_workshop_assistant.exe `+ workspacePath;
const workingDirectory = __dirname;

console.log('working directory: ' + workingDirectory);
console.log('workspace directory: ' + command);
console.log('command: ' + command);


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Assistant active');

    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        run();
    });

    let disposable = vscode.commands.registerCommand('rivals-workshop-assistant.run', () => {
        run();
    });

    context.subscriptions.push(disposable);

    // TODO consider using chokidar https://github.com/paulmillr/chokidar
    chokidar.watch(`${workspacePath}/anims/`).on('change', (event: string, path: string) => {
        console.log(`${path} changed. Reexporting.`)
        run()
    })
}

function run() {

    child_process.execFile(command, [workingDirectory], { shell: true }, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            vscode.window.showInformationMessage('Assistant error. Check dev console or log in extension folder.');
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}


// this method is called when your extension is deactivated
// noinspection JSUnusedGlobalSymbols
export function deactivate() {
    console.log('assistant inactive');
}
