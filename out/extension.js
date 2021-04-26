"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const child_process = require("child_process");
const chokidar = require('chokidar');
const pluginDir = __dirname;
const projectDir = vscode.workspace.workspaceFolders[0].uri.fsPath;
const command = `"${pluginDir}\\rivals_workshop_assistant.exe" ` + `"${projectDir}"`;
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
function activate(context) {
    console.log('Assistant activated');
    vscode.workspace.onDidSaveTextDocument((document) => {
        run();
    });
    chokidar.watch(`${projectDir}/anims/`).on('change', (event, path) => {
        console.log(`${path} changed. Reexporting.`);
        run();
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
// noinspection JSUnusedGlobalSymbols
function deactivate() {
    console.log('assistant inactive');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map