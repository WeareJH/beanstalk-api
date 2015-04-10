import org from '../lib/org';

import {assert} from 'chai';

const token    = 'wergwergwergwegwergwergwergwergwergwergwergewrgwerg';
const username = 'shakyshane';
const orgname  = 'jh';

describe('Creating clients', () => {

    it('Should create a client object', () => {

        let client = org({orgname, username, token});

        assert.equal(client.token,    token);
        assert.equal(client.username, username);
        assert.equal(client.orgname,  orgname);
        assert.equal(client.authHeader,    'Basic c2hha3lzaGFuZTp3ZXJnd2VyZ3dlcmd3ZWd3ZXJnd2VyZ3dlcmd3ZXJnd2VyZ3dlcmd3ZXJnZXdyZ3dlcmc=');
    });

    it('throws when option missing', () => {

        assert.throws(() => org({orgname, token}));
        assert.throws(() => org({orgname, username}));
        assert.throws(() => org({token, username}));
        assert.throws(() => org());
    });
});