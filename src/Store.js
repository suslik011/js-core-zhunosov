export class Store {
  #items = []; // Приватное поле

  constructor(initialItems = []) {
    if (Array.isArray(initialItems)) {
      this.#items = initialItems.filter(item => item && typeof item.price === 'number' && typeof item.qty === 'number');
    }
  }

  get count() {
    return this.#items.length;
  }

  static createDefault() {
    return new Store([
      { name: 'Книга', price: 500, qty: 2 }
    ]);
  }

  add(item) {
    if (item && typeof item.price === 'number' && typeof item.qty === 'number') {
      this.#items.push(item);
    }
  }

  remove(name) {
    this.#items = this.#items.filter(item => item.name !== name);
  }

  find(name) {
    return this.#items.find(item => item.name === name) || null;
  }

  total() {
    return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  getItems() {
    return [...this.#items];
  }
}

export class SortedStore extends Store {
  // Переопределяем метод total с математическим округлением до 2 знаков
  total() {
    const baseTotal = super.total();
    return Math.round(baseTotal * 100) / 100;
  }

  // Сортировка по имени
  getSortedByName() {
    return this.getItems().sort((a, b) => a.name.localeCompare(b.name));
  }
}