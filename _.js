'use strict';

const _each = (list, iter) => {
    for (let i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
};

const _filter = (list, predi) => {
    const new_list = [];
    _each(list, val => {
        if(predi(val)) new_list.push(val);
    });
    return new_list;
};

const _map = (list, mapper) => {
    const new_list = [];
    _each(list, val => new_list.push(mapper(val)));
    return new_list;
};
