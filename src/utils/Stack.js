class Stack {
   constructor(array = []) { this.items = array; }

   push(element) { this.items.push(element); }
   pop() {
      if (this.isEmpty()) return null;
      return this.items.pop();
   }
   peek() { return this.items[this.items.length - 1]; }
   isEmpty() { return this.items.length == 0; }
   getItems() { return this.items; }
}

export default Stack;