module.exports = {
	webpack: function (config, env) {
		config.mode = "development";
		config.optimization.minimize = false;
		return config;
	},
};
