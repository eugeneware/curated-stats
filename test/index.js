var it = require('tape'),
    curatedStats = require('..');

var auth = {
  username: process.env.CURATED_USERNAME,
  password: process.env.CURATED_PASSWORD
};

it('should be able to fetch curated stats', function(t) {
  t.plan(4);
  var stats = curatedStats(auth, (err, stats) => {
    t.deepEqual(Object.keys(stats),
      ['totalSubscriberCount', 'lastIssueSubscriberCount', 'lastIssueUnsubscribeCount']);
    t.ok(typeof stats.totalSubscriberCount === 'number');
    t.ok(typeof stats.lastIssueSubscriberCount === 'number');
    t.ok(typeof stats.lastIssueUnsubscribeCount === 'number');
    t.end();
  });
});
