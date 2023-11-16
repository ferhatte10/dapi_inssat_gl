<#macro emailLayout>
<html lang="${kcSanitize(msg("localLang"))?no_esc}">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<body>
    <#nested>
</body>
</html>
</#macro>
