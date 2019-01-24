# Campaign Site Generator

In an interview I was asked how I would produce a multi-language, single-page campaign, without the benefit of server side rendering. The result needed to provide for translations, produce static sites that woould have readable OG Meta and other SEO, and be maintainable. This is an implementaion intended to be similar to the production solution in use at the company.

## Usage

### Setting up a Template

Template files are located in 'src/templates' and a 'basic' template is provided. The Locale Service presently implements two i18n methods for adding translatable segments to your template, as follow. Any content which will vary between locales, including meta information can be added via these methods.

#### Standard Translation

```node
provider.translate('greeting.normal');
// will look for or create a nested JSON property for translation
// your can disable nexted object syntax in src/config/i18n.config.js
```

#### Cardinal Translation

```node
provider.translateN('% dog', 3);
// will look for or create a nested JSON property for cardinal translation
```

### Locales

Locales and other i18n properties are configured through `src/config/i18n.config.js`. The i18n locales property will control which locales the templates are built under.

### Builds

Running the `npm run build` command will take the javascript template file and build it for each configured locale. A template or output directory can be specified with flags `npm run build -- -t <template> -o <output>` without these flags the default template `basic` and the default output `dist` will be used.

### Translations

With each build, i18n will gather the translation phrases into their respective `.json` files under `src/locales`. You can then edit these files to add the appropriate translations. Translated text will default to the `'en'` locale if not specified.

### Tests and Coverage

`npm run check` Will run all `test.js` unit tests and run code coverage through c8.

### Local Server

A local server is included to run the files. Running `npm run serve` will start the server and open a browser window at `localhost:5555`. From there you can browse to your output folder and individual locales to review.

### Deployment

Automated deployment to AWS S3 Buckets is in the works.
