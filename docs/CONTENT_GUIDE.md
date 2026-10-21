# Content maintenance

The website has no administrative interface. Update public content in the repository and review it through a pull request.

Edit src/data.ts for learning paths, exercises, success criteria and canonical practice links. Edit src/initiatives.json for initiative descriptions/resources while preserving milestone IDs. Resource cards are generated from initiative resources and deduplicated by URL.

Keep instructions self-directed: no required account, assignment, platform submission or approval. Optional peer feedback and GitHub contributions are ordinary learning activities, not an authorization step in this site.

Run lint, typecheck, tests, browser tests and build before deployment. Never add real member records or credentials to public source. Historical administration code and SQL remain recoverable from Git history but are removed from the current application.
