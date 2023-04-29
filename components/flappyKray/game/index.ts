export const html = `<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title>Flappy K-Ray</title>
        <link rel="apple-touch-icon-precomposed" href="data/img/touch-icon-iphone.png"/>
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="data/img/touch-icon-iphone-retina.png"/>
        <link rel="shortcut icon" href="data/img/favicon.ico">
        <link rel="stylesheet" type="text/css" media="screen" href="https://kray.kubefirst.com/index.css">
        <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="Clumsy Bird">
        <meta charset="UTF-8" />
        <meta name="description" content="Flappy K-Ray"/>
        <meta name="keywords" content="feedkray kubefirst flappy bird clumsy bird"/>
        <meta name="robots" content="index, follow">
        <!-- <meta name="google-site-verification" content="RDZI9SqVaffd48uHfZMv67-YdvviOMe2HuULEYqVgd4" />
        <meta property="og:image" content="http://ellisonleao.github.io/clumsy-bird/data/img/bg.png" />
        <meta property="og:title" content="Clumsy Bird - A Flappy Bird clone using MelonJS"/>
        <meta property="og:url" content="http://ellisonleao.github.io/clumsy-bird/"/>
        <meta property="og:site_name" content="Clumsy Bird - MelonJS"/> -->

        <!-- Twitter Card -->
        <meta name="twitter:hashtag" content="flappykray" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@kubefirst" />
        <meta name="twitter:creator" content="@kubefirst" />
        <meta name="twitter:title" content="Flappy K-Ray" />
        <meta name="twitter:description" content="#feedkray" />
    </head>

    <body>
        <!-- Canvas placeholder -->
        <div id="screen"></div>

        <!-- melonJS Library -->
        <script type="text/javascript" src="https://kray.kubefirst.com/js/melonJS-min.js" ></script>
        <script type="text/javascript" src="https://kray.kubefirst.com/build/clumsy-min.js" ></script>
        <script type="text/javascript">
            window.onReady(function onReady() {
                game.onload();
            });
        </script>

    </body>
</html>
`;

export default html;
