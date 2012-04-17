// Provide module namespace
core.provide("ticket.module.GetProjects")

// Require files for ticket.module.GetProjects class
core.require(

    // List of files
    'js/jquery/jquery.js',
    'js/jquery/plugins/jquery.mousewheel.js',
    'js/jquery/plugins/jquery.scrollpane.js',
    'js/jquery/plugins/bfm/jquery.select.js',

    // Initialiaze callback function without files load
    function() {

        /**
         * Class ticket.module.GetProjects
         * @constructor
         */
        ticket.module.GetProjects = function() {

            // Manipulation with container
            this.container = $('div[data-core-module="ticket.module.GetProjects"]');

            // Init getAllProjects
            this.getAllProjects();

        }

        /**
         * getAllProjects
         */
        ticket.module.GetProjects.prototype.getAllProjects = function() {
            $.getJSON(APP_PATH+'projects.json', $.proxy(this, 'onGetAllProjects'))
        }

        /**
         * getAllProjects
         */
        ticket.module.GetProjects.prototype.onGetAllProjects = function(__data) {

            this.container.removeClass('hidden');
            //console.log(__data)
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

        // Initialiaze instance of ticket.module.GetProjects class
        new ticket.module.GetProjects;
    }
);