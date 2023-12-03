export const 
ReadData = async () => {
    const
    status = useSelector((state) => state.status),
    dispatch = useDispatch()
    useEffect(() => {
        if (!status['GET_ALL']) {
            dispatch(getAll())
        }
        if (!status['GET_TYPE']) {
            dispatch(getType())
        }
    }, [dispatch]);
}

export const
sleep = delay => new Promise(resolve => setTimeout(resolve, delay * 100))

export const
generateKey = (pre = '') => {
    let name = (pre.name) ? pre.name : 'id'
    return `${name}_${new Date().getTime()}_${new Date().getMilliseconds()}`
}

export const
uuid = (suffix = '') => {
    return Math.floor
    (
        (new Date()).getTime() / 10
    )
    .toString()
    .replace(/([0-9]{4})/g, "$1-")
    +
    crypto.randomUUID()
    +
    ((suffix === '') ? '' : '_' + suffix)
}

export const
sanitize = (string) => {
    const map = {
        '%0a': '', '%0d': '', 'Content-Type:': '', 'bcc:': '', 'to:': '', 'cc:': '', '&': '&amp;',
        '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', "/": '&#x2F;', "\\": '&#x2F;'
    }, reg = /[&<>"'/]/ig
    return string.replace(reg, (match) => (map[match]))
}

export const
orderObject = (obj, name) => {
    return obj
    .map  ( (field) => field[name])
    .sort ( (a, b)  => a.localeCompare(b))
    .map  ( (name)  => {
        const 
        id = obj.map(field => field[name]).indexOf(name)
        return <option key={name} value={id}>{name.toUpperCase()}</option>
    })
}

export const
Div = (children='', key='') => {
    <Fragment key={key}>
        {children}
    </Fragment>
}

import { getAll, getType } from '%actions%'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Fragment } from 'react';
