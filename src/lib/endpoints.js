module.exports = {
    repo: function (id) {
        return `/repositories/${id}.json`;
    },
    repos: function () {
        return `/repositories.json`;
    },
    node: function (opts) {
        return `/repositories/${opts.id}/node.json`;
    }
};