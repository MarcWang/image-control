var fs = require('fs');
var jpeg = require('jpeg-js');
var MImage = require('./module/MImage.js');
var MColor = require('./module/MColor.js');

function JPEGEncodeMImageToBase64(image, quality, callback) {
    JPEGEncodeMImageToBuffer(image, quality, function(err, res) {
        if (err) {
            callback(err);
        }
        var buf = res;
        var base64Img = new Buffer(buf.data).toString('base64');
        callback(null, base64Img);
    });
}

function JPEGEncodeMImageToBuffer(image, quality, callback) {
    if (image && image instanceof MImage) {
        var width = image.getWidth(),
            height = image.getHeight(),
            channel = image.getChannel(),
            data = image.getData(),
            length = width * height * channel;

        const buf = new Buffer(length);
        var idx = 0;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var value = data[i][j];
                buf.writeUInt8(value.R, idx++);
                buf.writeUInt8(value.G, idx++);
                buf.writeUInt8(value.B, idx++);
                buf.writeUInt8(value.A, idx++);
            }
        }

        try {
            var rawImageData = {
                data: buf,
                width: width,
                height: height
            };
            var jpegImageData = jpeg.encode(rawImageData, quality);
            callback(null, jpegImageData);
            return;
        } catch (e) {
            callback(e);
            return;
        }
    } else {
        callback("err");
        return;
    }

}

function JPEGDecodeFileToMImage(path, callback) {
    var data = fs.readFileSync(path);
    JPEGDecodeBufferToMImage(data, function(err, res) {
        callback(err, res);
    })
}

function JPEGDecodeBase64ToMImage(data, callback) {
    var data = new Buffer(data, 'base64');
    JPEGDecodeBufferToMImage(data, function(err, res) {
        callback(err, res);
    })
}

function JPEGDecodeBufferToMImage(data, callback) {
    var jpegData = null;
    try {
        jpegData = jpeg.decode(data);
    } catch (e) {
        callback(e);
        return;
    }

    if (jpegData == null) {
        callback("decode error");
        return;
    }

    var dstData = []
    var width = jpegData.width;
    var height = jpegData.height;
    var channel = 4;
    var data = jpegData.data;
    var idx = 0;
    for (var i = 0; i < height; i++) {
        var rowData = [];
        for (var j = 0; j < width; j++) {
            var r = data.readUInt8(idx++);
            var g = data.readUInt8(idx++);
            var b = data.readUInt8(idx++);
            var a = data.readUInt8(idx++);
            rowData.push(MColor.RGBA(r, g, b, a));
        }
        dstData.push(rowData);
    }
    var image = new MImage(width, height, channel, dstData);
    callback(null, image);
}

module.exports = {
    JPEGDecodeBufferToMImage: JPEGDecodeBufferToMImage,
    JPEGDecodeFileToMImage: JPEGDecodeFileToMImage,
    JPEGDecodeBase64ToMImage: JPEGDecodeBase64ToMImage,
    JPEGEncodeMImageToBuffer: JPEGEncodeMImageToBuffer,
    JPEGEncodeMImageToBase64: JPEGEncodeMImageToBase64,
    MImage: MImage,
    MColor: MColor
}
