var assert       = require('assert');
var utils        = require('./utils');
var objectAssign = require('object-assign');

const defaults = {};

/**
 * @param {{orgname: string, username: string, token: string}} opts
 */
module.exports = function (opts) {

    /**
     * NO defaults for the client config - just throw when omitted
     */
    assert(opts.orgname,  '`orgname` must be set');
    assert(opts.username, '`username` must be set');
    assert(opts.token,    '`token` must be set');

    let org = objectAssign({}, defaults, opts);

    org.authHeader = utils.getAuthHeader(org);

    return org;
};
