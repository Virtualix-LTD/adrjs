# Deploying to NPM

In case of non-code updates, tag the package as such

```shell
yarn run build # needed
npm version prerelease --preid=next
npm publish
```
