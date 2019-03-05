export default {
  from(array) {
    return array[this.choice(array.length) - 1];
  },
  choice(options) {
    return Math.ceil(this.random() * options);
  },
  chance(percent) {
    return this.random() <= percent / 100;
  },
  random() {
    return Math.random();
  }
}