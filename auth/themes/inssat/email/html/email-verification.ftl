<#import "template.ftl" as layout>
<@layout.emailLayout>
    <table role="presentation"
       style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0; font-family: Arial, Helvetica, sans-serif; background-color: rgb(255, 255, 255);">
        <tbody>
            <tr>
                <td align="center" style="padding: 1rem 2rem; vertical-align: top;">
                    <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                        <tbody>
                        <tr>
                            <td style="padding: 40px 0px 0px;">
                                <div style="padding: 20px; background-color: #FFFFFF;">
                                    <div style="color: rgb(0, 0, 0); text-align: center;">
                                        <h1 style="margin: 1rem 0">${kcSanitize(msg("emailVerificationSubject"))?no_esc}</h1>
                                        <p style="padding-bottom: 16px">${kcSanitize(msg("emailVerificationBodySubTitle"))?no_esc}</p>
                                        <p style="padding-bottom: 16px">
                                            <a href="${kcSanitize(msg(link))?no_esc}" target="_blank"
                                               style="
                                                border-radius: 24px !important;
                                                background: #BF9E4E !important;
                                                border: 0 !important;
                                                color: #FFF !important;
                                                font-size: 16px !important;
                                                font-style: normal !important;
                                                font-weight: 700 !important;
                                                line-height: normal !important;
                                                padding: 10px 24px !important;
                                                ">
                                                ${kcSanitize(msg("emailVerificationBodyButtonConfirmText"))?no_esc}
                                            </a>
                                        </p>
                                        <p style="padding-bottom: 16px">${kcSanitize(msg("emailVerificationBodyLinkExp",linkExpirationFormatter(linkExpiration)))?no_esc}</p>
                                        <p style="padding-bottom: 16px">${kcSanitize(msg("emailVerificationBodyIgnoreMsg"))?no_esc}</p>
                                    </div>
                                </div>
                                <p style="padding-top: 20px; color: rgb(92, 92, 92); text-align: center; padding-bottom: 16px">${msg("kcFooterCopyright")}</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</@layout.emailLayout>
