// Monitor url
var monitorUrl = 'http://localhost:8888/log';
// Log as normal
var logOriginal = true;

// Backup the default console.log()
_log = console.log.bind(console);
// Override the default console.log()
console.log = function () {
    // If enabled log the intercepted console.log() as normal
    if (logOriginal) {
        _log.apply(this, arguments);
    }

    // Code processing the intercepted log
    fetch(monitorUrl,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arguments)
        })
        .then(res => res.text())
        .then(res => _log(res));
}