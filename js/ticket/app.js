// Provide module namespace
core.provide("ticket.App");
core.provide("ticket.module.GetProjects");
core.provide("ticket.module.GetTasks");
core.provide("ticket.widget.LogPanel");

// Require files for ticket.App class
core.require(

    // List of files
    'js/jquery/jquery.js',
    'js/jquery/ui/jquery.ui.js',
    'js/jquery/plugins/jquery.mousewheel.js',
    'js/jquery/plugins/jquery.scrollpane.js',
    'js/jquery/plugins/bfm/jquery.select.js',
    'js/ticket/module/getprojects.js',
    'js/ticket/module/gettasks.js',
    'js/ticket/widget/logpanel.js',

    // Initialiaze callback function without files load
    function() {

            /**
             * Class ticket.App.GetTasks
             * @constructor
             */
            ticket.App = function() {
                this.APP_PATH = "api/";
                $('.b-log-time').bind('click', function(__event){
                    ticket.widget.LogPanel.CLASS.build(__event);
                    return false;
                });
            }


            ticket.App.prototype.getProjectsData = function(__callback) {
                $.ajax({ url: this.APP_PATH+'projects.json', dataType: 'json', success: __callback });
            }

            ticket.App.prototype.getTasksDataByProjectsID = function(__id, __callback) {
                $.ajax({ url: this.APP_PATH+'tickets.json', dataType: 'json', data: {'id':__id}, success: __callback });
            }

            // Initialiaze instance of ticket.App.GetTasks class
            ticket.App.CLASS = new ticket.App;

            // Initialiaze instance of ticket.module.GetProjects class
            ticket.module.GetProjects.CLASS = new ticket.module.GetProjects;
            ticket.module.GetProjects.CLASS.init();

            // Initialiaze instance of ticket.module.GetTasks class
            ticket.module.GetTasks.CLASS = new ticket.module.GetTasks;
            ticket.module.GetTasks.CLASS.init();

            // Initialiaze instance of ticket.widget.LogPanel class
            ticket.widget.LogPanel.CLASS = new ticket.widget.LogPanel;

    }
);