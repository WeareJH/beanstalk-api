'use strict';

var utils = exports;

/**
 * Construct an api url
 * @param {{orgname: string, path: string}} opts
 * @returns {*}
 */
utils.getApiUrl = function (opts) {
    return 'https://' + opts.orgname + '.beanstalkapp.com/api' + opts.path;
};

/**
 * Get auth headers for an api request
 * @param org
 * @returns {{Authorization: string, Content-Type: string, User-Agent: string}}
 */
utils.getAuthHeaders = function (opts) {
    return {
        Authorization: opts.authHeader,
        'Content-Type': 'application/json',
        'User-Agent': 'Beanstalk api-wrapper'
    };
};

/**
 * Create a promise wrapper around the request../
 * @param {{orgname: string, path: string, cb: function}} opts
 * @returns {Promise}
 */
utils.makeRequest = function (opts) {

    var deferred = require('q').defer();

    require('./request')({
        url: utils.getApiUrl({ orgname: opts.orgname, path: opts.path }),
        headers: utils.getAuthHeaders({ authHeader: opts.authHeader }),
        cb: opts.cb.bind(null, deferred.resolve),
        params: opts.params,
        error: deferred.reject
    });

    return deferred.promise;
};

/**
 * Merge defaults + allow whitelist only.
 * This will limit HTTP params from being sent when not allowed
 * @param defaults
 * @param whitelist
 * @param opts
 * @returns {{}}
 */
utils.promoteParams = function (defaults, whitelist, opts) {

    var out = whitelist.reduce(function (all, item) {
        if (opts[item]) {
            all[item] = opts[item];
        }
        return all;
    }, {});

    Object.keys(defaults).forEach(function (key) {
        if (typeof opts[key] !== 'undefined') {
            out[key] = opts[key];
        } else {
            out[key] = defaults[key];
        }
    });

    return out;
};

/**
 * Create basic auth header
 * @param {{username: string, token: string}} opts
 * @returns {string}
 */
utils.getAuthHeader = function (opts) {
    return 'Basic ' + new Buffer('' + opts.username + ':' + opts.token).toString('base64');
};