<?php echo Kohana_View::factory('header'); ?>
<div class="b-wrapper" data-core-module="ticket.App">
<div class="b-auth">
<?php if(Session::instance()->get('is_logged_in', false)): ?>
    <div class="b-auth__logout">
        <span class="b-auth__user">Hello, <?php echo html::chars($user->fullname);?></span>
        <a class="b-icon b-icon_type_logout" href="/logout/">Logout</a>
    </div>
<?php else:?>
	<div class="b-auth__logout">
        <form method="POST" action="/login">
        	<input type="text" name="username">
        	<input type="text" name="apikey">
        	<input type="submit" value="LogIn">
        </form>
    </div>
<?php endif;?>
</div>
<!-- b-auth -->
<div class="b-timeline">
    <h2 class="b-title">Timeline</h2>
    <ul class="b-timeline__calendar">
        <li class="b-timeline__calendar__item b-timeline__calendar__item_type_last">
            <div class="b-timeline__calendar__date">
                <span class="b-timeline__calendar__week-day">Monday</span>
                <span class="b-timeline__calendar__month">15/04/2012</span>
            </div>
            <div class="b-timeline__calendar__time">
                <strong class="b-timeline__calendar__time__count">
                    <span class="b-timeline__calendar__time_get_hour">8</span>:<span class="b-timeline__calendar__time_get_minute">00</span>
                </strong>
                <div class="b-timeline__calendar__stat">
                    <span class="b-timeline__calendar__stat_type_billable">12</span> /
                    <span class="b-timeline__calendar__stat_type_internal">88</span>
                </div>
            </div>
        </li>
        <li class="b-timeline__calendar__item b-timeline__calendar__item_type_today">
            <div class="b-timeline__calendar__date">
                <span class="b-timeline__calendar__week-day">Monday</span>
                <span class="b-timeline__calendar__month">15/04/2012</span>
            </div>
            <div class="b-timeline__calendar__time">
                <strong class="b-timeline__calendar__time__count">
                    <span class="b-timeline__calendar__time_get_hour">8</span>:<span class="b-timeline__calendar__time_get_minute">00</span>
                </strong>
                <div class="b-timeline__calendar__stat">
                    <span class="b-timeline__calendar__stat_type_billable">12</span> /
                    <span class="b-timeline__calendar__stat_type_internal">88</span>
                </div>
            </div>
        </li>
        <li class="b-timeline__calendar__item b-timeline__calendar__item_type_next">
            <div class="b-timeline__calendar__date">
                <span class="b-timeline__calendar__week-day">Monday</span>
                <span class="b-timeline__calendar__month">15/04/2012</span>
            </div>
            <div class="b-timeline__calendar__time">
                <strong class="b-timeline__calendar__time__count">
                    <span class="b-timeline__calendar__time_get_hour">0</span>:<span class="b-timeline__calendar__time_get_minute">00</span>
                </strong>
                <div class="b-timeline__calendar__stat">
                    <span class="b-timeline__calendar__stat_type_billable">--</span> /
                    <span class="b-timeline__calendar__stat_type_internal">--</span>
                </div>
            </div>
        </li>
        <li class="b-timeline__calendar__item b-timeline__calendar__item_type_next">
            <div class="b-timeline__calendar__date">
                <span class="b-timeline__calendar__week-day">Monday</span>
                <span class="b-timeline__calendar__month">15/04/2012</span>
            </div>
            <div class="b-timeline__calendar__time">
                <strong class="b-timeline__calendar__time__count">
                    <span class="b-timeline__calendar__time_get_hour">0</span>:<span class="b-timeline__calendar__time_get_minute">00</span>
                </strong>
                <div class="b-timeline__calendar__stat">
                    <span class="b-timeline__calendar__stat_type_billable">--</span> /
                    <span class="b-timeline__calendar__stat_type_internal">--</span>
                </div>
            </div>
        </li>
        <li class="b-timeline__calendar__item b-timeline__calendar__item_type_next">
            <div class="b-timeline__calendar__date">
                <span class="b-timeline__calendar__week-day">Monday</span>
                <span class="b-timeline__calendar__month">15/04/2012</span>
            </div>
            <div class="b-timeline__calendar__time">
                <strong class="b-timeline__calendar__time__count">
                    <span class="b-timeline__calendar__time_get_hour">0</span>:<span class="b-timeline__calendar__time_get_minute">00</span>
                </strong>
                <div class="b-timeline__calendar__stat">
                    <span class="b-timeline__calendar__stat_type_billable">--</span> /
                    <span class="b-timeline__calendar__stat_type_internal">--</span>
                </div>
            </div>
        </li>
        <li class="b-timeline__calendar__item b-timeline__calendar__item_type_next">
            <div class="b-timeline__calendar__date">
                <span class="b-timeline__calendar__week-day">Monday</span>
                <span class="b-timeline__calendar__month">15/04/2012</span>
            </div>
            <div class="b-timeline__calendar__time">
                <strong class="b-timeline__calendar__time__count">
                    <span class="b-timeline__calendar__time_get_hour">0</span>:<span class="b-timeline__calendar__time_get_minute">00</span>
                </strong>
                <div class="b-timeline__calendar__stat">
                    <span class="b-timeline__calendar__stat_type_billable">--</span> /
                    <span class="b-timeline__calendar__stat_type_internal">--</span>
                </div>
            </div>
        </li>
    </ul>
