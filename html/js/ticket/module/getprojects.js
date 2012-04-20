/**
 * Class ticket.module.GetProjects
 * @constructor
 */
ticket.module.GetProjects = function () {

    // Manipulation with container
    this.container = $('div[data-item-module="ticket.module.GetProjects"]');
    this.select = this.container.find('select');
    this.loader = this.container.find('.b-icon_type_loading');

}

/**
 * Class ticket.module.GetProjects
 * @constructor
 */
ticket.module.GetProjects.prototype.init = function () {
    this.initUISelect();
    this.showLoader();
    this.select.change($.proxy(this, 'onUISelectChange'))
    ticket.App.CLASS.getProjectsData($.proxy(this, 'buildUISelect'));
}

/**
 * buildUISelect
 */
ticket.module.GetProjects.prototype.buildUISelect = function (data) {
    this.clearOptionFormUISelect();
    $.each(data, $.proxy(this, 'updateUISelect'));
    this.initUISelect();
    this.onUISelectChange();
}

/**
 * updateUISelect
 */
ticket.module.GetProjects.prototype.updateUISelect = function (index, option) {
    $('<option value="' + option.id + '">' + option.title + '</option>').appendTo(this.select)
}

/**
 * clearOptionFormUISelect
 */
ticket.module.GetProjects.prototype.clearOptionFormUISelect = function () {
    this.select.find('option').remove();
}

/**
 * initUISelect
 */
ticket.module.GetProjects.prototype.onUISelectChange = function () {
    ticket.App.CLASS.getTasksDataByProjectsID(this.select.val(), function (data) {
        ticket.module.GetTasks.CLASS.init();
        ticket.module.GetTasks.CLASS.buildUISelect(data)
    })
}

/**
 * initUISelect
 */
ticket.module.GetProjects.prototype.initUISelect = function () {
    this.select.UISelect('destroy');
    this.select.UISelect(
        {
            jScrollPane: {
                initialize:true,
                options:   { showArrows:false }
            },
            appendToBody:true
        }
    );
    this.hideLoader();
}

/**
 * showLoader
 */
ticket.module.GetProjects.prototype.showLoader = function () {
    this.loader.css({'opacity':'1'})
}

/**
 * hideLoader
 */
ticket.module.GetProjects.prototype.hideLoader = function () {
    this.loader.css({'opacity':'0'})
}



