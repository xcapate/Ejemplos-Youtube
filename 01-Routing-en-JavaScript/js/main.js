function zombie(){
    $("#images .zombie img").hide();
}

function ninja(){
    $("#images .ninja img").hide();
}

function robot(){
    $("#images .robot img").hide();
}



var ROUTES = {
    // Código general, común a todas las URL
    common: {
        init: function () {
            $("#images .zombie img").after("<figcaption>Zombie</figcaption>");
            $("#images .robot img").after("<figcaption>Robot</figcaption>");
            $("#images .ninja img").after("<figcaption>Ninja</figcaption>");
        }
    },
    // Código específico de inicio.html
    home: {
        init: function () {

        }
    },
    // Código específico de zombie-y-robot.html
    zombierobot: {
        init: function () {
            ninja();
        }
    },
    // Código específico de ninja.html
    ninja: {
        init: function () {

        },
        zombie: function () {
            zombie();
        },
        robot: function () {
            robot();
        }
    }
};



var DISPATCHER = {
    exec: function (url, actions) {
        actions = (actions === undefined) ? "init" : actions;
        if (url !== "" && ROUTES[url] && typeof ROUTES[url][actions] === "function") {
            ROUTES[url][actions]();
        }
    },

    init: function () {
        var i = 0,
            body = document.body,
            url = body.getAttribute("data-url"),
            actions = $.trim(body.getAttribute("data-actions")).split(" ");

        DISPATCHER.exec("common"); //llama a common init
        DISPATCHER.exec(url); //llama a init
        for (i = 0; i < actions.length; i++) {
            DISPATCHER.exec("common", actions[i]);
            DISPATCHER.exec(url, actions[i]);
        }
    }
};

$(document).ready(DISPATCHER.init);

