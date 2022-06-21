module.exports = {
	devServer:             {
		host: 'localhost'
	},
	transpileDependencies: [
		'vuetify'
	],
	css:                   {
		loaderOptions: {
			scss: {
				additionalData: `
          @import "@/scss/variables.scss";
          @import "@/scss/fonts.scss";
        `
			}
		}
	},
	chainWebpack:          config => {
		config.module.rules.delete( "svg" );
	},
	configureWebpack:      {
		module: {
			rules: [
				{
					test:   /\.svg$/,
					loader: 'vue-svg-loader'
				}
			]
		}
	},
	lintOnSave:            false
}
