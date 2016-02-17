var COLOR_TYPE = {
    RGBA: 'RGBA'
}

function RGBA(r, g, b, a) {
    var color = {
        type: COLOR_TYPE.RGBA,
        R: -1,
        G: -1,
        B: -1,
        A: -1
    }

    if (typeof(r) == 'number') {
        color.R = r;
    }

    if (typeof(g) == 'number') {
        color.G = g;
    }

    if (typeof(b) == 'number') {
        color.B = b;
    }

    if (typeof(a) == 'number') {
        color.A = a;
    }

    return color;
};


module.exports = {
    TYPE: COLOR_TYPE,
    RGBA: RGBA
}
