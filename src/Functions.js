export function formatTimeBySeconds(s) {
    let h = Math.floor(s / 3600);
    s %= 3600;

    let m = Math.floor(s / 60);
    s %= 60;

    if (m < 10)
        m = '0' + m;
    if (s < 10)
        s = '0' + s;

    s = m + ':' + s;

    if (h > 0)
        if (h < 10)
            s = '0' + h + ':' + s;
        else
            s = h + ':' + s;

    return s;
}

export function toPercent(a, b) {
    return a / b * 100 + '%';
}

export function checkIfName(val) {
    if (val == "")
        return false;

    let ind0 = val.charCodeAt(0);
    if (ind0 < 65 || ind0 > 90)
        return false;

    for (let i = 1; i < val.length; i++) {
        let id = val.charCodeAt(i);
        if (id < 65 || (id > 90 && id < 97) || id > 122)
            return false;
    }

    return true;
}

export function checkIfNumber(val) {
    if (val.length < 6) {
        return false;
    }

    let cnt40 = val.split('(').length - 1;
    let cnt41 = val.split(')').length - 1;
    let cnt43 = val.split('+').length - 1;
    let cnt = cnt40 + cnt41 + cnt43;

    if ((cnt40 > 1 || cnt41 > 1 || cnt43 > 1) || (cnt == 1 || cnt == 2))
        return false;

    if (cnt == 3) {
        if (val.indexOf('(') != 0 || val.indexOf(')') != 5 || val.indexOf('+') != 1)
            return false;

        val = val.replace('(', '');
        val = val.replace('+', '');
        val = val.replace(')', '');
        val = val.replace(' ', '');
    }

    for (let i = 0; i < val.length; i++) {
        let id = val.charCodeAt(i);
        if (id < 48 || id > 57) {
            return false;
        }
    }

    return true;
}

export function checkIfEMail(val) {
    if (val.length < 5)
        return false;

    if (val.split('@').length - 1 != 1)
        return false;

    let ind64 = val.indexOf('@');
    if (ind64 == 0 || ind64 > val.length - 4)
        return false;

    let l = val.split('@')[0];
    let r = val.split('@')[1];

    for (let i = 0; i < l.length; i++) {
        let id = l.charCodeAt(i);
        if ((id < 48 || (id > 57 && id < 65) || (id > 90 && id < 97) || id > 122) && ((i == 0) || (id != 46 && id != 95)))
            return false;
    }

    if (r.split('.').length - 1 != 1)
        return false;

    let ind46 = r.indexOf('.');
    if (ind46 == 0 || ind46 == r.length - 1)
        return false;

    l = r.split('.')[0];
    r = r.split('.')[1];

    for (let i = 0; i < l.length; i++) {
        let id = l.charCodeAt(i);
        if (id < 48 || (id > 57 && id < 65) || (id > 90 && id < 97) || id > 122)
            return false;
    }

    for (let i = 0; i < r.length; i++) {
        let id = r.charCodeAt(i);
        if (id < 65 || (id > 90 && id < 97) || id > 122)
            return false;
    }

    return true;
}
