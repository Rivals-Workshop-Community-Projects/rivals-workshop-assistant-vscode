"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const child_process = require("child_process");
const chokidar = require('chokidar');
const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
const command = __dirname + `\\rivals_workshop_assistant.exe ` + workspacePath;
const workingDirectory = __dirname;
console.log('working directory: ' + workingDirectory);
console.log('workspace directory: ' + command);
console.log('command: ' + command);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Assistant active');
    vscode.workspace.onDidSaveTextDocument((document) => {
        run();
    });
    let disposable = vscode.commands.registerCommand('rivals-workshop-assistant.run', () => {
        run();
    });
    context.subscriptions.push(disposable);
    // TODO consider using chokidar https://github.com/paulmillr/chokidar
    chokidar.watch(`${workspacePath}/anims/`).on('change', (event, path) => {
        console.log(`${path} changed. Reexporting.`);
        run();
    });
}
exports.activate = activate;
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
function deactivate() {
    console.log('assistant inactive');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map