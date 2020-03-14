// Url of the monitor server.
var monitorUrl = 'http://localhost:8888/log';
// Check if you want the browser to still log as normal or skip that step.
var logOriginal = true;

// Backup the default console.log().
_log = console.log.bind(console);
// Override the default console.log().
console.log = function () {
    // If enabled log the intercepted console.log() as normal.
    if (logOriginal) {
        _log.apply(this, arguments);
    }

    // Code processing the intercepted log.
    fetch(monitorUrl,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arguments)
        })
}
