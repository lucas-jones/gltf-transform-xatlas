# glTF-Transform-XAtlas

Not on NPM atm, install via GitHub

```
npm install https://github.com/lucas-jones/gltf-transform-xatlas.git
yarn add https://github.com/lucas-jones/gltf-transform-xatlas.git
pnpm install https://github.com/lucas-jones/gltf-transform-xatlas.git
```

UV Unwrapping function for glTF-Transform

```
import { unwrap } from 'gltf-transform-xatlas';

await unwrap(document, [ mesh1 ]);

await unwrap(document, [ primitive1, primitive2 ]);

// Generates a TEXCOORD_1 attribute where meshs share a single texture spacen

```

## References:
- https://github.com/agrande/xatlas-web