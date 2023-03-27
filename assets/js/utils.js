export function fetchJSONFile(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                if (callback) {
                    callback(data);
                }
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}