module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if( v.type == 'text' || v.type == 'select' ){
        view += (`{
          key: '${v.key}',
          value: {
            value: queryParams.${v.key} ? queryParams.${v.key}.value : null
          }
        },`)
      }else if( v.type == 'dateRange' ) {
        view += (`{
          key: '${v.key}',
          value: {
            value: queryParams.${v.key} && queryParams.${v.key}.value
              ? queryParams.${v.key}.value.length > 0
                ? [
                  this.getMomentFormat(queryParams.${v.key}.value[0]),
                  this.getMomentFormat(queryParams.${v.key}.value[1]),
                ].filter((v) => !!v)
                : null
              : null,
          }
        },`)
      }
    }
  )
  return view;
}