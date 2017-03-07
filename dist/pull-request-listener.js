"use strict";
var app_manager_class_1 = require("./app-manager.class");
function pullRequestListener(req, res, next) {
    var pr = req.body;
    var appManager = new app_manager_class_1.AppManager(pr.repository);
    var fromApp = appManager.getAppName(pr.branch_from, pr.id);
    var toApp = appManager.getAppName(pr.branch_to, pr.id);
    var process;
    console.log("-- Pull Request #" + pr.id + ": " + pr.action + " --");
    switch (pr.action) {
        case 'OPENED':
        case 'REOPENED':
            console.log("Create app: " + fromApp);
            process = appManager.create(fromApp, pr.branch_from);
            break;
        case 'DECLINED':
            console.log("Destroy app: " + fromApp);
            process = appManager.destroy(fromApp);
            break;
        case 'MERGED':
            console.log("Destroy app: " + fromApp);
            process = appManager.destroy(fromApp);
            console.log("Rebuild app: " + toApp);
            process = appManager.rebuild(toApp, pr.branch_to);
            break;
        case 'UPDATED':
        case 'RESCOPED_FROM':
            console.log("Rebuild app: " + fromApp);
            process = appManager.rebuild(fromApp, pr.branch_from);
            break;
    }
    res.send(process);
    next();
}
exports.pullRequestListener = pullRequestListener;
