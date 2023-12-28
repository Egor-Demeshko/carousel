export default function cleanFromScripts(html) {
    // Удаляем все теги <script> и их содержимое
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Удаляем все теги <iframe> и их содержимое
    html = html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

    return html;
}


function getHostName() {
    const templateInner = document.getElementById("full_window_template");
    if(!templateInner) return

    const route = cleanFromScripts(templateInner.dataset.url);
    const origin = window.location.origin;
    if(route.startsWith(origin)) {
        return route;
    };
}



export const HOST = getHostName();