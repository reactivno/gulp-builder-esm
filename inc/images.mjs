import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';

const {
  src,
  dest
} = gulp;
const isProd = ( process.env.NODE_ENV === 'production' ) || ( process.env.NODE_ENV === 'static' );

const copyRasterGraphics = () => {
  return src( [ './src/img/**/**.{jpg,jpeg,png,gif,webp}' ] )
    .pipe( gulpIf( isProd, imagemin() ) )
    .pipe( dest( './build/img/' ) );
};

const copyVectorGraphics = () => {
  return src( [ './src/img/**/**.svg', '!./src/img/sprite/**.svg' ] )
    .pipe( gulpIf( isProd, svgmin() ) )
    .pipe( dest( './build/img/' ) );
};

const compileSprite = () => {
  return src( './src/img/sprite/**.svg' )
    .pipe( gulpIf( isProd, svgmin() ) )
    .pipe( svgSprite( {
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      },
    } ) )
    .pipe( dest( './build/img/' ) );
}

export {
  copyRasterGraphics,
  copyVectorGraphics,
  compileSprite,
};