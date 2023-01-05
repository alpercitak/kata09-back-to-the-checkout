import { PriceCalculator } from './priceCalculator';
import { priceRules } from './priceRules';

describe('totals', () => {
  let priceCalculator: any;

  beforeEach(() => {
    priceCalculator = new PriceCalculator(priceRules);
  });

  it('[] should return [0]', () => {
    expect(priceCalculator.getTotal()).toBe(0);
  });

  it('[A] should return [50]', () => {
    priceCalculator.append('A');
    expect(priceCalculator.getTotal()).toBe(50);
  });

  it('[AB] should return [80]', () => {
    priceCalculator.append('A', 'B');
    expect(priceCalculator.getTotal()).toBe(80);
  });

  it('[CDBA] should return [115]', () => {
    priceCalculator.append('C', 'D', 'B', 'A');
    expect(priceCalculator.getTotal()).toBe(115);
  });

  it('[AA] should return [100]', () => {
    priceCalculator.append('A', 'A');
    expect(priceCalculator.getTotal()).toBe(100);
  });

  it('[AAA]" should return [130]', () => {
    priceCalculator.append('A', 'A', 'A');
    expect(priceCalculator.getTotal()).toBe(130);
  });

  it('[AAAA]" should return [180]', () => {
    priceCalculator.append('A', 'A', 'A', 'A');
    expect(priceCalculator.getTotal()).toBe(180);
  });

  it('[AAAAA]" should return [230]', () => {
    priceCalculator.append('A', 'A', 'A', 'A', 'A');
    expect(priceCalculator.getTotal()).toBe(230);
  });

  it('[AAAAAA]" should return [260]', () => {
    priceCalculator.append('A', 'A', 'A', 'A', 'A', 'A');
    expect(priceCalculator.getTotal()).toBe(260);
  });

  it('[AAAB] should return [160]', () => {
    priceCalculator.append('A', 'A', 'A', 'B');
    expect(priceCalculator.getTotal()).toBe(160);
  });

  it('[AAABB] should return [175]', () => {
    priceCalculator.append('A', 'A', 'A', 'B', 'B');
    expect(priceCalculator.getTotal()).toBe(175);
  });

  it('[AAABBD] should return [190]', () => {
    priceCalculator.append('A', 'A', 'A', 'B', 'B', 'D');
    expect(priceCalculator.getTotal()).toBe(190);
  });

  it('[DABABA] should return [190]', () => {
    priceCalculator.append('D', 'A', 'B', 'A', 'B', 'A');
    expect(priceCalculator.getTotal()).toBe(190);
  });
});

describe('incremental', () => {
  let priceCalculator: any;

  beforeAll(() => {
    priceCalculator = new PriceCalculator(priceRules);
  });

  it('step [A]', () => {
    priceCalculator.append('A');
    expect(priceCalculator.getTotal()).toBe(50);
  });

  it('step [AB]', () => {
    priceCalculator.append('B');
    expect(priceCalculator.getTotal()).toBe(80);
  });

  it('step [ABA]', () => {
    priceCalculator.append('A');
    expect(priceCalculator.getTotal()).toBe(130);
  });

  it('step [ABAA]', () => {
    priceCalculator.append('A');
    expect(priceCalculator.getTotal()).toBe(160);
  });

  it('step [ABAAB]', () => {
    priceCalculator.append('B');
    expect(priceCalculator.getTotal()).toBe(175);
  });
});
