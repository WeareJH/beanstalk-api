import org  from '../lib/org';
import repo from '../lib/repo';
import creds from '../creds';

import {assert} from 'chai';

const token    = creds.token;
const username = creds.username;
const orgname  = creds.orgname;

describe('Creating clients', () => {

    it('Should get repo information', () => {

        let client      = org({orgname, username, token});
        let id          = 'selco-static';

        return repo({org: client, id})
            .then(function (repo) {
                assert.ok(repo.data.repository);
            });
    });
    it('Should give a good should api fail', () => {

        let client      = org({orgname, username, token});
        let id          = 'selczergwero-static';

        return repo({org: client, id})
            .catch(function (err) {
                assert.isString(err.message);
            });
    });
});