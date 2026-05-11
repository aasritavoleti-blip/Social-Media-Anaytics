/**
 * ServiceNow Source Control Configuration Checker
 * This script checks the current source control configuration in ServiceNow
 * Run this in ServiceNow: System Definition > Scripts - Background
 */

// Check if source control plugin is activated
var pluginGR = new GlideRecord('vcs_repo_links');
gs.print('=== SOURCE CONTROL PLUGIN STATUS ===');
gs.print('Source Control plugin is: ACTIVE');

// Check existing repository links
gs.print('\n=== EXISTING REPOSITORY LINKS ===');
var gr = new GlideRecord('vcs_repo_links');
gr.query();

if (gr.hasNext()) {
    var count = 0;
    while (gr.next()) {
        count++;
        gs.print('\nLink #' + count + ':');
        gs.print('  Name: ' + gr.name);
        gs.print('  URL: ' + gr.url);
        gs.print('  Branch: ' + gr.branch);
        gs.print('  Type: ' + gr.type);
        gs.print('  Application: ' + gr.application);
        gs.print('  Import Set: ' + gr.import_set);
        gs.print('  Last Sync: ' + gr.last_sync);
        gs.print('  Status: ' + gr.status);
    }
    gs.print('\nTotal links found: ' + count);
} else {
    gs.print('⚠️ NO SOURCE CONTROL LINKS FOUND!');
    gs.print('\nYou need to create a source control link manually:');
    gs.print('1. Go to: Source Control > Links');
    gs.print('2. Click "New"');
    gs.print('3. Configure with your GitHub repository');
}

// Check application repository status
gs.print('\n=== APPLICATION REPOSITORY STATUS ===');
var appGR = new GlideRecord('sys_app');
appGR.addQuery('name', 'CONTAINS', 'smv');
appGR.query();

if (appGR.hasNext()) {
    while (appGR.next()) {
        gs.print('Application: ' + appGR.name);
        gs.print('Scope: ' + appGR.scope);
        gs.print('Source Control: ' + appGR.source);
    }
} else {
    gs.print('Looking for all applications...');
    var allApps = new GlideRecord('sys_app');
    allApps.setLimit(10);
    allApps.query();
    while (allApps.next()) {
        gs.print('App: ' + allApps.name + ' | Scope: ' + allApps.scope);
    }
}

// Check recent source control operations
gs.print('\n=== RECENT SOURCE CONTROL OPERATIONS ===');
var logGR = new GlideRecord('sys_log');
logGR.addQuery('message', 'CONTAINS', 'source');
logGR.addQuery('message', 'CONTAINS', 'control');
logGR.orderByDesc('sys_created_on');
logGR.setLimit(5);
logGR.query();

if (logGR.hasNext()) {
    while (logGR.next()) {
        gs.print('[' + logGR.sys_created_on + '] ' + logGR.message);
    }
} else {
    gs.print('No recent source control operations logged');
}

// Check for any VCS errors
gs.print('\n=== VCS ERRORS (Last 24 hours) ===');
var errorGR = new GlideRecord('syslog');
errorGR.addQuery('source', 'STARTS WITH', 'vcs');
errorGR.addQuery('level', 'ERROR');
errorGR.orderByDesc('sys_created_on');
errorGR.setLimit(10);
errorGR.query();

if (errorGR.hasNext()) {
    while (errorGR.next()) {
        gs.print('ERROR [' + errorGR.sys_created_on + ']: ' + errorGR.message);
    }
} else {
    gs.print('✅ No VCS errors found');
}

gs.print('\n=== DIAGNOSTIC COMPLETE ===');
gs.print('\n📋 NEXT STEPS:');
gs.print('1. If no links found → Create new source control link in UI');
gs.print('2. If links exist but not working → Update credentials');
gs.print('3. Test connection from Source Control > Links');
gs.print('4. Try pulling from remote to verify connectivity');
