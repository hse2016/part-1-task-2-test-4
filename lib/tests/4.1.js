"use strict";

var assert = require("assert");

var adapter = global.adapter;
var deferred = adapter.deferred;
var resolved = adapter.resolved;
var rejected = adapter.rejected;

var dummy = { dummy: "dummy" }; // we fulfill or reject with this when we don't intend to test against it

describe("4.1. Promise.complete", function () {
    describe("4.1.1: Run executor complete", function () {
        specify("never resolved after complete", function (done) {
            let d1 = deferred();
            let thenCalled = false;

            resolved()
                .then(() => d1.promise)
                .then(() => {
                    thenCalled = true;
                });

            d1.complete();

            setTimeout(() => {
                if (!thenCalled) {
                    done();
                }
            }, 100)
        });

        specify("never rejected after complete", function (done) {
            let d1 = deferred();
            let thenCalled = false;

            resolved()
                .then(() => d1.promise)
                .then(null, () => {
                    thenCalled = true;
                });

            d1.complete();

            setTimeout(() => {
                if (!thenCalled) {
                    done();
                }
            }, 100)
        });
    });

    describe("4.1.2: Return static complete", function () {
        specify("never resolved after complete", function (done) {
            let thenCalled = false;

            resolved()
                .then(() => adapter.complete)
                .then(() => {
                    thenCalled = true;
                });

            setTimeout(() => {
                if (!thenCalled) {
                    done();
                }
            }, 100)
        });

        specify("never reject after complete", function (done) {
            let thenCalled = false;

            resolved()
                .then(() => adapter.complete)
                .then(null, () => {
                    thenCalled = true;
                });

            setTimeout(() => {
                if (!thenCalled) {
                    done();
                }
            }, 100)
        });
    });
});
