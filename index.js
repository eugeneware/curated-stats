var request = require('request'),
    cheerio = require('cheerio');

module.exports = getCuratedStats;
function getCuratedStats(auth, cb) {
  if (!auth || !auth.username) return cb('Must supply username');
  const urls = {
    OVERVIEW: 'https://my.curated.co/noblesamurai/subscribers/overview',
    SESSIONS: 'https://my.curated.co/sessions'
  };

  const headers = {
    Origin: 'https://my.curated.co',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
    Referer: 'https://my.curated.co/login'
  };

  var jar = request.jar();

  request.get({
    url: urls.OVERVIEW,
    headers,
    jar,
    followAllRedirects: true
  },
   (err, res, body) => {
    if (err) return cb(err);
    $ = cheerio.load(body);
    var authenticity =  $('input[name=authenticity_token]');
    if (!authenticity.length) {
      return cb('Can\t find authentication token');
    }

    var token = authenticity.attr('value');
    request.post({
      url: urls.SESSIONS,
      headers,
      jar,
      form: {
        utf8: '✓',
        authenticity_token: token,
        email: auth.username,
        password: auth.password,
        remember_me: 'on',
        commit: 'Log in'
      },
      followAllRedirects: true
    },
    (err, res, body) => {
      if (err) return cb(err);
      $ = cheerio.load(body);
      var data = {
        totalSubscriberCount:
          parseInt($('.total-subscribers-info .subscriber-count a')
            .text().replace(',', ''), 10) || 0,
        lastIssueSubscriberCount:
          parseInt($('.subscribers-since-latest-issue-info .subscriber-count a')
            .eq(0).text().replace(',', ''), 10) || 0,
        lastIssueUnsubscribeCount:
          parseInt($('.subscribers-since-latest-issue-info .subscriber-count a')
            .eq(1).text().replace(',', ''), 10) || 0
      };
      return cb(null, data);
    });
  });
}

