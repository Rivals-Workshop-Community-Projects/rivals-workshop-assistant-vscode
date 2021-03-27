// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('rivals-lib active');

	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		inject();
	});


    let disposable = vscode.commands.registerCommand('rivals-lib.lib-inject', () => {
		inject();
    });

    context.subscriptions.push(disposable);
}



function inject(){
	// vscode.window.showInformationMessage('Before inject');
	// var command = `${vscode.workspace.rootPath}\\rivals_code_inject.exe`;
	var command = __dirname
		+ `\\rivals_workshop_assistant.exe `
		+ vscode.workspace.workspaceFolders![0].uri.fsPath;
	// var command = `chdir`;

	// cwd: `${vscode.workspace.rootPath}`
	var workingDirectory = __dirname;
	console.log('working directory: ' + workingDirectory);
	console.log(command);
	

	// child_process.execFile(command, {shell:true, cwd:workingDirectory}, (err, stdout, stderr) => {
	child_process.execFile(command, [workingDirectory], {shell:true}, (err, stdout, stderr) => {
		if (err) {
			console.log(err);
			vscode.window.showInformationMessage('Rivals-lib error. Check dev console or log in extension folder.');
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		// vscode.window.showInformationMessage('Inject successful.');
	});
}















// export function activate(context: vscode.ExtensionContext): void {

// 	var extension = new RunOnSaveExtension(context);

// 	vscode.workspace.onDidChangeConfiguration(() => {
// 		let disposeStatus = extension.showStatusMessage('Run On Save: Reloading config.');
// 		extension.loadConfig();
// 		disposeStatus.dispose();
// 	});

// 	vscode.commands.registerCommand('extension.emeraldwalk.enableRunOnSave', () => {
// 		extension.isEnabled = true;
// 	});

// 	vscode.commands.registerCommand('extension.emeraldwalk.disableRunOnSave', () => {
// 		extension.isEnabled = false;
// 	});

// 	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
// 		extension.runCommands(document);
// 	});
// }



















// this method is called when your extension is deactivated
export function deactivate() {
    console.log('rivals-lib inactive');
}
