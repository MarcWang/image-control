var fs = require('fs');
var imageControl = require('./index.js');
var MImage = require('./index.js').MImage;


function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

var base64Img = base64_encode('./image/color.jpg');
imageControl.JPEGDecodeBase64ToMImage(base64Img, function(err, res) {
    if (err) {
        console.log(err);
    }
    var image = res;
    imageControl.JPEGEncodeMImageToBuffer(image, 70, function(err, res) {
        if (err) {
            console.log(err);
        }
        var buf = res;
        fs.writeFileSync('output.jpg', buf.data);
    })
})

imageControl.JPEGDecodeBase64ToMImage(base64Img, function(err, res) {
    if (err) {
        console.log(err);
    }
    var image = res;
    imageControl.JPEGEncodeMImageToBase64(image, 70, function(err, res) {
        if (err) {
            console.log(err);
        }
        console.log(res)
    });
})
