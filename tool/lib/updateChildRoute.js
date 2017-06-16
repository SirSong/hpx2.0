var fs = require('fs')
var path = require('path')

module.exports = function(routeName, pathName){
  var ahchor = '//--anchor--';
  var newContent = `
          require('./${routeName}').default(store),
          //--anchor--`;
  var routesIndexJS = pathName;
  var routesIndexJsText = 
    fs.readFileSync(routesIndexJS, {
        encoding: 'utf-8'
    });
  routesIndexJsText = routesIndexJsText
    .replace(ahchor,newContent)

  fs.writeFileSync(
    pathName,
    routesIndexJsText,
    {flag:'w'}
  )
  console.log('success to add new route in routes/index.js');
}


