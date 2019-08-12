import JsonToHtmlTableEsModule from './jsonToHtmlTable';

let tableDom;
let tempValue;

beforeEach(() => {
  tableDom = document.createElement('table');
  tempValue = 0;
});

describe('object test', () => {
  it('should be a table', () => {
    const json = { item1: 'A', item2: 1, item3: null, item4: undefined };
    JsonToHtmlTableEsModule(tableDom, json);
    const tbody = tableDom.childNodes[0];
    expect(tbody.childNodes.length).toBe(4);

    const tr0 = tbody.childNodes[0];
    expect(tr0.childNodes.length).toBe(2);
    expect(tr0.childNodes[0].textContent).toBe('item1');
    expect(tr0.childNodes[1].textContent).toBe('A');

    const tr1 = tbody.childNodes[1];
    expect(tr1.childNodes.length).toBe(2);
    expect(tr1.childNodes[0].textContent).toBe('item2');
    expect(tr1.childNodes[1].textContent).toBe('1');

    const tr2 = tbody.childNodes[2];
    expect(tr2.childNodes.length).toBe(1);
    expect(tr2.childNodes[0].textContent).toBe('item3');

    const tr3 = tbody.childNodes[3];
    expect(tr3.childNodes.length).toBe(2);
    expect(tr3.childNodes[0].textContent).toBe('item4');
    expect(tr3.childNodes[1].textContent).toBe('undefined');
  });

  it('should process string', () => {
    const json = JSON.stringify({ item1: 'A', item2: 'B' });
    JsonToHtmlTableEsModule(tableDom, json);
    const tbody = tableDom.childNodes[0];
    expect(tbody.childNodes.length).toBe(2);
    const tr0 = tbody.childNodes[0];
    const tr1 = tbody.childNodes[1];
    expect(tr0.childNodes.length).toBe(2);
    expect(tr0.childNodes[0].textContent).toBe('item1');
    expect(tr0.childNodes[1].textContent).toBe('A');
    expect(tr1.childNodes.length).toBe(2);
    expect(tr1.childNodes[0].textContent).toBe('item2');
    expect(tr1.childNodes[1].textContent).toBe('B');
  });

  it('should call callback', () => {
    JsonToHtmlTableEsModule(tableDom, {}, () => (tempValue = 10));
    expect(tempValue).toBe(10);
  });

  it('should throw error when using dom element which is not a table', () => {
    let divDom = document.createElement('div');
    expect(() => JsonToHtmlTableEsModule(divDom, {})).toThrow();
  });
});

describe('array test', () => {
  it('should a table', () => {
    const json = ['A', 'B'];
    JsonToHtmlTableEsModule(tableDom, json);
    const td = tableDom.childNodes[0].childNodes[0].childNodes[0];
    expect(td.childNodes.length).toBe(2);
    const table0 = td.childNodes[0];
    const text0 = table0.childNodes[0].childNodes[0].childNodes[0].textContent;
    expect(text0).toBe('A');
    const table1 = td.childNodes[1];
    const text1 = table1.childNodes[0].childNodes[0].childNodes[0].textContent;
    expect(text1).toBe('B');
  });

  it('should process string', () => {
    const json = JSON.stringify(['A', 'B']);
    JsonToHtmlTableEsModule(tableDom, json);
    const td = tableDom.childNodes[0].childNodes[0].childNodes[0];
    expect(td.childNodes.length).toBe(2);
    const table0 = td.childNodes[0];
    const text0 = table0.childNodes[0].childNodes[0].childNodes[0].textContent;
    expect(text0).toBe('A');
    const table1 = td.childNodes[1];
    const text1 = table1.childNodes[0].childNodes[0].childNodes[0].textContent;
    expect(text1).toBe('B');
  });

  it('should call callback', () => {
    JsonToHtmlTableEsModule(tableDom, [], () => (tempValue = 10));
    expect(tempValue).toBe(10);
  });

  it('should throw error when using dom element which is not a table', () => {
    let divDom = document.createElement('div');
    expect(() => JsonToHtmlTableEsModule(divDom, [])).toThrow();
  });
});
