'use strict';

var assert = require('assert');
var utils = require('./utils');
var endpoints = require('./endpoints');
var objectAssign = require('object-assign');

var defaults = {
    revision: 'master',
    contents: true
};

var whitelist = ['path', 'size'];

/**
 * Get a repository
 * @param {{org: object, path: string, repo: string|object, path: string, [revision]: string, [contents]: boolean}} opts
 * @returns {Promise}
 */
module.exports = function (opts) {

    /**
     * Path required
     */
    assert(opts.path, 'Path must be set');
    assert(opts.repo, 'Repo must be set');

    /**
     * Save original value of opts.repo, it might of been a string
     */
    var repoid = opts.repo;

    var node = objectAssign({
        params: utils.promoteParams(defaults, whitelist, opts)
    }, opts);

    /**
     * If repo is a string, create a an obj instead
     * with id property to simulate correct props
     * for other interfaces
     */
    if (typeof node.repo === 'string') {
        node.repo = { id: repoid };
    }

    /**
     * If array given, consolidate promises for each
     * and return
     */
    if (Array.isArray(node.path)) {
        var _ret = (function () {

            var proms = [];

            node.path.forEach(function (path) {
                var clone = objectAssign({}, node);
                clone.params.path = path;
                proms.push(getOne(clone));
            });

            return {
                v: require('q').all(proms)
            };
        })();

        if (typeof _ret === 'object') return _ret.v;
    } else {

        /**
         * Not an array, just return single promise
         */
        return getOne(node);
    }

    function getOne(node) {

        var done = function done(resolve, data) {
            node.data = data;
            resolve(node);
        };

        return utils.makeRequest({
            authHeader: node.org.authHeader,
            orgname: node.org.orgname,
            path: endpoints.node({ id: node.repo.id }),
            params: node.params,
            cb: done
        });
    }
};