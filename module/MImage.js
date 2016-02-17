var MColor = require('./MColor.js');

var image = function(width, height, channel, data) {
    this._width = -1;
    this._height = -1;
    this._channel = -1;
    this._data = [];

    this.setWidth(width);
    this.setHeight(height);
    this.setChannel(channel);
    this.setData(data);
}

image.prototype.setWidth = function(value) {
    var self = this;
    if (typeof(value) == 'number') {
        self._width = value;
        return true;
    } else {
        return false;
    }
}

image.prototype.getWidth = function(){
    var self = this;
    return self._width;
}

image.prototype.setHeight = function(value) {
    var self = this;
    if (typeof(value) == 'number') {
        self._height = value;
        return true;
    } else {
        return false;
    }
}

image.prototype.getHeight = function(){
    var self = this;
    return self._height;
}

image.prototype.setChannel = function(value) {
    var self = this;
    if (typeof(value) == 'number') {
        self._channel = value;
        return true;
    } else {
        return false;
    }
}

image.prototype.getChannel = function(){
    var self = this;
    return self._channel;
}

image.prototype.setData = function(value) {
    var self = this;
    if (value && typeof(value) == 'object') {
        self._data = value;
        return true;
    } else {
        return false;
    }
}

image.prototype.getData = function(){
    var self = this;
    return self._data;
}

image.prototype.setPixel = function(x, y, value) {
    var self = this;

    if( !value || typeof(value) != 'object' ){
        return false;
    }

    if( !self._data[y][x] ){
        return false;
    }

    if( value.type != MColor.TYPE.RGBA ){
        return false;
    }

    self._data[y][x] = value;
    return true;
}

image.prototype.getPixel = function(x, y) {
    var self = this;
    var color = null;

    try{
        var value = self._data[y][x];
        if( value ){
            color = value;
        }
    }
    catch(e){
        console.log("err")
    }

    return color;
}

module.exports = image;
