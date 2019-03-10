export default class Stat {
  constructor(max) {
    this.max = max;
    this.current = max;
  }
  replenish(){
    this.current = this.max;
  }
  regenerate(){
    if (this.current < this.max)
      this.current++;
  }
  increase(value){
    if (this.current < this.max)
      this.current += value;
    if (this.current > this.max)
      this.current = this.max;
  }
  increaseOpenly(value){
    this.current += value;
  }
  recoverProportion(proportion){
    var missing = this.max - this.current;
    this.increase(Math.round(missing*proportion));
  }
  recoverProportionOfTotal(proportion){
    this.increase(Math.round(this.max*proportion));
  }
  reduce(value){
    if (this.current > 0)
      this.current-= value;
    if (this.current < 0)
      this.current = 0;
  }
  extend(value){
    this.max += value;
    this.current += value;
  }
  multiply(value){
    this.max *= value;
    this.current *= value;
  }
  contract(value){
    this.max -= value;
    if (this.max < 0)
      this.max = 0;
    if (this.current > this.max)
      this.current = this.max;
  }
  getText(){
    return this.current + "/" + this.max;
  }
  getProportion(){
    if (this.max === 0)
      return 0;
    else
      return this.current / this.max;
  }
  notFull(){
    return this.current !== this.max;
  }
  empty(){
    return this.current <= 0;
  }
  getRemaining(){
    return this.max - this.current;
  }
}