const { src, dest } = require("gulp");
const { views, styles, scripts } = require("../config/paths");
const plumber = require("gulp-plumber");
const {
  plumberConfig,
  injectConfig,
  htmlMinConfig,
  minifyHtml,
} = require("../config/pluginsConfig");
const gulpif = require("gulp-if");
const inject = require("gulp-inject");
const rigger = require("gulp-rigger");
const htmlmin = require("gulp-htmlmin");
const htmlpretty = require("gulp-pretty-html");
const { isDev } = require("../utils/env");

const htmlBuild = () => {
  return src(views.src)
    .pipe(plumber(plumberConfig))
    .pipe(rigger())
    .pipe(
      inject(
        gulpif(
          isDev,
          src(scripts.injectDevJs.concat(styles.injectDevCss), { read: false }),
          src([scripts.injectDistJs, styles.injectDistCss], {
            read: false,
          })
        ),
        injectConfig
      )
    )
    .pipe(gulpif(!isDev && minifyHtml, htmlmin(htmlMinConfig), htmlpretty()))
    .pipe(gulpif(isDev, dest(views.dev), dest(views.dist)));
};

module.exports = {
  htmlBuild,
};
