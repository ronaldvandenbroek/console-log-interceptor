# console-log-interceptor
![Node.js CI](https://github.com/ronaldvandenbroek/console-log-interceptor/workflows/Node.js%20CI/badge.svg?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/ronaldvandenbroek/console-log-interceptor/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ronaldvandenbroek/console-log-interceptor?targetFile=package.json)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fronaldvandenbroek%2Fconsole-log-interceptor.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fronaldvandenbroek%2Fconsole-log-interceptor?ref=badge_shield)

Intercept console.logs from a website and send it to a seperate logger

## inject.js
Code used to override the console.log() function in the browser.
This code can be used by copy-pasting it in the browser console of the site you want to intercept the logs from.
 
### Config
To configure the code edit the following variables before copy-pasting it into the browser console.

```
// Url of the monitor server.
var monitorUrl = 'http://localhost:8888/log';
// Check if you want the browser to still log as normal or skip that step.
var logOriginal = true;
```

## log-monitor
The monitoring server, can either be used standalone by using the command `npm run start`. 
Or used as a package within another application.



