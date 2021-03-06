const config = {
	projectName    : 'client',
	date           : '2018-8-26',
	designWidth    : 750,
	deviceRatio    : {
		'640': 2.34 / 2,
		'750': 1,
		'828': 1.81 / 2
	},
	sourceRoot     : 'src',
	outputRoot     : 'dist',
	plugins        : {
		babel     : {
			sourceMap: true,
			presets  : [
				'env'
			],
			plugins  : [
				'transform-class-properties',
				'transform-decorators-legacy',
				'transform-object-rest-spread',
				'lodash'
			]
		},
		typescript: {
			compilerOptions: {
				allowSyntheticDefaultImports: true,
				baseUrl                     : '.',
				declaration                 : false,
				experimentalDecorators      : true,
				jsx                         : 'preserve',
				jsxFactory                  : 'Nerv.createElement',
				module                      : 'commonjs',
				moduleResolution            : 'node',
				noImplicitAny               : false,
				noUnusedLocals              : true,
				outDir                      : './dist/',
				preserveConstEnums          : true,
				removeComments              : false,
				rootDir                     : '.',
				sourceMap                   : true,
				strictNullChecks            : true,
				target                      : 'es6'
			},
			include        : [
				'src/**/*'
			],
			exclude        : [
				'node_modules'
			],
			compileOnSave  : false
		}
	},
	defineConstants: {},
	copy           : {
		patterns: [
			{from: 'public', to: 'dist/asset'},
		],
		options : {}
	},
	weapp          : {
		module: {
			postcss: {
				pxtorem     : {
					rootValue    : 16,
					propList     : ['*'],
					minPixelValue: 1
				},
				autoprefixer: {
					enable: true
				},
				url         : {
					enable: true,
					limit : 10240
				}
			}
		}
	},
	h5             : {
		publicPath     : '/',
		staticDirectory: 'static',
		module         : {
			postcss: {
				autoprefixer: {
					enable: true
				}
			}
		}
	}
};

module.exports = function (merge) {
	if (process.env.NODE_ENV === 'development') {
		return merge({}, config, require('./dev'));
	}
	return merge({}, config, require('./prod'));
};
