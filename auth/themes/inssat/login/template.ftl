<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false displayWide=false showAnotherWayIfPresent=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
</head>

<body class="${properties.kcBodyClass!}">
  <div class="${properties.kcLoginClass!}">
<#--    <div id="kc-header" class="${properties.kcHeaderClass!}">-->
<#--      <div id="kc-header-wrapper" class="${properties.kcHeaderWrapperClass!}">Intranet ${kcSanitize(msg("loginTitleHtml",(realm.displayNameHtml!'')))?no_esc}</div>-->
<#--    </div>-->
    <div class="${properties.kcFormCardClass!} <#if displayWide>${properties.kcFormCardAccountClass!}</#if>">

        <div class="${properties.kcLoginCardClass!}">
            <div class="form-side">
                <header class="${properties.kcFormHeaderClass!}">
                    <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
                        <div id="kc-locale">
                            <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
                                <div class="kc-dropdown" id="kc-locale-dropdown">
                                    <a href="#" id="kc-current-locale-link">${locale.current}</a>
                                    <ul>
                                        <#list locale.supported as l>
                                            <li class="kc-dropdown-item"><a href="${l.url}">${l.label}</a></li>
                                        </#list>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </#if>
                    <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
                        <div id="logo-inssat">
                            <img src="${url.resourcesPath}/img/logo_inssat.png" alt="Logo INSSAT" />
                        </div>
                        <#if displayRequiredFields>
                            <div class="${properties.kcContentWrapperClass!}">
                                <div class="${properties.kcLabelWrapperClass!} subtitle">
                                    <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                                </div>
                                <div class="col-md-10">
                                    <h1 id="kc-page-title"><#nested "header"></h1>
                                </div>
                            </div>
                        <#else>
                            <h1 id="kc-page-title"><#nested "header"></h1>
                        </#if>
                    <#else>
                        <#if displayRequiredFields>
                            <div class="${properties.kcContentWrapperClass!}">
                                <div class="${properties.kcLabelWrapperClass!} subtitle">
                                    <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                                </div>
                                <div class="col-md-10">
                                    <#nested "show-username">
                                    <div class="${properties.kcFormGroupClass!}">
                                        <div id="kc-username">
                                            <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                                            <a id="reset-login" href="${url.loginRestartFlowUrl}">
                                                <div class="kc-login-tooltip">
                                                    <i class="${properties.kcResetFlowIcon!}"></i>
                                                    <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <#else>
                            <#nested "show-username">
                            <div class="${properties.kcFormGroupClass!}">
                                <div id="kc-username">
                                    <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                                    <a id="reset-login" href="${url.loginRestartFlowUrl}">
                                        <div class="kc-login-tooltip">
                                            <i class="${properties.kcResetFlowIcon!}"></i>
                                            <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </#if>
                    </#if>
                </header>
                <div id="kc-content">
                    <div id="kc-content-wrapper">

                        <#-- App-initiated actions should not see warning messages about the need to complete the action -->
                        <#-- during login.                                                                               -->
                        <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                            <div class="alert alert-${message.type}">
                                <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                                <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                                <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                                <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                                <span class="kc-feedback-text">${kcSanitize(message.summary)?no_esc}</span>
                            </div>
                        </#if>

                        <#nested "form">

                        <#if auth?has_content && auth.showTryAnotherWayLink() && showAnotherWayIfPresent>
                            <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post" <#if displayWide>class="${properties.kcContentWrapperClass!}"</#if>>
                                <div <#if displayWide>class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}"</#if>>
                                    <div class="${properties.kcFormGroupClass!}">
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        <a href="#" id="try-another-way" onclick="document.forms['kc-select-try-another-way-form'].submit();return false;">${msg("doTryAnotherWay")}</a>
                                    </div>
                                </div>
                            </form>
                        </#if>

                        <#if displayInfo>
                            <div id="kc-info" class="${properties.kcSignUpClass!}">
                                <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                                    <#nested "info">
                                </div>
                            </div>
                        </#if>
                    </div>
                </div>
            </div>
            <div class="logo-side">
                <div class="f1">
                    <div class="f2">
                        <div class="f3">
                            <div class="fball">
                                <svg xmlns="http://www.w3.org/2000/svg" width="254" height="254" viewBox="0 0 254 254" fill="none">
                                    <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M125.999 1.07911e-05L125.999 97.7687C96.6271 97.5561 68.545 87.9823 47.8054 71.1314C39.4685 64.3576 32.5926 56.6322 27.3339 48.2752C50.4018 19.1095 85.9993 0.30871 125.999 1.07911e-05ZM127.999 0L127.999 97.7687C157.372 97.5561 185.454 87.9823 206.193 71.1314C214.53 64.3574 221.406 56.6316 226.665 48.2742C203.597 19.1087 167.999 0.308268 127.999 0ZM227.969 49.9512C222.64 58.2664 215.748 65.9447 207.454 72.6836C186.324 89.852 157.784 99.5561 127.999 99.7687V154.22C142.59 154.325 157.025 156.71 170.519 161.251C184.321 165.896 196.873 172.708 207.454 181.305C215.686 187.993 222.602 195.662 227.97 204.04C244.3 182.671 254 155.966 254 126.996C254 98.0252 244.299 71.3199 227.969 49.9512ZM226.666 205.717C221.368 197.297 214.466 189.58 206.193 182.858C195.81 174.421 183.472 167.72 169.881 163.146C156.598 158.676 142.378 156.325 127.999 156.22L127.999 253.992C168 253.684 203.598 234.883 226.666 205.717ZM125.999 253.992L125.999 156.22C111.62 156.325 97.4006 158.676 84.1176 163.146C70.5266 167.72 58.189 174.421 47.8054 182.858C39.5326 189.579 32.6314 197.296 27.333 205.716C50.4008 234.882 85.9987 253.684 125.999 253.992ZM26.0289 204.039C31.3976 195.661 38.3132 187.993 46.5442 181.305C57.126 172.708 69.678 165.896 83.4796 161.251C96.9732 156.71 111.409 154.325 125.999 154.22V99.7687C96.2141 99.5561 67.6746 89.852 46.5442 72.6836C38.2505 65.9449 31.3589 58.267 26.0301 49.9522C9.70031 71.3207 0 98.0256 0 126.996C0 155.966 9.69984 182.67 26.0289 204.039Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  </div>
  <footer>
      <p>${msg("kcFooterCopyright")}</p>
  </footer>
</body>
</html>
</#macro>
