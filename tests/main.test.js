import { describe, it, expect, vi } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';
import { Store, SortedStore } from '../src/Store.js';

describe('Part 1: Functions', () => {
  it('unique() removes duplicates', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    expect(unique([])).toEqual([]);
  });

  it('groupBy() groups objects correctly', () => {
    const data = [{ type: 'a', val: 1 }, { type: 'b', val: 2 }, { type: 'a', val: 3 }];
    const res = groupBy(data, item => item.type);
    expect(res.a.length).toBe(2);
    expect(res.b.length).toBe(1);
  });

  it('chunk() splits array into chunks', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 2)).toEqual([]);
  });

  it('deepClone() clones nested objects and Date', () => {
    const date = new Date();
    const original = { a: 1, b: { c: 2 }, d: date };
    const cloned = deepClone(original);
    
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.d).not.toBe(original.d);
  });

  it('memoize() caches results', () => {
    const fn = vi.fn(x => x * 2);
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1); // Вызвана только 1 раз!
  });

  it('counter() holds state in closure', () => {
    const c = counter(5);
    expect(c.value()).toBe(5);
    expect(c.inc()).toBe(6);
    expect(c.dec()).toBe(5);
  });
});

describe('Part 2: Store & SortedStore Classes', () => {
  it('Store handles items, calculates total and getter count', () => {
    const store = new Store();
    store.add({ name: 'Book A', price: 100, qty: 2 });
    store.add({ name: 'Book B', price: 200, qty: 1 });

    expect(store.count).toBe(2);
    expect(store.total()).toBe(400);
    expect(store.find('Book A')).toEqual({ name: 'Book A', price: 100, qty: 2 });
  });

  it('Store.remove() deletes item', () => {
    const store = new Store([{ name: 'A', price: 10, qty: 1 }]);
    store.remove('A');
    expect(store.count).toBe(0);
  });

  it('Store static method works', () => {
    const defaultStore = Store.createDefault();
    expect(defaultStore.count).toBe(1);
    expect(defaultStore.total()).toBe(1000);
  });

  it('SortedStore inherits and overrides total using super', () => {
    const sortedStore = new SortedStore([{ name: 'B', price: 10.555, qty: 1 }]);
    expect(sortedStore.total()).toBe(10.56);
  });

  it('SortedStore sorts items by name', () => {
    const sortedStore = new SortedStore([
      { name: 'Zebra', price: 10, qty: 1 },
      { name: 'Apple', price: 20, qty: 1 }
    ]);
    const items = sortedStore.getSortedByName();
    expect(items[0].name).toBe('Apple');
  });

  // Edge cases
  it('Edge case: functions handle wrong input types gracefully', () => {
    expect(unique(null)).toEqual([]);
    expect(groupBy(null, null)).toEqual({});
    expect(chunk(null, 0)).toEqual([]);
    expect(deepClone(null)).toBeNull();
  });
});