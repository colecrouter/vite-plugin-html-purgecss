import { PurgeCSS, UserDefinedOptions } from "purgecss";
import { OutputChunk, OutputOptions, EmittedAsset } from "rollup";

export default (options: UserDefinedOptions) => {
    let _html = '';
    return {
        name: 'vite-plugin-purgecss',
        enforce: 'post',
        transformIndexHtml(html: string) { _html += html; },
        async generateBundle(_options: OutputOptions, bundle: { [fileName: string]: EmittedAsset | OutputChunk; },) {
            const cssFiles = Object.keys(bundle).filter(key => key.endsWith('.css'));
            if (!cssFiles)
                return;
            for (const file of cssFiles) {
                const purged = await new PurgeCSS().purge({
                    content: [{ raw: _html + " " + Object.entries(bundle).map(([k, v]) => { return (v as OutputChunk).code; }).join("; "), extension: 'html' }],
                    css: [{ raw: (bundle as unknown as EmittedAsset)[file].source }],
                    ...options,
                });
                (bundle as unknown as EmittedAsset)[file].source = purged[0].css;
            }
        }
    };
};
