/**
 * Class ticket.widget.LogPanel
 * @constructor
 */
ticket.widget.LogPanel = function() {
    this.template =$(
        '<div class="b-log-panel">' +
            '<div class="b-log-panel__wrap">' +
                '<div class="b-datepicker"></div>' +
                '<div class="b-log-panel__field">' +
                    '<input type="text" placeholder="Choose date" name="date" id="date">' +
                '</div>' +
                '<div class="b-log-panel__field">' +
                    '<input type="text" placeholder="Time (3:30)" name="time" id="time">' +
                '</div>' +
                '<div class="b-log-panel__field">' +
                    '<input type="text" placeholder="Comment" name="comment" id="comment">' +
                '</div>' +
                '<div class="b-log-panel__field">' +
                    '<a class="b-log-panel__button" href="#/submit/">Log ime</a>' +
                '</div>' +
            '</div>' +
            '<div class="b-log-panel__arrow"></div>' +
        '</div>');
}


ticket.widget.LogPanel.prototype.build = function(__event) {

    if(this.container!=undefined) {
        if(this.container.length!=0) {
            this.calendar.datepicker('destroy');
            this.container.remove();
        }
    }

    this.button     = $(__event.currentTarget);
    this.offsetLeft = this.button.offset().left;
    this.offsetTop  = this.button.offset().top;
    this.win        = $(window)
    this.container  = this.template.appendTo($('body'))
    this.calendar   = this.container.find('.b-datepicker');
    this.arrow      = this.container.find('.b-log-panel__arrow');
    this.submit     = this.container.find('.b-log-panel__button');

    this.calendar.datepicker({
        onSelect: $.proxy(this, 'onSelectDate'),
        dateFormat: "yy-mm-dd"
    });

    this.selectedDate = this.getISO8601Date(this.calendar.datepicker('getDate'));

    this.inputDate      = $('input#date');
    this.inputTime      = $('input#time');
    this.inputComment   = $('input#comment')

    this.inputDate.val(this.selectedDate)
    this.setPosition(this.offsetLeft, this.offsetTop);
    this.win.resize($.proxy(this, 'resize'));

}

ticket.widget.LogPanel.prototype.resize = function(__event) {
    this.setPosition(this.button.offset().left, this.button.offset().top);
}

ticket.widget.LogPanel.prototype.onSelectDate = function(dateText, inst) {
    this.selectedDate = dateText;
    this.inputDate.val(this.selectedDate)
}

ticket.widget.LogPanel.prototype.setPosition = function(__x, __y) {

    var marginY                 = 45;
    var marginX                 = 100;
    var finalX                  = __x+marginX;
    var finalY                  = __y-marginY;
    var arrowDefaultYPosition   = 48;
    var containerBottomMargin   = 40;
    var clientHeight            = $(document).height();
    var clientDiff              = 0;
    var windowHeight            = this.win.height();

    if(finalY+this.container.height() >= clientHeight)
        clientDiff  = finalY+this.container.height() - clientHeight+containerBottomMargin,
        finalY      = finalY - clientDiff;

    this.container.css({ 'left' : finalX, 'top' : finalY-containerBottomMargin})
    this.arrow.css({'top' : clientDiff+arrowDefaultYPosition+containerBottomMargin})
}

ticket.widget.LogPanel.prototype.getISO8601Date = function(d) {

        function fix2(n) { return (n < 10) ? '0' + n : n; }

        return d.getFullYear() + '-' +
            fix2(d.getMonth() + 1) + '-' +
            fix2(d.getDate());
}

