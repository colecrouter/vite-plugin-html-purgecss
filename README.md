#### Fork of [vite-plugin-html-purgecss](https://github.com/Jax-p/vite-plugin-html-purgecss)

# vite-plugin-purgecss
This [Vite](https://github.com/vitejs/vite) plugin automatically removes unused CSS based on HTML & JS output using [PurgeCSS](https://github.com/FullHuman/purgecss).

- Lightweight install and runtime environment
- 

## Install

**npm**
```
npm i vite-plugin-purgecss
```

## Usage
### Configuration
Use plugin in your Vite config (`vite.config.ts`)
```ts
import htmlPurge from 'vite-plugin-purgecss'

export default {
    plugins: [
        htmlPurge({ ...options }),
    ]
}
```

### Usage with Javascript and non-HTML frameworks
When using frameworks that don't export to HTML (or settings styles via JS), PurgeCSS typically doesn't find anything. To fix this, I've hardcoded the plugin to feed JS code into PurgeCSS (instead of just HTML) to scan for any inlined CSS strings.

This isn't a perfect solution, as it doesn't catch explicit style changes (`x.style.color = 'red';`). This could potentially be resolved with [FullHuman/purgecss-from-js](https://github.com/FullHuman/purgecss-from-js/), but it uses CJS which is incompatible with Vite. A better solution might present itself later on.

That being said, this solution should work with most frameworks. It should even work better than a normal PurgeCSS CLI pass. I tested with [SvelteKit](https://kit.svelte.dev/) with [@sveltejs/adapter-cloudflare](https://www.npmjs.com/package/@sveltejs/adapter-cloudflare), and it worked flawlessly.

## Options
Optionally supply a `UserDefinedOptions` [as you would with PurgeCSS](https://purgecss.com/configuration.html#options).

##### If some of your CSS classes aren't making it to the final output, try adding them to `safelist` in the options object.

An example of this would be Popovers in Bootstrap. Sometimes, the arrow on popovers won't be picked up by PurgeCSS, so I might set:
```ts
safelist: [ /popover/ ]
```
to manually whitelist all Popover related classes.
