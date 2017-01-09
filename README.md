## Run instructions
The optimized webpage can be accessed from this link: [PageSpeed score optimization page.](https://syhming.github.io/frontend-nanodegree-mobile-portfolio/dist/index.html)

[The PageSpeed Insights page is here.](https://developers.google.com/speed/pagespeed/insights/)


## Optimizations

### Portfolio Site Load Optimizations
At least 90/90 for mobile/desktop PageSpeed score is required for a passing a mark on this project.
I got a 95 for mobile and a 96 for desktop.

I used Gulp as a build/automation tool to make production code from my source code:
- Copy HTML from source directory to distribution directory
- CSS
  - auto-prefix a few attributes for different browsers
  - compile CSS from SASS
  - inline critical CSS
- Minify Images
- Javascript
  - linting
  - uglifying
  - source map building to be searchable after uglification during testing
  - babel transpiling to make ES6 code usable with current browsers

Google's Web Fonts Loader was used to asynchronously load the specific font.

### Dejanking Pizza Generator Site to Achieve 60fps Performance
Modified pizza generation function and pizza sliding function to reduce Forced Synchronous Layouts.

TODO add code blocks
