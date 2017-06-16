module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if( 
         v.type == 'text' 
      || v.type == 'select' 
      || v.type == 'checkout'
      || v.type == 'email' 
      || v.type == 'number'
      || v.type == 'phone' 
      || v.type == 'password'
      || v.type == 'smsCode'
      || v.type == 'textarea' ){
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
            value: props.${v.key} && props.${v.key}.value ? moment(props.${v.key}.value) : null,
          }
        },`)
    }else if( v.type == 'image' || v.type == 'file' ){
      view += (`{
          key: '${v.key}',
          value: {
            ...props.${v.key},
            value: props.${v.key} 
                && props.${v.key}.value
                && props.${v.key}.value.map(
                  (v,i) => {
                    return v.response && v.response.success ? {
                        id: v.response.data.id,
                        uid:  v.response.data.id,
                        name: v.response.data.name,
                        url: v.response.data.url,
                        status: 'done',
                      }
                      : {
                        id: v.id,
                        uid: v.uid || v.id,
                        name: v.name,
                        url: v.url,
                        status: v.status,
                      }
                  }
                )
          }
        },`)
      }
    }
  )
  return view;
}