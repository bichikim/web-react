import e from "markdown-it-prism";
import t from "markdown-it-link-attributes";
//#region src/index.ts
async function n() {
	try {
		let { default: n } = await import("vite-plugin-md");
		return n({
			headEnabled: !0,
			markdownItSetup(n) {
				n.use(e), n.use(t, {
					attrs: {
						rel: "noopener",
						target: "_blank"
					},
					pattern: /^https?:\/\//u
				});
			},
			wrapperClasses: "q-page q-mx-auto padding"
		});
	} catch (e) {
		return console.warn("[vite] skip vite-plugin-md:", e), null;
	}
}
//#endregion
export { n as createMarkdownPlugin };
