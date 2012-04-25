/**
 * jQuery UISelect
 *
 * Blue Fountain Media
 *
 * NOTICE OF LICENSE
 *
 * <notice_of_license>
 *
 * @category    BFM
 * @package     BFM_MODAL_WINDOW
 * @copyright   Copyright (c) 2011 Blue Fountain Media (http://www.bluefountainmedia.com/). All Rights Reserved.
 * @license     <license_url>
 * @version     0.0.3
 */
(function ($) {

    /**
     * UISelect - stylized standard select
     * @param {Element} element Root element for the component.
     * @constructor
     */
    function UISelect(__elem) {
        this.element = __elem;
    }

    /**
     * DOMElement extendable of the jQuery plugin system.
     * @type DOMElement.<DOMElement>
     * @public
     */
    UISelect.prototype.element = null;

    /**
     * Placeholder of the UISelect.
     * @public
     */
    UISelect.prototype.placeholder = null;
    UISelect.prototype.PLACEHOLDER_TYPE = 'placeholder';
    UISelect.prototype.PLACEHOLDER_EXPANDABLE_STATE = 'b-bfm-ui-select__placeholder_state_expandable';
    UISelect.prototype.PLACEHOLDER_HOVER_STATE = 'b-bfm-ui-select__placeholder_state_hover';
    UISelect.prototype.PLACEHOLDER_DISABLED_STATE = 'b-bfm-ui-select__placeholder_state_disabled';
    UISelect.prototype.PLACEHOLDER_FOCUS_STATE = 'b-bfm-ui-select__placeholder_state_focus';
    UISelect.prototype.PLACEHOLDER_HIDDEN_STATE = 'b-bfm-ui-select__placeholder_state_hidden';
    UISelect.prototype.PLACEHOLDER_VISIBLE_STATE = 'b-bfm-ui-select__placeholder_state_visible';
    UISelect.prototype.PLACEHOLDER_VALUE_CLASS = 'b-bfm-ui-select__placeholder__value';
    UISelect.prototype.PLACEHOLDER_BUTTON_CLASS = 'b-bfm-ui-select__placeholder__button';
    UISelect.prototype.PLACEHOLDER_TEMPLATE =
        '<div class="b-bfm-ui-select__placeholder">' +
            '<span class="'+UISelect.prototype.PLACEHOLDER_VALUE_CLASS+'"></span>' +
            '<span class="'+UISelect.prototype.PLACEHOLDER_BUTTON_CLASS+'"></span>' +
            '</div>';

    /**
     * List of the UISelect.
     * @public
     */
    UISelect.prototype.list = null;
    UISelect.prototype.LIST_TYPE = 'list';
    UISelect.prototype.LIST_HIDE_STATE = 'b-bfm-ui-select__list_state_hide';
    UISelect.prototype.LIST_WRAP_CLASS = 'b-bfm-ui-select__list__wrap';
    UISelect.prototype.LIST_TEMPLATE =
        '<div class="b-bfm-ui-select__list">' +
            '<ul class="'+UISelect.prototype.LIST_WRAP_CLASS+'">' +
            '</ul>' +
            '</div>';
    UISelect.prototype.LIST_SROLLPANE_TEMPLATE =  '<div class="b-bfm-ui-select__scrollpane-wrap"></div>';

    /**
     * Option of the List.
     * @public
     */
    UISelect.prototype.option = null;
    UISelect.prototype.OPTION_HOVER_STATE = 'b-bfm-ui-select__item_state_hover';
    UISelect.prototype.OPTION_DISABLED_STATE = 'b-bfm-ui-select__item_state_disabled';
    UISelect.prototype.OPTION_SELECTED_STATE = 'b-bfm-ui-select__item_state_selected';
    UISelect.prototype.OPTION_FIRST_CHILD_CLASS = 'b-bfm-ui-select__item_position_first';
    UISelect.prototype.OPTION_LAST_CHILD_CLASS = 'b-bfm-ui-select__item_position_last';
    UISelect.prototype.OPTION_CLASS = 'b-bfm-ui-select__item';
    UISelect.prototype.OPTION_TEMPLATE = '<li class="'+UISelect.prototype.OPTION_CLASS+'"></li>';

    /**
     * Is state expandable
     * @public
     */
    UISelect.prototype.isExpandable = false;

    /**
     * Is state focus
     * @public
     */
    UISelect.prototype.isFocus = false;

    /**
     * Is change event
     * @public
     */
    UISelect.prototype.isChange = false;

    /**
     * Selected option index
     * @public
     */
    UISelect.prototype.selectedOptionIndex = 0;

    /**
     * Prev selected option index
     * @public
     */
    UISelect.prototype.prevSelectedOptionIndex = 0;

    /**
     * jScrollPane settings
     * @public
     */
    UISelect.prototype.isJScrollPane = false;
    UISelect.prototype.isJScrollPaneOption = {};

    /**
     * DOM Docuemnt
     * @public
     */
    UISelect.prototype.DOCUEMNT = $(document);

    /**
     * Append to body key
     * @public
     */
    UISelect.prototype.APPEND_TO_BODY = false;

    /**
     * Is state expandable
     * @public
     */
    UISelect.prototype.isExpandable = false;

    /**
     * Plugin options
     * @public
     */
    UISelect.prototype.OPTIONS = {};

    /**
     * Autocomplete interval
     * @public
     */
    UISelect.prototype.AUTOCOMPLETE_INTERVAL = 800;

    /**
     * Initialize UISelect.
     */
    UISelect.prototype.build = function (__options) {

        // Check is jsScrolPane in jQuery.fn
        if(__options) {
            this.OPTIONS = __options;

            if(__options.jScrollPane) {
                // isJScrollPane from option
                if(jQuery.fn.jScrollPane!==undefined) {
                    this.isJScrollPane = __options.jScrollPane.initialize || false;
                    // Send option for jScrollPane
                    if(__options.jScrollPane.options) this.isJScrollPaneOption = __options.jScrollPane.options;
                } else {
                    throw "Not found jScrollPane in jQuery.fn.jScrollPane"
                }
            }

            if(!__options.appendToBody) {
                this.APPEND_TO_BODY = false;
            } else {
                this.APPEND_TO_BODY = true;
            }

        }

        // Generate UUID for the element
        if(this.getElementUUID() === undefined) {
            this.setElementUUID(this.generateElementUUID());
        }

        this.list = $(this.LIST_TEMPLATE).attr('type', this.LIST_TYPE);
        this.placeholder = $(this.PLACEHOLDER_TEMPLATE).attr('type', this.PLACEHOLDER_TYPE);

        // Add services attributes for inner elements of the UISelect
        this.placeholder.addClass(this.getElementUUID()+'_UISelect');
        this.list.addClass(this.getElementUUID()+'_UISelect');

        if(this.element.attr('id') === undefined) {
            this.element.attr('id', this.getElementUUID()+'_UISelect')
        }

        // Register element of the UISelect in the DOM
        this.element.before(this.placeholder);

        if(this.APPEND_TO_BODY) this.list.appendTo($('body'));
        else this.list.insertAfter(this.placeholder)

        // Add option in
        this.element.find('option').each($.proxy(this, 'addOptions'))
        this.option = this.list.find('.'+this.OPTION_CLASS)

        this.list.find('.'+this.OPTION_CLASS+':first-child').addClass(this.OPTION_FIRST_CHILD_CLASS);
        this.list.find('.'+this.OPTION_CLASS+':last-child').addClass(this.OPTION_LAST_CHILD_CLASS);

        // Add placeholder value by selected option
        this.setPlaceholderValue(this.getSelectedOption().text())

        // Set selected option index value by selected option
        this.selectedOptionIndex = this.getSelectedOption().index();

        this.startElementValue = this.element.val()

        // Hide list after build
        this.hideList(true);

        // Hide element
        this.hideElement();

        // Update List Visual Data
        this.updateListVisualData();

        if(this.element.attr('disabled') == 'disabled') {
            this.placeholder.addClass(this.PLACEHOLDER_DISABLED_STATE);
        } else {
            // Bind event
            this.placeholder.bind('click', $.proxy(this, 'onPlaceholderClick'));
            this.placeholder.bind('mouseenter', $.proxy(this, 'onPlaceholderMouseEnter'));
            this.placeholder.bind('mouseleave', $.proxy(this, 'onPlaceholderMouseLeave'));
            this.element.bind('focus', $.proxy(this, 'onElementFocus'));
            this.option.bind('click', $.proxy(this, 'onOptionClick'));
            this.option.bind('mouseenter', $.proxy(this, 'onOptionMouseEnter'));
            this.option.bind('mouseleave', $.proxy(this, 'onOptionMouseLeave'));
        }

        if(this.element.is(':hidden')) {
            this.placeholder.removeClass(this.PLACEHOLDER_VISIBLE_STATE);
            this.placeholder.addClass(this.PLACEHOLDER_HIDDEN_STATE);
        } else {
            this.placeholder.removeClass(this.PLACEHOLDER_HIDDEN_STATE);
            this.placeholder.addClass(this.PLACEHOLDER_VISIBLE_STATE);
        }

        // Init jsScrollPane
        if(this.isJScrollPane) {
            this.list.find('.'+this.LIST_WRAP_CLASS).wrap(this.LIST_SROLLPANE_TEMPLATE)
        }


    }

    /**
     * onUISelectFocus
     */
    UISelect.prototype.onUISelectFocus = function () {

        $('.b-bfm-ui-select__list').addClass(this.LIST_HIDE_STATE);
        $('.b-bfm-ui-select__placeholder').removeClass(this.PLACEHOLDER_FOCUS_STATE).removeClass(this.PLACEHOLDER_EXPANDABLE_STATE);

        this.placeholder.addClass(this.PLACEHOLDER_FOCUS_STATE);

        // Bind Document events

        this.DOCUEMNT.unbind('mousedown', $.proxy(this, 'onDocumentMouseDown'));
        this.DOCUEMNT.unbind('keydown', $.proxy(this, 'onElementKeyDown'));
        $('input').bind('focus', $.proxy(this, 'onUISelectBlur'));

        this.DOCUEMNT.bind('mousedown', $.proxy(this, 'onDocumentMouseDown'));
        this.DOCUEMNT.bind('keydown', $.proxy(this, 'onElementKeyDown'));

        clearInterval(this.autocompleteInterval)

        this.autocompleteInterval = setInterval($.proxy(this, 'updateAutocompleteString'), this.AUTOCOMPLETE_INTERVAL) || 0;



        return false;
    }

    /**
     * onUISelectFocus
     */
    UISelect.prototype.onUISelectBlur = function () {


        this.placeholder.removeClass(this.PLACEHOLDER_FOCUS_STATE);

        // Bind Document events
        this.DOCUEMNT.unbind('mousedown', $.proxy(this, 'onDocumentMouseDown'));
        this.DOCUEMNT.unbind('keydown', $.proxy(this, 'onElementKeyDown'));

        clearInterval(this.autocompleteInterval)

        return false;
    }

    /**
     * onDocumentMouseDown
     */
    UISelect.prototype.onDocumentMouseDown = function (event) {
        if($(event.target).closest(this.placeholder).length == 0 && $(event.target).closest(this.list).length== 0) this.hideList();
        return false;
    }

    /**
     * On Placeholder click event
     */
    UISelect.prototype.onPlaceholderClick = function (event) {
        this.isExpandable ? this.hideList() : this.showList();
    }


    /**
     * Show list
     */
    UISelect.prototype.showList = function (event) {

        this.onUISelectFocus();

        // Set statuses
        this.list.removeClass(this.LIST_HIDE_STATE);
        this.placeholder.addClass(this.PLACEHOLDER_EXPANDABLE_STATE);

        // Update List Visual Data
        this.updateListVisualData();
        this.initJScrollPane();
        this.isExpandable = true;
        return false;
    }

    /**
     * Hide list
     */
    UISelect.prototype.hideList = function (event) {

        this.onUISelectBlur();

        this.isExpandable = false;
        this.placeholder.removeClass(this.PLACEHOLDER_EXPANDABLE_STATE);
        this.list.addClass(this.LIST_HIDE_STATE);
        this.DOCUEMNT.unbind('mousedown', $.proxy(this, 'onDocumentMouseDown'));

        if(!event) {
            if(this.startElementValue!=this.element.val()) {
                this.dispatchEventChange(document.getElementById(this.element.attr('id')), 'change');
                this.startElementValue=this.element.val()
            }
        }

        return false;
    }

    /**
     * initJScrollPane
     */
    UISelect.prototype.initJScrollPane = function () {
        // Init jsScrollPane
        if(this.isJScrollPane) {
            this.list.find('.'+this.LIST_WRAP_CLASS).jScrollPane(this.isJScrollPaneOption);
            if(this.isJScrollPane) {
                if(this.list.find('.'+this.LIST_WRAP_CLASS).data('jsp')!=undefined) {
                    this.list.find('.'+this.LIST_WRAP_CLASS).data('jsp').scrollToElement(this.option.eq(this.selectedOptionIndex))
                }
            }
        }
    }

    /**
     * Go to Option next
     */
    UISelect.prototype.goOptionNext = function () {
        this.prevSelectedOptionIndex = this.selectedOptionIndex;
        this.selectedOptionIndex+=1;
        if(this.selectedOptionIndex==this.element.find('option').length) this.selectedOptionIndex = 0;
        if(this.isOptionEnabled(this.selectedOptionIndex)) {
            this.setCurrentOption(this.selectedOptionIndex)
            return;
        } else {
            this.goOptionNext()
        }
        return false;
    }

    /**
     * Go to Option prev
     */
    UISelect.prototype.goOptionPrev = function () {
        this.prevSelectedOptionIndex = this.selectedOptionIndex;
        this.selectedOptionIndex-=1;
        if(this.selectedOptionIndex<0) this.selectedOptionIndex = this.element.find('option').length-1;
        if(this.isOptionEnabled(this.selectedOptionIndex)) {
            this.setCurrentOption(this.selectedOptionIndex);
            return;
        } else {
            this.goOptionPrev()
        }
        return false;
    }

    /**
     * Is option enabled
     */
    UISelect.prototype.isOptionEnabled = function (__index) {
        if(this.option.eq(__index).hasClass(this.OPTION_DISABLED_STATE)) return false;
        else return true;
    }

    /**
     * Update List Visual Data
     */
    UISelect.prototype.updateListVisualData = function () {
        if(this.APPEND_TO_BODY) {
            this.list.css({
                'position' : 'absolute',
                'top' : this.placeholder.offset().top+this.placeholder.height(),
                'left' : this.placeholder.offset().left,
                'z-index' : '9999'
            });
        } else {
            this.list.css({
                'position' : 'absolute',
                'z-index' : '9999'
            })
        }

        var marginDifference = 0;

        if(parseFloat(this.list.css('margin-left'))!=0) marginDifference+=parseFloat(this.list.css('margin-left'))
        if(parseFloat(this.list.css('margin-right'))!=0) marginDifference+=parseFloat(this.list.css('margin-right')) ;
        if(parseFloat(this.list.css('padding-right'))!=0) marginDifference+=parseFloat(this.list.css('padding-right'));
        if(parseFloat(this.list.css('padding-left'))!=0) marginDifference+=parseFloat(this.list.css('padding-left'));
        if(parseFloat(this.list.css('border-right-width'))!=0) marginDifference+=parseFloat(this.list.css('border-right-width'));
        if(parseFloat(this.list.css('border-left-width'))!=0) marginDifference+=parseFloat(this.list.css('border-left-width'));

        this.list.width(this.placeholder.width()-marginDifference);
    }

    /**
     * On Option MouseIn event
     */
    UISelect.prototype.onOptionMouseEnter = function (event) {
        if(!$(event.currentTarget).hasClass(this.OPTION_DISABLED_STATE) && !$(event.currentTarget).hasClass(this.OPTION_SELECTED_STATE)) {
            $(event.currentTarget).addClass(this.OPTION_HOVER_STATE)
        }
    }

    /**
     * On Option hover event
     */
    UISelect.prototype.onOptionMouseLeave = function (event) {
        $(event.currentTarget).removeClass(this.OPTION_HOVER_STATE)
    }

    /**
     * On Element KeyDown
     */
    UISelect.prototype.onElementKeyDown = function (event) {

        // TODO Other keyboard button
        switch (event.keyCode) {
            // ENTER
            case 13:
            // ESC
            case 27:
                this.hideList();
                break;
            // UP
            case 40:
                this.goOptionNext();
                break;
            // DOWN
            case 38:
                this.goOptionPrev();
                break;
            default:
                this.autocomplete(event.keyCode);
        }

        if(event.keyCode!=9) {
            return false;
        }
    }

    /**
     * autocomplete
     */
    UISelect.prototype.autocomplete = function (keyCode) {
        if(!this.findSring) this.findSring = '';
        if(!this.prevFindSring) this.prevFindSring = '';
        if(!this.findOptionElementsIndex) this.findOptionElementsIndex = 0;
        if(!this.findOptionElements) this.findOptionElements = [];
        if(!this.isPrevFindString) this.isPrevFindString = false;

        this.findSring+= String.fromCharCode(keyCode).toLowerCase()

        for(var i=0; i<this.option.length; i++) {
            if(($(this.option[i]).text().toLowerCase()).indexOf(this.findSring) == 0) {

                if(this.prevFindSring != this.findSring.substr(0)) {
                    this.findOptionElements = []
                    this.findOptionElementsIndex = 0;
                    this.setCurrentOption($(this.option[i]).index());
                    this.prevFindSring = String.fromCharCode(keyCode).toLowerCase();
                    this.isPrevFindString = false;
                    return
                } else {
                    this.findOptionElements = []
                    for(var i=0; i<this.option.length; i++) {
                        if(($(this.option[i]).text().toLowerCase()).indexOf(this.findSring) == 0) {
                            this.findOptionElements.push($(this.option[i]));
                        }
                    }
                }
            }
        }


        this.isPrevFindString = (this.prevFindSring == this.findSring.substr(0));

        if(this.findOptionElements.length>1) {
            if(this.prevFindSring === this.findSring.substr(0, 1)) {
                if(this.findOptionElementsIndex>=this.findOptionElements.length) this.findOptionElementsIndex = 0;
                this.setCurrentOption($(this.findOptionElements[this.findOptionElementsIndex]).index());
                this.findOptionElementsIndex+=1;
            }
        }

        this.prevFindSring = String.fromCharCode(keyCode).toLowerCase();

    }

    /**
     * autocomplete
     */
    UISelect.prototype.updateAutocompleteString = function () {
        this.findSring = '';
    }

    /**
     * On Element Focus
     */
    UISelect.prototype.onElementFocus = function (event) {
        this.onUISelectFocus()
    }

    /**
     * On Placeholder MouseIn event
     */
    UISelect.prototype.onPlaceholderMouseEnter = function (event) {
        this.placeholder.addClass(this.PLACEHOLDER_HOVER_STATE)
    }

    /**
     * On Placeholder hover event
     */
    UISelect.prototype.onPlaceholderMouseLeave = function (event) {
        this.placeholder.removeClass(this.PLACEHOLDER_HOVER_STATE)
    }

    /**
     * On option click
     */
    UISelect.prototype.onOptionClick = function (event) {
        if(!$(event.currentTarget).hasClass(this.OPTION_DISABLED_STATE) && !$(event.currentTarget).hasClass(this.OPTION_SELECTED_STATE)) {
            this.prevSelectedOptionIndex = this.selectedOptionIndex;
            this.setCurrentOption($(event.currentTarget).index(), true)
            this.hideList();
        }
        return false;
    }

    /**
     * Set Current Option.
     */
    UISelect.prototype.setCurrentOption = function (__index, __isKey) {
        this.element.find('option').removeAttr('selected');
        this.element.find('option').eq(__index).attr('selected', 'selected');
        this.option.removeClass(this.OPTION_SELECTED_STATE)
        this.option.eq(__index).addClass(this.OPTION_SELECTED_STATE)
        this.setPlaceholderValue(this.getSelectedOption().text())
        this.selectedOptionIndex = __index;
        this.isChange = (this.prevSelectedOptionIndex!=this.selectedOptionIndex)
        if(this.isJScrollPane) {
            if(this.list.find('.'+this.LIST_WRAP_CLASS).data('jsp')!=undefined) {
                this.list.find('.'+this.LIST_WRAP_CLASS).data('jsp').scrollToElement(this.option.eq(__index))
            }
        }
    }

    /**
     * Add options in list
     */
    UISelect.prototype.addOptions = function (index, el) {

        // Current option
        var el = $(el)
        var item = $(this.OPTION_TEMPLATE).text(el.text())

        // Add services classes
        if(el.attr("disabled")) item.addClass(this.OPTION_DISABLED_STATE);
        if(el.attr("selected")) {
            item.addClass(this.OPTION_SELECTED_STATE);
            el.removeAttr("selected")
            el.attr("selected", "selected")
        }
        if(el.attr("value")) item.attr("value", el.attr("value"));

        // Append items to dom
        item.appendTo(this.list.find('.'+this.LIST_WRAP_CLASS));
    }

    /**
     * Get selected option.
     */
    UISelect.prototype.getSelectedOption = function () {
        return this.list.find('.'+this.OPTION_SELECTED_STATE).eq(0);
    }

    /**
     * Get Current Option.
     */
    UISelect.prototype.getCurrentOption = function (__index) {
        return this.option.eq(this.selectedOptionIndex)
    }

    /**
     * Set Placeholder Value.
     */
    UISelect.prototype.setPlaceholderValue = function (_text) {
        this.placeholder.find('.'+this.PLACEHOLDER_VALUE_CLASS).text(_text);
    }

    /**
     * Get Placeholder Value.
     */
    UISelect.prototype.getPlaceholderValue = function () {
        return this.placeholder.find('.'+this.PLACEHOLDER_VALUE_CLASS).text();
    }

    /**
     * Hide element
     */
    UISelect.prototype.hideElement = function (__index) {
        this.element.css({
            'position' : 'absolute',
            'left' : -10000
        })
    }

    /**
     * Set Element ID.
     */
    UISelect.prototype.setElementUUID = function (__index) {
        this.element.attr("uuid", __index);
    }

    /**
     * Get Element ID.
     */
    UISelect.prototype.getElementUUID = function () {
        return this.element.attr("uuid");
    }

    /**
     * Generate Element UUID S4
     */
    UISelect.prototype.generateElementUUID = function (__index) {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4());
    }

    /**
     * Dispatch change event
     */
    UISelect.prototype.dispatchEventChange = function(obj, evt) {
        if(obj!==undefined || obj!==null) {
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents');
                evObj.initEvent(evt, true, false);
                obj.dispatchEvent(evObj);
            } else if (document.createEventObject) {
                var evObj = document.createEventObject();
                obj.fireEvent('on' + evt, evObj);
            }
        }
    }

    /**
     * Update UISelect.
     */
    UISelect.prototype.update = function () {
        if(this.destroy()) {
            this.build();
        }
    }

    /**
     * Destroy UISelect.
     */
    UISelect.prototype.destroy = function () {
        if($('.'+this.getElementUUID()+'_UISelect').length!=0) {

            this.DOCUEMNT.unbind('mousedown', $.proxy(this, 'hideList'));
            this.DOCUEMNT.unbind('keydown', $.proxy(this, 'onElementKeyDown'));
            this.element.unbind('focus', $.proxy(this, 'onElementFocus'));

            $('.'+this.getElementUUID()+'_UISelect').remove();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Extend jQuery fn.
     */
    $.fn.UISelect = function (__method) {

        // Saved inner arguments.
        var __arguments = Array.prototype.slice.call(arguments, 1)
        return this.each(function (index) {

            var __UISelect = null;

            if($(this).data('__UISelect__instance')!==undefined) __UISelect =  $(this).data('__UISelect__instance');
            else  __UISelect = new UISelect($(this)), $(this).data('__UISelect__instance', __UISelect);

            // Call inner method of UISelect.
            if (__method && typeof __method === 'string') {
                __UISelect[__method].call(__UISelect)
            } else {
                // Initialize UISelect.
                __UISelect.build(__method || 0);
            }

        });
    };


})(jQuery);