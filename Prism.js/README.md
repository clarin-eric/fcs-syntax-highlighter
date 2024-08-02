# Prism.js Syntax Highlighting Grammars

This folder contains syntax grammars for [Prism.js] for FCS query languages:
* [CQL] (Contextual Query Language)
* FCS CQL (Basic Search, simplified CQL)
* FCS-QL (Advanced Search, similar to [CQP])
* [LexCQL] (Lexical Search, subset of CQL, requires _CQL_ grammar)

Test files (according to Prism.js) can be found for each new language in [`tests/`](tests/).

Examples (for use in Prism.js website) can be found in [`examples/`](examples/).

## Usage

Please take a look at: https://prismjs.com/

You can use the FCS grammers in your JS project following the steps:

- add `prismjs` dependency to your `package.js`
- copy the grammar definitions (`prism-{languages}.js`) to your project
- include the FCS language grammars in your JS script
  - either by using direct imports when using JS bundlers, e.g.
    ```js
    // the minimal Prism instance
    import Prism from 'prismjs/components/prism-core'

    // the languages we want to use
    // - SRU CQL
    import './languages/prism-cql'
    // - FCS query languages
    import './languages/prism-fcs-cql'
    import './languages/prism-fcs-fcsql'
    import './languages/prism-fcs-lexcql'
    // other default Prism languages
    import 'prismjs/components/prism-json'
    ```
  - use CDNs and import those language grammar JS scripts in your HTML page
  - or you can use the Prism.js `autoloader` plugin but for this you might need to build the Prism.js artefacts (scripts) yourself? See the [next section](#language-grammar-development) about how this can be done (`components.json` and re-building).

## Language Grammar Development

To develop or modify a Prism language grammar, please use the following setup:

```bash
# clone the Prism sources
# see also https://prismjs.com/extending.html#creating-a-new-language-definition
git clone git@github.com:PrismJS/prism.git
cd prism/

# install (or with pnpm)
npm install
```

Let's symlink our existing grammar files and tests:

- Grammars: `prism-{languages}.js`
- Tests: [`tests/{language}/`](tests/)

```bash
# the grammar JS files
cd prism/components/
ln -s ../../prism-cql.js
ln -s ../../prism-fcs-cql.js
ln -s ../../prism-fcs-fcsql.js
ln -s ../../prism-fcs-lexcql.js

# the grammar test folders
cd prism/tests/languages/
ln -s ../../../tests/cql
ln -s ../../../tests/fcs-cql
ln -s ../../../tests/fcs-fcsql
ln -s ../../../tests/fcs-lexcql
```

Make those languages known to Prism by adding it to the `prism/components.json`:

```json
{
    // ...
    // the list of languages
        "languages": {
        // ...
        "markup": { ... },
        // ... just add our entries after the "markup" definition so that they appear near the top of the list
        "cql": {
                        "title": "Contextual Query Language",
                        "owner": "Querela"
                },
                "fcs-cql": {
                        "title": "FCS CQL (BASIC Search)",
                        "owner": "Querela"
                },
                "fcs-fcsql": {
                        "title": "FCS FCS-QL (Advanced Search)",
                        "owner": "Querela"
                },
                "fcs-lexcql": {
                        "title": "FCS LexCQL (Lexical Search)",
                        "require": "cql",
                        "owner": "Querela"
                },
        // ...
```

Rebuild the project:

```bash
npm run build
```

Test the grammars live:

```bash
npm run start
```

Or, use the test files: (_NOTE: you must use `npm` to run those commands!_)

```bash
# run the tests only for "cql"
npm run test:languages -- --language=cql
# NOTE: if the parsed results section in the test files is empty, it will be filled in
# if it is not empty, then the tests will compare the actual with the expected result

# update test files (overwrite parsed results section)
npm run test:languages -- --language=fcs-lexcql --update
```

[Prism.js]: https://github.com/PrismJS/prism
[CQL]: https://www.loc.gov/standards/sru/cql/spec.html
[CQP]: https://corpora.ficlit.unibo.it/TCORIS/cqpman.pdf
[LexCQL]: https://zenodo.org/doi/10.5281/zenodo.7849753
