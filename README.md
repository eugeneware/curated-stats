# curated-stats

Pull back subscriber stats from curated.co

[![build status](https://secure.travis-ci.org/eugeneware/curated-stats.png)](http://travis-ci.org/eugeneware/curated-stats)

This is needed because the official [curated.co API](http://support.curated.co/integrations/getting-started-with-the-curated-api/)
doesn't support pulling back subscriber stats as yet.

## Installation

This module is installed via npm:

``` bash
$ npm install curated-stats
```

## Example Usage

``` js
var curatedStats = require('curated-stats');
var stats = curatedStats(auth, (err, stats) => {
  if (err) return console.error(err);
  console.log(stats);
/*
{ totalSubscriberCount: 3239,
  lastIssueSubscriberCount: 3235,
  lastIssueUnsubscribeCount: 0 }
*/
});
```
