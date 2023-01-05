export class PriceCalculator {
  private priceRules;
  public items: any[];

  constructor(priceRules: any) {
    this.priceRules = priceRules;
    this.items = [];
  }

  append(...items: any) {
    this.items.push(...items);
  }

  clear() {
    this.items = [];
  }

  getTotal() {
    let total = 0;

    const counts = this.items.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    Object.keys(counts).forEach((k) => {
      let count = counts[k];
      const prices = this.priceRules[k];

      while (count) {
        const items = Object.entries(prices).filter(([k, v]) => {
          return parseInt(k) <= count;
        });
        items.sort((a, b) => (a[0] < b[0] ? 1 : -1));
        const thisPrice: [any, any] = items[0];
        count -= thisPrice[0];
        total += thisPrice[1];
      }
    });

    return total;
  }
}
