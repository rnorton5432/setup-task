const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function run() {
    try {
        const taskVersion = core.getInput('task-version');
        const dlUrl = `https://github.com/go-task/task/releases/download/v${taskVersion}/task_linux_amd64.tar.gz`;

        core.info(`Downloading go-task/task version ${taskVersion} from ${dlUrl}`)
        const taskDlPath = await tc.downloadTool(dlUrl);

        const extractedFolder = await tc.extractTar(taskDlPath);
        core.debug(`Extracted go-task/task to ${extractedFolder}`);

        const cachedPath = await tc.cacheDir(extractedFolder, "task", taskVersion);
        core.debug(`cache-path ${cachedPath}`);
        core.addPath(cachedPath);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
    .catch(console.error);
