module.exports = function(v){
  return v.replace(
      /\s[a-z]/g,
      function($1){
        return $1.toLocaleUpperCase()
      }
    ).replace(
      /^[a-z]/,
      function($1){
        return $1.toLocaleUpperCase()
      }
    );
}