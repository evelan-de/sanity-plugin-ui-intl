# sanity-plugin-ui-intl
`sanity-plugin-ui-intl` is a tool designed for developers to enable seamless multilingual support in the Sanity Studio user interface, specifically tailored for studios that are using `next-sanity`. This plugin simplifies the process of managing translations within Sanity Studio, allowing developers to provide a localized experience for content editors and administrators.

## Testing in your Sanity Project
Ensure you have the following script setup in package.json:
```json
{
  "scripts": {
    "link-watch": "plugin-kit link-watch"
  }
}
```
Then in a shell run:
```
npm run link-watch
```
This will publish the package into a local yalc registry
Then in your sanity project's shell run:
```bash
npx yalc add <your-plugin-package> && npx yalc add <your-plugin-package> --link && npm install
```
You can now change your plugin code, which will:
- Trigger a rebuild using your watch task
- Update the files in the plugin output directory
- Trigger a yalc publish --push
- Update the files in your Sanity Studio
- Trigger hot-reload; you should see changes in the Studio
- Note: Yalc will modify your studio package.json when linking; remember to revert it when you are done testing. You should also put .yalc and yalc.lock into .gitignore.

When you are done testing, you can run
```bash
npx yalc remove <your-plugin-package> && yarn install
```
to restore the version in package.json.

See [sanity-io/plugin-kit(https://github.com/sanity-io/plugin-kit)
