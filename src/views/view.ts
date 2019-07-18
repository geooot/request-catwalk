let view = `
<html>
    <head>
        <title>Request Runway</title>
        <style>
            body{
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                margin: 0px;
            }
            .main{
                display: flex;
                height: 100vh;
                overflow: hidden;
                justify-content: 'stretch';
                align-items: 'stretch';
                flex-align: 'row';
            }
            .side-a{
                flex: 0.20;
                border-right: 1px solid #ddd;
                padding: 15px;
                overflow: auto;
            }
            .side-b{
                flex: 0.80;
                border: 0;
            }
            .border-1{
                outline: 1px dashed #ddd;
            }
        </style>
    </head>
    <body>
        <div class='main'>
            <div class="side-a">
                <h3>CUSTOMIZE:</h3>
                {form}
            </div>
            <iframe src="{url}" class="side-b"></iframe>
            <script>
                {javascript}
            </script>
        </div>
    </body>
</html>
`;

export default view;