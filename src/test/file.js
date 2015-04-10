import org   from '../lib/org';
import node  from '../lib/node';
import creds from '../creds';
import {assert} from 'chai';

const token    = creds.token;
const username = creds.username;
const orgname  = creds.orgname;

describe('Getting files', () => {

    it('Should get a file', () => {

        let client      = org({orgname, username, token});
        let repo        = 'selco-static';
        let path        = 'Gruntfile.js';
        let revision    = '1.0.0';

        return node({
            org: client,
            repo,
            path,
            revision
        })
        .then(function (file) {
            assert.isString(file.data.contents);
        });
    });

    it('Should reject the promise should the API fail', () => {

        let client      = org({orgname, username, token});
        let repo        = 'selco-static';
        let path        = 'Gruntfilse.js';
        let revision    = '1.0.0';

        return node({
            org: client,
            repo,
            path,
            revision
        })
        .catch(function (err) {
            assert.isString(err.message);
        });
    });

    it('Should get multiple files', () => {

        let client      = org({orgname, username, token});
        let repo        = 'selco-static';
        let revision    = '1.0.0';
        var path       = ['public/assets/scss/_vars.scss', 'public/assets/scss/core.scss'];

        return node({
            org: client,
            repo,
            path,
            revision
        })
        .then(function (files) {
            assert.equal(2, files.length);
        });
    });
});