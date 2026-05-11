/**
 * ServiceNow Source Control Diagnostic Script
 * Run this in ServiceNow Scripts - Background to diagnose Git integration issues
 */

// Check source control links
var gr = new GlideRecord('vcs_repo_links');
gr.query();

gs.print('=== SOURCE CONTROL LINKS ===');
if (gr.hasNext()) {
    while (gr.next()) {
        gs.print('Name: ' + gr.name);
        gs.print('URL: ' + gr.url);
        gs.print('Branch: ' + gr.branch);
        gs.print('Application: ' + gr.application);
        gs.print('---');
    }
} else {
    gs.print('No source control links found!');
}

// Check recent commits
var gr2 = new GlideRecord('vcs_commit');
gr2.orderByDesc('sys_created_on');
gr2.setLimit(10);
gr2.query();

gs.print('\n=== RECENT COMMITS ===');
if (gr2.hasNext()) {
    while (gr2.next()) {
        gs.print('Commit: ' + gr2.commit_id);
        gs.print('Message: ' + gr2.message);
        gs.print('Created: ' + gr2.sys_created_on);
        gs.print('---');
    }
} else {
    gs.print('No commits found!');
}

// Check for errors
var gr3 = new GlideRecord('sys_log');
gr3.addQuery('source', 'STARTS WITH', 'vcs');
gr3.orderByDesc('sys_created_on');
gr3.setLimit(5);
gr3.query();

gs.print('\n=== RECENT VCS ERRORS ===');
if (gr3.hasNext()) {
    while (gr3.next()) {
        gs.print('Time: ' + gr3.sys_created_on);
        gs.print('Level: ' + gr3.level);
        gs.print('Message: ' + gr3.message);
        gs.print('---');
    }
} else {
    gs.print('No VCS errors found');
}

gs.print('\n=== DIAGNOSTIC COMPLETE ===');
