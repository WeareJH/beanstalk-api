
var path = require('path');

module.exports =

function (opts) {

    require('request')({
            url: opts.url,
            headers: opts.headers,
            qs: opts.params
        },
        function (error, response, data) {

            if (response.statusCode !== 200) {
                let apierror = new Error(`${response.req.path} returned the status code: ${response.statusCode}`);
                return opts.error(apierror, response);
            }

            if (!isJson(response)) {
                let apierror = new Error('url: ' + response.req.path + ' did not return JSON - please check your configuration');
                return opts.error(apierror, response);
            }

            if (!error) {
                data = JSON.parse(data);
                if (process.env.BSRECORD) {
                    let fs = require('fs-extra');
                    let filepath = require('url').parse(response.req.path).pathname.slice(1);
                    fs.ensureDir(path.dirname(path.join(__dirname, '../test/fixtures', filepath)));
                    fs.writeJSONFileSync(path.join(__dirname, '../test/fixtures', filepath), data);
                }
                return opts.cb(data, response);
            }

            return opts.error(error);
        }
    );

    function isJson (res) {
        return res.headers['content-type'].indexOf('application/json') > -1;
    }
};