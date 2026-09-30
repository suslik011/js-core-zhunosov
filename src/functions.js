// 1. Уникальные элементы массива
export function unique(arr) {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
}

// 2. Группировка объектов по вычисляемому ключу
export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr) || typeof keyFn !== 'function') return {};
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

// 3. Разбиение массива на куски определенного размера
export function chunk(arr, size) {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// 4. Глубокая копия объектов, массивов и Date
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  const copy = {};
  Object.keys(obj).forEach(key => {
    copy[key] = deepClone(obj[key]);
  });
  return copy;
}

// 5. Мемоизация (Замыкание)
export function memoize(fn) {
  if (typeof fn !== 'function') return fn;
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// 6. Счетчик (Замыкание)
export function counter(initialValue = 0) {
  let count = typeof initialValue === 'number' ? initialValue : 0;
  return {
    inc() {
      count += 1;
      return count;
    },
    dec() {
      count -= 1;
      return count;
    },
    value() {
      return count;
    }
  };
}