</div>
<div class="b-any"></div>
<!-- b-timeline -->
<div class="b-tasks">
    <div class="b-fieldset" data-item-module="ticket.module.GetProjects">
        <label for="project">Choose Project</label>
        <select name="project" id="project">
            <option value="">Load projects list</option>
        </select>
        <span class="b-icon b-icon_type_loading">Loading</span>
    </div>
    <div class="b-fieldset" data-item-module="ticket.module.GetTasks">
        <label for="task">Choose Task</label>
        <select name="task" id="task">
            <option value="">Load projects tasks</option>
        </select>
        <span class="b-icon b-icon_type_loading">Loading</span>
        <a class="b-add-to-fav" href="#/fav/">
            <span class="b-icon b-icon_type_to-fav">&#9733;</span>Add to favorite
        </a>
    </div>
    <div class="b-fieldset b-fieldset__controls">
        <span class="b-icon b-icon_type_loading">Loading</span>
        <a class="b-log-time" href="#/open-popup/">
            <span class="b-icon b-icon_type_clock">&#10004;</span>
            Log time
        </a>
    </div>
</div>
<!-- b-tasks -->
<div class="b-fav-tasks">
    <h2 class="b-title">Favorite tasks</h2>
    <ul class="b-fav-tasks__list">
        <li class="b-fav-tasks__item">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item b-fav-tasks__item_state_current">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <span class="b-icon b-icon_type_loading">Loading</span>
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item b-fav-tasks__item_state_current">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <span class="b-icon b-icon_type_loading">Loading</span>
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item b-fav-tasks__item_state_current">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <span class="b-icon b-icon_type_loading">Loading</span>
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item b-fav-tasks__item_state_current">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <span class="b-icon b-icon_type_loading">Loading</span>
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
        <li class="b-fav-tasks__item">
            <span class="b-fav-tasks__title">Keeping Gemini info up-to-date</span>
                <span class="b-fav-tasks__controls">
                    <a class="b-log-time" href="#/open-popup/">
                        <span class="b-icon b-icon_type_clock">&#10004;</span>
                        Log time
                    </a>
                    <a class="b-icon b-icon_type_remove" href="#/remove-task/">Remove task</a>
                </span>
        </li>
    </ul>
</div>
<!-- b-tasks -->
</div>
<!-- b-wrapper -->
<?php echo Kohana_View::factory('footer'); ?>