export default {
  from(array) {
    return array[this.choice(array.length) - 1];
  },
  choice(options) {
    options = options > 0 ? options : 0;
    return Math.ceil(this.random() * options);
  },
  chance(percent) {
    return this.random() <= percent / 100;
  },
  random() {
    return Math.random();
  }
}