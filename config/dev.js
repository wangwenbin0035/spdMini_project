import path from 'path';
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  alias: {
    '@/api': path.resolve(__dirname,'..','src/api'),
    '@/assets': path.resolve(__dirname,'..','src/assets'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    esnextModules: ['taro-ui']
  }
}
