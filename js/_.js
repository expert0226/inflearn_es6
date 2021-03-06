'use strict';

const _curry = fn => (a, ...rest) => rest.length > 0 ? fn(a, rest[0]) : b => fn(a, b);

const _curryr = fn => (a, ...rest) => rest.length > 0 ? fn(a, rest[0]) : b => fn(b, a);

const _get = _curryr((obj, key) => obj == null ? undefined : obj[key]);

const _is_object = obj => typeof obj === 'object' && !!obj;

const _keys = obj => _is_object(obj) ? Object.keys(obj) : [];

var _length = _get('length');

const _each = (list, iter) => {
    const keys = _keys(list);

    for (let i = 0, len = keys.length; i < len; i++) {
        iter(list[keys[i]]);
    }
    return list;
};

const _filter = _curryr((list, predi) => {
    const new_list = [];
    _each(list, val => {
        if(predi(val)) new_list.push(val);
    });
    return new_list;
});

const _map = _curryr((list, mapper) => {
    const new_list = [];
    _each(list, val => new_list.push(mapper(val)));
    return new_list;
});

const _rest = (list, num) => Array.from(list).slice(num || 1);

const _reduce = (list, iter, memo) => {
    if (memo === undefined) {
        memo = list[0];
        list = _rest(list);
    }
    _each(list, val => memo= iter(memo, val));
    return memo
};

const _pipe = (...fns) => arg => _reduce(fns, (arg, fn) => fn(arg), arg);

const _go = (arg, ...fns) => {
    return _pipe(...fns)(arg);
};

const _identity = val => val;

const _values = _map(_identity);

