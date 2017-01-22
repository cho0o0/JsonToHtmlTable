(function(){
  let template = (strs) => {
    return function(...vals) {
      return strs.map((s, i) => `${s}${vals[i] || ""}`).join("");
    };
  }

  let build = v => {
    if(v === null) return '';
    if(Array.isArray(v)) return buildArray(v);
    if(typeof v === 'object') return buildObject(v);
    return buildElement(v);
  }
  let buildElement = el => '<td>' + el + '</td>';
  let buildObject = obj => {
    let templ = template`<tr>${0}${1}</tr>`
    return Object.keys(obj).map(key => templ(build(key), build(obj[key]))).join('');
  }
  let buildArray = arr => {
    let templ = template`<table>${0}</table>`;
    return '<td>' + arr.map(el => templ(build(el))).join('') + '</td>';
  }

  let JsonToHtmlTable = (dom, json, callback) => {
    if(dom.nodeName !== 'TABLE') throw new Error('Whoops! The DOM seems not to be a table.');
    dom.innerHTML = (typeof json === 'string') ? build(JSON.parse(json)) : build(json);
    if(typeof callback === 'function') callback();
  }
  
  module.exports = JsonToHtmlTable;
})();