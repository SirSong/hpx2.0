module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      view += (`
        ${v.key}: {
          value: null,
          editable: true,
        },`)
    }
  )
  return view;
}