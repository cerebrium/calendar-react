import sass from 'rollup-plugin-sass'
import pkg from './package.json'

export default {
    input: 'src/Calendar.jsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      }
    ],
    plugins: [
      sass({ insert: true })
    ],
    external: ['react', 'react-dom']
}