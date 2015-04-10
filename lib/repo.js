'use strict';

var assert = require('assert');
var utils = require('./utils');
var endpoints = require('./endpoints');
var objectAssign = require('object-assign');

var defaults = {};

/**
 * Get a repository
 * @param opts
 * @returns {Promise}
 */
module.exports = function (opts) {

    /**
     * NO defaults for the client config - just throw when omitted
     */
    assert(opts.org, 'Org must be set');
    assert(opts.id, 'Id must be set');

    var repo = objectAssign({}, defaults, opts);

    var done = function done(resolve, data) {
        repo.data = data;
        resolve(repo);
    };

    return utils.makeRequest({
        authHeader: repo.org.authHeader,
        orgname: repo.org.orgname,
        path: endpoints.repo(repo.id),
        cb: done
    });
};