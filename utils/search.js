import queryString from 'query-string';

export const getSearchObj = search => search ? queryString.parse(search) : {};

export const getSearchParams = obj => queryString.stringify(obj);