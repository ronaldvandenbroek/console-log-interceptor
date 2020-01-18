// Backup the default console.log()
_log = console.log.bind(console);

// Override the default console.log()
console.log = function () {
    // Log the intercepted console.log() as normal
    _log.apply(this, arguments);

    // Add code to process the intercepted log here
    _log("Intercept code");
}