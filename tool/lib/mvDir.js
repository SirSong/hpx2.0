var path = require('path')
var mv = require('mv');

module.exports = function(srcPathName, distPathName){
  mv(
    srcPathName,
    distPathName,
    {mkdirp: true},
    function(err){
      if(err) {
          console.log('fail:移动文件夹失败，'+`mv ${srcPathName} ${distPathName}`);
      } else {
          console.log(`successfully created a new route!`)
      }
    }
  )
}

