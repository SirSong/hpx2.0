module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if( v.type == 'text' || v.type == 'select' ){
        view += `
      let ${v.key} = queryParams.${v.key} ? queryParams.${v.key}.value : null;
      if(${v.key}) queryParams.${v.key} = queryParams.${v.key}.value;
      else delete queryParams.${v.key};
        `;
      }else if( v.type == 'date' ){
        view += `
      let ${v.key} = queryParams.${v.key} ? queryParams.${v.key}.value : null;
      if(${v.key}) queryParams.${v.key} = queryParams.${v.key}.value;
      else delete queryParams.${v.key};
        `;
      }else if( v.type == 'dateRange' ) {
        view += `
      let ${v.key} = queryParams.${v.key} ? queryParams.${v.key}.value : null;
      delete queryParams.${v.key};
      if(${v.key}){
        if( ${v.key}[0] ) queryParams.${v.startKey} = ${v.key}[0];
        if( ${v.key}[1] ) queryParams.${v.endKey} = ${v.key}[1];
      }
        `;
      }
    }
  )
  return view;
}