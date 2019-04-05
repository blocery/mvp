import ComUtil from '../src/util/ComUtil';

//USAGE: $npm test

test('compareDate test', () => {
    let date1 = '2018-09-01';
    let date2 = '2018-10-01';

    let ret = ComUtil.compareDate(date1, date2);
    expect(ret).toBe(-1);
});

test('objectAttrCopy test', () => {
    let target = {a:1, b:2, c:3};
    let source =      {b:5, c:6, d:7};

    ComUtil.objectAttrCopy(target, source);

    expect(target.a).toBe(1);
    expect(target.b).toBe(5);
    expect(target.d).toBe(undefined);
});

/* SmartContract Test fail: MetaMask Problem
test('Set_Get test', () => {
    let storage = new SimpleStorageSC();
    storage.initContract('/SimpleStorageSC.json');


    storage.setValue(1);
    let ret = storage.getValue();
    expect(ret).toBe(1);
});
*/