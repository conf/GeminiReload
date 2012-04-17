// Provide module namespace
core.provide("ticket.module.GetTasks")

// Require files for ticket.module.GetTasks class
core.require(

    // List of files
    'js/jquery/jquery.js',
    'js/jquery/plugins/jquery.mousewheel.js',
    'js/jquery/plugins/jquery.scrollpane.js',
    'js/jquery/plugins/bfm/jquery.select.js',

    // Initialiaze callback function without files load
    function() {

        /**
         * Class ticket.module.GetTasks
         * @constructor
         */
        ticket.module.GetTasks = function() {

            // Manipulation with container
            this.container = $('div[data-core-module="ticket.module.GetTasks"]');

            // Initialiaze UISelect plugin
            this.container.find('select').UISelect(
                {
                    jScrollPane: {
                        initialize : true,
                        options : { showArrows: false }
                    },
                    appendToBody : true
                }
            );
        }

        // Initialiaze instance of ticket.module.GetTasks class
        new ticket.module.GetTasks;
    }
);