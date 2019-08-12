const template = strs => (...vals) => strs.map((s, i) => `${s}${vals[i] || ''}`).join('');

const build = v => {
  if (v === null) return '';
  if (Array.isArray(v)) return buildArray(v);
  if (typeof v === 'object') return buildObject(v);
  return buildElement(v);
};

const buildElement = el => `<td>${el}</td>`;
const buildObject = obj => {
  const templ = template`<tr>${0}${1}</tr>`;
  return Object.entries(obj)
    .map(([k, v]) => templ(build(k), build(v)))
    .join('');
};
const buildArray = arr => {
  let templ = template`<table>${0}</table>`;
  return `<td>${arr.map(el => templ(build(el))).join('')}</td>`;
};

export default (dom, json, callback) => {
  if (dom.nodeName !== 'TABLE') throw new Error('Whoops! The DOM seems not to be a table.');
  dom.innerHTML = typeof json === 'string' ? build(JSON.parse(json)) : build(json);
  if (typeof callback === 'function') callback();
};
