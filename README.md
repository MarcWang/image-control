# image-control

### `JPEGEncodeMImageToBase64(image, quality, callback)`

**image** = MImage object

**quality** = the quality of compress image (JPEG formet)

**callback** = callback function(error, base64Img)

### `JPEGEncodeMImageToBuffer(image, quality, callback)`

**image** = MImage object

**quality** = the quality of compress image (JPEG formet)

**callback** = callback function(error, buffer)

### `JPEGDecodeFileToMImage(path, callback)`

**path** = src image path

**callback** = callback function(error, MImage object)

### `JPEGDecodeBase64ToMImage(data, callback)`

**data** = src image with base64 format

**callback** = callback function(error, MImage object)

### `JPEGDecodeBufferToMImage(data, callback)`

**data** = src image with buffer

**callback** = callback function(error, MImage object)
