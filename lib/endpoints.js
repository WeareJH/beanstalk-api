"use strict";

module.exports = {
    repo: function repo(id) {
        return "/repositories/" + id + ".json";
    },
    repos: function repos() {
        return "/repositories.json";
    },
    node: function node(opts) {
        return "/repositories/" + opts.id + "/node.json";
    }
};