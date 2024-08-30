/*
 * @Author: your name
 * @Date: 2020-10-29 00:52:20
 * @LastEditTime: 2021-01-20 19:49:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\jc-react-leaflet\.fatherrc.ts
 */
import { IBundleOptions } from 'father';

import url from 'rollup-plugin-url';
import image from '@rollup/plugin-image';
import copy from 'rollup-plugin-copy'

const options: IBundleOptions = {
  esm: {
    type: 'rollup',
    minify:true,
    file:"lib/jc-react-leaflet",
  },
  extractCSS:true,
  disableTypeCheck:true,
  extraRollupPlugins:[image(),url(
    {
      limit: 10 * 1024,
      emitFiles: true
      }
  ),
  copy({
    targets: [
      { src: 'src/assets', dest: 'dist/' },
    ]
  })
],
};

export default options;
