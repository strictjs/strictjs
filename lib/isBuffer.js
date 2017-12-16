function isBuffer(obj) {
    if (obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
    } else {
        return false
    }
}

module.exports = isBuffer;