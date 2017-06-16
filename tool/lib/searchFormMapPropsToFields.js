module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if( v.type == 'text' || v.type == 'select' ){
        view += (`{
          key: '${v.key}',
          value: {
            ...props.${v.key}
          }
        },`) 
      }else if( v.type == 'date' ){
        view += (`{
          key: '${v.key}',
          value: {
            ...props.${v.key},
            value: props.${v.key} ? getMoment(props.${v.key}.value, dateFormat) : null,
          }
        },`) 
      }else if( v.type == 'dateRange' ) {
        view += (`{
          key: '${v.key}',
          value:  {
            ...props.${v.key},
            value: props.${v.key} && props.${v.key}.value
            ? props.${v.key}.value.length > 0
              ? [
                getMoment(props.${v.key}.value[0], dateFormat),
                getMoment(props.${v.key}.value[1], dateFormat)
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