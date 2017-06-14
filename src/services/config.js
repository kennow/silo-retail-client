
let {Toast} = SaltUI;
import { queryUrlParams } from '../utils';
import locale from '../locale';

/* 基础配置 */
let config = {};

//是否是restful风格接口
config.isRPC = true;

const urlParams = queryUrlParams();
const envConfigs = {
  release: {
    urlAppRoot: 'http://silo.mcake.org:8082/retail/',
    keyApp: 1050
  },
  test: {
    urlAppRoot: 'http://it.zaofans.com/silo/app/retail/',
    keyApp: 1051
  },
  debug: {
    urlAppRoot: 'http://it.zaofans.com/hawk/app/retail/',
    keyApp: 1052
  }
};

let envKey = urlParams['env'];
if (!envKey) {
  envKey = 'release';
}
const env = envConfigs[envKey];
if (!env) {
  Toast.error(locale.envError + envKey);
}

config.env = env || {};
config.urlParams = urlParams;

module.exports = config;