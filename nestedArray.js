function getLength(array){
    return array.reduce(function fn(acc, item) {
      if(Array.isArray(item)) return item.reduce(fn);
      return acc + 1;
    }, 0);
  }
  console.log(getLength([1, [2, 3]]))
  console.log(getLength([1, [2, [3, 4]]]))
  console.log(getLength([1, [2, [3, [4, [5, 6]]]]]))