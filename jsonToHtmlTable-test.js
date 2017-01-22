// Learn more: [API Reference · Jest](https://facebook.github.io/jest/docs/api.html)

const JsonToHtmlTable = require('./jsonToHtmlTable.js');

var tableDom;
var tempValue;

beforeEach(() => {
  tableDom = document.createElement('table');
  tempValue = 0;
});

describe('object test', () => {
  it('should a table', () => {
    let json = {"item1": "A", "item2": "B"};
    JsonToHtmlTable(tableDom, json);
    let tbody = tableDom.childNodes[0];
    expect(tbody.childNodes.length).toBe(2);
    let tr0 = tbody.childNodes[0];
    let tr1 = tbody.childNodes[1];
    expect(tr0.childNodes.length).toBe(2);
    expect(tr0.childNodes[0].textContent).toBe('item1');
    expect(tr0.childNodes[1].textContent).toBe('A');
    expect(tr1.childNodes.length).toBe(2);
    expect(tr1.childNodes[0].textContent).toBe('item2');
    expect(tr1.childNodes[1].textContent).toBe('B');
  });
  it('should process string', () => {
    let json = JSON.stringify({"item1": "A", "item2": "B"});
    JsonToHtmlTable(tableDom, json);
    let tbody = tableDom.childNodes[0];
    expect(tbody.childNodes.length).toBe(2);
    let tr0 = tbody.childNodes[0];
    let tr1 = tbody.childNodes[1];
    expect(tr0.childNodes.length).toBe(2);
    expect(tr0.childNodes[0].textContent).toBe('item1');
    expect(tr0.childNodes[1].textContent).toBe('A');
    expect(tr1.childNodes.length).toBe(2);
    expect(tr1.childNodes[0].textContent).toBe('item2');
    expect(tr1.childNodes[1].textContent).toBe('B');
  });
  it('should call callback', () => {
    JsonToHtmlTable(tableDom, {}, function() { tempValue = 10});
    expect(tempValue).toBe(10);
  });
  it('should throw error when using dom element which is not a table', () => {
    let divDom = document.createElement('div');
  	expect(() => JsonToHtmlTable(divDom, {})).toThrow();
  });
});

describe('array test', () => {
  it('should a table', () => {
    let json = ["A", "B"];
    JsonToHtmlTable(tableDom, json);
    let td = tableDom.childNodes[0].childNodes[0].childNodes[0];
    expect(td.childNodes.length).toBe(2);
    let table0 = td.childNodes[0];
    let text0 = table0.childNodes[0].childNodes[0].childNodes[0].textContent;
    expect(text0).toBe('A');
    let table1 = td.childNodes[1];
    let text1 = table1.childNodes[0].childNodes[0].childNodes[0].textContent;
    expect(text1).toBe('B');
  });
  it('should process string', () => {
    let json = JSON.stringify(["A", "B"]);
    JsonToHtmlTable(tableDom, json);
    let td = tableDom.childNodes[0].childNodes[0].childNodes[0];
    expect(td.childNodes.length).toBe(2);
    let table0 = td.childNodes[0];
    let text0 = table0.childNodes[0].childNodes[0].childNodes[0].textContent;
    expect(text0).toBe('A');
    let table1 = td.childNodes[1];
    let text1 = table1.childNodes[0].childNodes[0].childNodes[0].textContent;
    expect(text1).toBe('B');
  });
  it('should call callback', () => {
    JsonToHtmlTable(tableDom, [], function() { tempValue = 10});
    expect(tempValue).toBe(10);
  });
  it('should throw error when using dom element which is not a table', () => {
    let divDom = document.createElement('div');
  	expect(() => JsonToHtmlTable(divDom, [])).toThrow();
  });
});