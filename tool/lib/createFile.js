var fs = require('fs')
var path = require('path')

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
module.exports = function(config){
  for( var k in config ){
    if( config[k].path ){
      ensureDirectoryExistence(config[k].path);
      fs.writeFileSync(
        config[k].path,
        config[k].text,
        {flag:'w'}
      )
    }else {
      for( var kk in config[k] ){
        var fileOb = config[k][kk];
        if( fileOb.path ){
          ensureDirectoryExistence(fileOb.path);
          fs.writeFileSync(
            fileOb.path,
            fileOb.text,
            {flag:'w'}
          )
        }else if(fileOb) {
          for( var kkk in fileOb ){
            var _fileOb = fileOb[kkk];
            if( _fileOb.path ){
              ensureDirectoryExistence(_fileOb.path);
              fs.writeFileSync(
                _fileOb.path,
                _fileOb.text,
                {flag:'w'}
              )
            }
          }
        }
      }
    }
  }
}
