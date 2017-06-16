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
      }else if( v.type == 'image' || v.type == 'file' ){
        view += (`
          values.${v.key} = JSON.stringify(values.${v.key});
        `)
      }
    }
  )
  return view;
}