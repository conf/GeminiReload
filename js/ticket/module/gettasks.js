/**
 * Class ticket.module.GetTasks
 * @constructor
 */
ticket.module.GetTasks = function () {

    // Manipulation with container
    this.container = $('div[data-item-module="ticket.module.GetTasks"]');
    this.select = this.container.find('select');
    this.loader = this.container.find('.b-icon_type_loading');

}

/**
 * Class ticket.module.GetProjects
 * @constructor
 */
ticket.module.GetTasks.prototype.init = function () {
    this.initUISelect();
    this.showLoader();
}

/**
 * buildUISelect
 */
ticket.module.GetTasks.prototype.buildUISelect = function (data) {
    this.clearOptionFormUISelect();
    $.each(data, $.proxy(this, 'updateUISelect'));
    this.initUISelect();
}

/**
 * updateUISelect
 */
ticket.module.GetTasks.prototype.updateUISelect = function (index, option) {
    $('<option value="' + option.id + '">' + option.title + '</option>').appendTo(this.select)
}

/**
 * clearOptionFormUISelect
 */
ticket.module.GetTasks.prototype.clearOptionFormUISelect = function () {
    this.select.find('option').remove();
}

/**
 * initUISelect
 */
ticket.module.GetTasks.prototype.onUISelectChange = function () {
    ticket.App.CLASS.getTasksDataByProjectsID(this.select.val(), function (data) {
        console.log(data)
    })
}

/**
 * initUISelect
 */
ticket.module.GetTasks.prototype.initUISelect = function () {
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
ticket.module.GetTasks.prototype.showLoader = function () {
    this.loader.css({'opacity':'1'})
}

/**
 * hideLoader
 */
ticket.module.GetTasks.prototype.hideLoader = function () {
    this.loader.css({'opacity':'0'})
}


