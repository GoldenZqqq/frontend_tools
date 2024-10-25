import swc from '@swc/core';

const result = swc.transformFileSync('./test.js', {
  jsc: {
    parser: {
      syntax: 'ecmascript'
    },
    target: 'es5'
  }
})
console.log('[ result.code ] >', result.code)