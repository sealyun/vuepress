const { path, logger, chalk } = require("@vuepress/shared-utils");

module.exports = options => {
  if (!options.shortname) {
    logger.warn(
      `[vuepress-plugin-disqus-comment] Failed: ${chalk.cyan(
        "shortname is required"
      )}`
    );
    return;
  }

  return {
    name: "disqus-comment",

    enhanceAppFiles: [path.resolve(__dirname, "enhanceAppFile.js")],

    define: {
      DISQUS_OPTIONS: JSON.stringify(options)
    }
  };
};
