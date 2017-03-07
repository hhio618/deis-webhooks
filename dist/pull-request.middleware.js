"use strict";
const app_manager_class_1 = require("./app-manager.class");
function pullRequestMiddleware(req, res, next) {
    const pr = req.body;
    const appManager = new app_manager_class_1.AppManager(pr.repository);
    const fromApp = appManager.getAppName(pr.branch_from, pr.id);
    let process;
    appManager.validate(fromApp);
    console.log(`-- Pull Request #${pr.id}: ${pr.action} --`);
    switch (pr.action) {
        case 'OPENED':
        case 'REOPENED':
            console.log(`Create app: ${fromApp}`);
            process = appManager.create(fromApp, pr.branch_from, {
                PIPELINE: pr.repository,
                PIPELINE_TRACK: 'review',
                BRANCH_FROM: pr.branch_from,
                BRANCH_TO: pr.branch_to,
            });
            break;
        case 'DECLINED':
            console.log(`Destroy app: ${fromApp}`);
            process = appManager.destroy(fromApp);
            break;
        case 'MERGED':
            const toApp = appManager.getAppName(pr.branch_to, pr.id);
            console.log(`Destroy app: ${fromApp}`);
            process = appManager.destroy(fromApp);
            console.log(`Build app: ${toApp}`);
            process = appManager.build(toApp, pr.branch_to);
            break;
        case 'UPDATED':
        case 'RESCOPED_FROM':
            console.log(`Build app: ${fromApp}`);
            process = appManager.build(fromApp, pr.branch_from);
            break;
    }
    res.send(process);
    next();
}
exports.pullRequestMiddleware = pullRequestMiddleware;
