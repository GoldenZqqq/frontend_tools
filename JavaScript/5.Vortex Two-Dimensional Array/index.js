/**
 * 给定 n 行 m 列，构造一个漩涡型二维数组
 * @param {行} n
 * @param {列} m
 * @returns
 */
function vortex(n, m) {
  const nums = new Array(n).fill(0).map(() => new Array(m).fill(0))
  let i = 0 // row index
  let j = 0 // column index
  let stepI = 0
  let stepJ = 1
  let count = 1 // value to be inserted
  function _isBlock() {
    return !nums[i + stepI] || nums[i + stepI][j + stepJ] !== 0
  }
  while (1) {
    // 填充数字
    nums[i][j] = count++
    // 判断是否需要改变方向
    if (_isBlock()) {
      // 重新计算stepI和stepJ
      if (stepI === 0) {
        stepI = stepJ
        stepJ = 0
      } else {
        stepJ = -stepI
        stepI = 0
      }
      if (_isBlock()) break
    }

    // 改变i和j
    i += stepI
    j += stepJ
  }

  return nums
}

console.log(vortex(5, 6))
