## This plugin is under development.

I'm using it for a personal project and don't have time to maintain this plugin.
I recommend forking this repo if you plan on using it.
<br>

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>Terser Webpack Plugin</h1>
	<p>This plugin uses <a href="https://github.com/fabiosantoscode/terser">terser</a> to minify your JavaScript</p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D olsonpm/terser-webpack-plugin
```

<h2 align="center">Usage</h2>

**webpack.config.js**
```js
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  plugins: [
    new TerserPlugin()
  ]
}
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`test`**|`{RegExp\|Array<RegExp>}`| <code>/\\.js$/i</code>|Test to match files against|
|**`include`**|`{RegExp\|Array<RegExp>}`|`undefined`|Files to `include`|
|**`exclude`**|`{RegExp\|Array<RegExp>}`|`undefined`|Files to `exclude`|
|**`cache`**|`{Boolean\|String}`|`false`|Enable file caching|
|**`parallel`**|`{Boolean\|Number}`|`false`|Use multi-process parallel running to improve the build speed|
|**`sourceMap`**|`{Boolean}`|`false`|Use source maps to map error message locations to modules (This slows down the compilation) ⚠️ **`cheap-source-map` options don't work with this plugin**|
|**`terserOptions`**|`{Object}`|[`{...defaults}`](https://github.com/olsonpm/terser-webpack-plugin/tree/master#terseroptions)|`terser` [Options](https://github.com/fabiosantoscode/terser#minify-options)|
|**`extractComments`**|`{Boolean\|RegExp\|Function<(node, comment) -> {Boolean\|Object}>}`|`false`|Whether comments shall be extracted to a separate file, (see [details](https://github.com/webpack/webpack/commit/71933e979e51c533b432658d5e37917f9e71595a) (`webpack >= 2.3.0`)|
|**`warningsFilter`**|`{Function(source) -> {Boolean}}`|`() => true`|Allow to filter terser warnings|

### `test`

**webpack.config.js**
```js
[
  new TerserPlugin({
    test: /\.js($|\?)/i
  })
]
```

### `include`

**webpack.config.js**
```js
[
  new TerserPlugin({
    include: /\/includes/
  })
]
```

### `exclude`

**webpack.config.js**
```js
[
  new TerserPlugin({
    exclude: /\/excludes/
  })
]
```

### `cache`

#### `{Boolean}`

**webpack.config.js**
```js
[
  new TerserPlugin({
    cache: true
  })
]
```

Enable file caching.
Default path to cache directory: `node_modules/.cache/terser-webpack-plugin`.

#### `{String}`

**webpack.config.js**
```js
[
  new TerserPlugin({
    cache: 'path/to/cache'
  })
]
```

Path to cache directory.

### `parallel`

#### `{Boolean}`

**webpack.config.js**
```js
[
  new TerserPlugin({
    parallel: true
  })
]
```

Enable parallelization.
Default number of concurrent runs: `os.cpus().length - 1`.

#### `{Number}`

**webpack.config.js**
```js
[
  new TerserPlugin({
    parallel: 4
  })
]
```

Number of concurrent runs.

> ℹ️  Parallelization can speedup your build significantly and is therefore **highly recommended**

### `sourceMap`

**webpack.config.js**
```js
[
  new TerserPlugin({
    sourceMap: true
  })
]
```

> ⚠️ **`cheap-source-map` options don't work with this plugin**

### [`terserOptions`](https://github.com/fabiosantoscode/terser#minify-options)

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`ecma`**|`{Number}`|`undefined`|Supported ECMAScript Version (`5`, `6`, `7` or `8`). Affects `parse`, `compress` && `output` options|
|**`warnings`**|`{Boolean}`|`false`|Display Warnings|
|**[`parse`](https://github.com/fabiosantoscode/terser#parse-options)**|`{Object}`|`{}`|Additional Parse Options|
|**[`compress`](https://github.com/fabiosantoscode/terser#compress-options)**|`{Boolean\|Object}`|`true`|Additional Compress Options|
|**[`mangle`](https://github.com/fabiosantoscode/terser#mangle-options)**|`{Boolean\|Object}`|`true`|Enable Name Mangling (See [Mangle Properties](https://github.com/fabiosantoscode/terser#mangle-properties-options) for advanced setups, use with ⚠️)|
|**[`output`](https://github.com/fabiosantoscode/terser#output-options)**|`{Object}`|`{}`|Additional Output Options (The defaults are optimized for best compression)|
|**`toplevel`**|`{Boolean}`|`false`|Enable top level variable and function name mangling and to drop unused variables and functions|
|**`nameCache`**|`{Object}`|`null`|Enable cache of mangled variable and property names across multiple invocations|
|**`ie8`**|`{Boolean}`|`false`|Enable IE8 Support|
|**`keep_classnames`**|`{Boolean}`|`undefined`|Enable prevent discarding or mangling of class names|
|**`keep_fnames`**|`{Boolean}`|`false`| Enable prevent discarding or mangling of function names. Useful for code relying on `Function.prototype.name`. If the top level minify option `keep_classnames` is `undefined` it will be overriden with the value of the top level minify option `keep_fnames`|
|**`safari10`**|`{Boolean}`|`false`|Enable work around Safari 10/11 bugs in loop scoping and `await`|

**webpack.config.js**
```js
[
  new TerserPlugin({
    terserOptions: {
      ecma: 8,
      warnings: false,
      parse: {...options},
      compress: {...options},
      mangle: {
        ...options,
        properties: {
          // mangle property options
        }
      },
      output: {
        comments: false,
        beautify: false,
        ...options
      },
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_classnames: undefined,
      keep_fnames: false,
      safari10: false,
    }
  })
]
```

### `extractComments`

#### `{Boolean}`

All comments that normally would be preserved by the `comments` option will be moved to a separate file. If the original file is named `foo.js`, then the comments will be stored to `foo.js.LICENSE`.

#### `{RegExp|String}` or  `{Function<(node, comment) -> {Boolean}>}`

All comments that match the given expression (resp. are evaluated to `true` by the function) will be extracted to the separate file. The `comments` option specifies whether the comment will be preserved, i.e. it is possible to preserve some comments (e.g. annotations) while extracting others or even preserving comments that have been extracted.

#### `{Object}`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`condition`**|`{Regex\|Function}`|``|Regular Expression or function (see previous point)|
|**`filename`**|`{String\|Function}`|`${file}.LICENSE`|The file where the extracted comments will be stored. Can be either a `{String}` or a `{Function<(string) -> {String}>}`, which will be given the original filename. Default is to append the suffix `.LICENSE` to the original filename|
|**`banner`**|`{Boolean\|String\|Function}`|`/*! For license information please see ${filename}.js.LICENSE */`|The banner text that points to the extracted file and will be added on top of the original file. Can be `false` (no banner), a `{String}`, or a `{Function<(string) -> {String}` that will be called with the filename where extracted comments have been stored. Will be wrapped into comment|

### `warningsFilter`

**webpack.config.js**
```js
[
  new TerserPlugin({
    warningsFilter: (src) => true
  })
]
```

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/hulkish">
          <img width="150" height="150" src="https://github.com/hulkish.png?size=150">
          </br>
          Steven Hargrove
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/bebraw">
          <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">
          </br>
          Juho Vepsäläinen
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">
          </br>
          Joshua Wiens
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Alexander Krasnoyarov
        </a>
      </td>
    </tr>
  <tbody>
</table>
