/**
 * Created by leonard on 2017/2/11.
 */

Array.prototype.swap = function (i, j) {
  let temp;
  temp = this[j];
  this[j] = this[i];
  this[i] = temp;
};

/**
 * 插入排序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * 稳定排序算法
 * @returns {Array}
 */
Array.prototype.insertionSort = function () {
  let temp;
  let i, j;
  for (i = 1; i < this.length; i++) {
    temp = this[i];
    for (j = i - 1; j >= 0 && temp < this[j]; j--) {
      this[j + 1] = this[j];
    }
    this[j + 1] = temp;
  }
  return this;
};

/**
 * 选择排序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * 不稳定排序算法（交换元素时破坏了稳定性）
 * @returns {Array}
 */
Array.prototype.selectionSort = function () {
  let minIndex;
  let i, j;
  for (i = 0; i < this.length; i++) {
    minIndex = i;
    for (j = i + 1; j < this.length; j++) {
      if (this[minIndex] > this[j]) {
        minIndex = j;
      }
    }
    this.swap(i, minIndex);
  }
  return this;
};

/**
 * 冒泡排序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * 稳定排序算法
 * @returns {Array}
 */
Array.prototype.bubbleSort = function () {
  let i, j;
  for (i = 0; i < this.length - 1; i++) {
    for (j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        this.swap(j, j + 1);
      }
    }
  }
  return this;
};

/**
 * 归并排序
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n + logn) final 数组空间 n + 递归栈空间 logn
 * 稳定排序算法
 * @returns {Array}
 */
Array.prototype.mergeSort = function () {
  let merge = function (left, right) {
    let final = [];
    while (left.length && right.length) {
      final.push(left[0] < right[0] ? left.shift() : right.shift());
    }
    return final.concat(left, right);
  };

  if (this.length < 2) {
    return this;
  }
  let mid = Math.floor(this.length / 2);
  return merge(this.slice(0, mid).mergeSort(), this.slice(mid).mergeSort());
};

/**
 * 堆排序
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(1)
 * 不稳定排序算法
 * @returns {Array}
 */
Array.prototype.heapSort = function () {
  let maxHeapify = (start, end) => {
    let dad = start;
    let son = 2 * dad;
    if (son >= end) {
      return;
    }
    if (son + 1 < end && this[son] < this[son + 1]) {
      son += 1;
    }
    if (this[dad] < this[son]) {
      this.swap(dad, son);
      maxHeapify(son, end);
    }
  };
  // 将数组 this 构建为大根堆
  let length = this.length;
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    maxHeapify(i, length);
  }
  // 依次取出堆顶元素放入堆外，再继续调整为大根堆
  for (let i = length - 1; i > 0; i--) {
    this.swap(0, i);
    maxHeapify(0, i);
  }
  return this;
};

/**
 * 快速排序
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(1)
 * 不稳定排序算法
 * @returns {Array}
 */
Array.prototype.quickSort = function (start = 0, end = this.length - 1) {
  if (start === end) {
    return this;
  }
  let pivot = this[start];
  let left = start + 1;
  let right = end;
  while (left < right) {
    while (this[left] <= pivot && left < right) {
      left++;
    }
    while (this[right] >= pivot && left < right) {
      right--;
    }
    this.swap(left, right);
  }
  if (this[left] < pivot) {
    this.swap(start, left);
  }
  this.quickSort(start, left - 1);
  this.quickSort(left, end);
  return this;
};

const arr = [1, 5, 2, 19, -1, 8];
console.log(arr.slice().insertionSort());
console.log(arr.slice().selectionSort());
console.log(arr.slice().bubbleSort());
console.log(arr.slice().mergeSort());
console.log(arr.slice().heapSort());
console.log(arr.slice().quickSort());
