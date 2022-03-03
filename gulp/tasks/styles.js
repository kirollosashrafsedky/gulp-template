const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const { styles } = require("../config/paths");
const { plumberConfig } = require("../config/pluginsConfig");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("gulp-cssnano");
const filter = require("gulp-filter");
const cache = require("gulp-cached");
const gulpif = require("gulp-if");
const concat = require("gulp-concat");
const { isDev } = require("../utils/env");

const stylesBuild = () => {
  return src(styles.src)
    .pipe(plumber(plumberConfig))
    .pipe(cache("stylesBuilding"))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulpif(isDev, dest(styles.dev)))
    .pipe(gulpif(!isDev, filter("**/*.css")))
    .pipe(gulpif(!isDev, concat(styles.prodOut)))
    .pipe(gulpif(!isDev, cssnano()))
    .pipe(gulpif(!isDev, sourcemaps.write(".")))
    .pipe(gulpif(!isDev, dest(styles.dist)));
};

module.exports = {
  stylesBuild,
};
