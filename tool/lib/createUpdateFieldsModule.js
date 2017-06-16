module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      view += (`
          ${v.key}: {
            value: data.${v.key} || null
          },`)
    }
  )
  return view;
}