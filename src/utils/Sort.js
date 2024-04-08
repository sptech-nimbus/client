function mergeSort(arr, param) {
   if (arr.length <= 1) {
      return;
   }

   const mid = Math.floor(arr.length / 2);
   const left = arr.slice(0, mid);
   const right = arr.slice(mid);

   mergeSort(left, param);
   mergeSort(right, param);
   merge(arr, left, right, param);
}

function merge(arr, left, right, param) {
   let leftIndex = 0;
   let rightIndex = 0;
   let arrIndex = 0;

   while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex][param] < right[rightIndex][param]) {
         arr[arrIndex] = left[leftIndex];
         leftIndex++;
      } else {
         arr[arrIndex] = right[rightIndex];
         rightIndex++;
      }
      arrIndex++;
   }

   while (leftIndex < left.length) {
      arr[arrIndex] = left[leftIndex];
      leftIndex++;
      arrIndex++;
   }

   while (rightIndex < right.length) {
      arr[arrIndex] = right[rightIndex];
      rightIndex++;
      arrIndex++;
   }
}