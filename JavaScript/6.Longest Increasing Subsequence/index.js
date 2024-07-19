/**
 * 求最长递增子序列
 * @param {number[]} nums
 */
function LIS(nums) {
  if (nums.length === 0) {
    return []
  }
  const results = [[nums[0]]]
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    _update(n)
  }
  function _update(n) {
    for (let i = results.length - 1; i >= 0; i--) {
      const line = results[i]
      const tail = line[line.length - 1]
      if (n > tail) {
        results[i + 1] = [...line, n]
        return
      }
    }
    results[0] = [n]
  }
  return results[results.length - 1]
}

// expect: [1, 2, 3, 6, 9]
console.log(LIS([4, 5, 1, 2, 7, 3, 6, 9]))
