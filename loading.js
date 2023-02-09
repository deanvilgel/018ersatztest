pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = "https://ersatz.kr/works/logo.png";
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #283538;',
            '}',

            '#application-splash-wrapper {',
            '    position: relative;',
            '    margin: 0 auto;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #1f1f1f;',
            '}',

            '#application-splash {',
            '    position: relative;',
            '    top: calc(50% - 96px);',
            '    width: 250px;',
            '    left: calc(50% - 125px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px 0 auto 0;',
            '    height: 2px;',
            '    width: 100%;',
            '    background-color: #000000;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #ffffff;',
            '}',

            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        position: relative;',
            '        top: calc(50% - 65px);',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '    #progress-bar-container {',
            '        margin: 13px 0 auto 0;',
            '        height: 2px;',
            '        width: 100%;',
            '        background-color: #000000;',
            '}'

        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});
