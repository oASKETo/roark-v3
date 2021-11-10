module.exports = {
	webpack: function (config, env) {
		config.resolve.alias["react-dom$"] = "react-dom/profiling";
		config.resolve.alias["react-dom"] = "react-dom/profiling";
		config.resolve.alias["scheduler/tracing"] = "scheduler/tracing-profiling";

		config.optimization = {
			minimize: false,
			splitChunks: {
				chunks: "all",
				name: true,
			},
			runtimeChunk: true,
		};

		return config;
	},
};
