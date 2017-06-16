module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if( v.type == 'checkout' ){
        view += (`
          values.${v.key} = ${JSON.stringify(v.data)}.filter(
            v => v.value == values.${v.key}
          )
          values.${v.key} = values.${v.key}.length ? values.${v.key}[0].key : '';
        `)
      }else if( v.type == 'date' ){
        view += (`
          values.${v.key} = values.${v.key} ? values.${v.key}.format('YYYY/MM/DD') : '';
        `)
      }else if( v.type == 'dateRange' ){
        view += (`
          values.${v.key} = values.${v.key}
            ? values.${v.key}.length > 0
              ? [
                getMoment(values.${v.key}[0], 'YYYY/MM/DD'),
                getMoment(values.${v.key}[1], 'YYYY/MM/DD')
              ].filter((v) => !!v)
              : ''
            : '';
        `)
      }
    }
  )
  return view;
}