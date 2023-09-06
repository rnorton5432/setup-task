const core = require('@actions/core');
const tc = require('@actions/tool-cache');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const taskVersion = core.getInput('task-version');
        const taskDlPath = await tc.downloadTool(`https://github.com/go-task/task/releases/download/${taskVersion}/task_linux_amd64.tar.gz`);
        const extractedFolder = await tc.extractTar(taskDlPath);

        const cachedPath = await tc.cacheDir(extractedFolder, "task", taskVersion);
        core.addPath(cachedPath);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
    .catch(console.error);
