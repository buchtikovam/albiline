import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';


export function getTabValue(url: string, storedTabs: HeaderTab[]) {
	if (url === "/" || url === "/en" || url === "/sk" || url === "/pl") return url;

	const urlLength = url.split('/').length;

	for (const tab of storedTabs) { // found match, no need to continue
		if (url === tab.url) {
			return url
		}
	}

	for (const tab of storedTabs) {
		const tabUrlLength = tab.url.split('/').length;

		if (url.includes(tab.url)) {
			if ( // => /param/[var]
				tab.treeDepth === 0 &&
				urlLength > 2 &&
				tabUrlLength === urlLength - 1
			) {
				return `/${url.split('/').slice(1, -1)[0]}`;
			}

			if ( // => /param/param/[var]
				tab.treeDepth === 1 &&
				urlLength > 3 &&
				tabUrlLength === urlLength - 1
			) {
				return `/${url.split('/').slice(1, -1).join('/')}`;
			}

			if ( // => /param/param/[var]/.../[var]
				tab.treeDepth === 1 &&
				urlLength > 5 &&
				tabUrlLength === urlLength - 3
			) {
				return `/${url.split('/').slice(1, 3).join('/')}`;
			}

			if ( // => /param/param/param/[var]
				tab.treeDepth === 2 &&
				urlLength > 4 &&
				tabUrlLength === urlLength - 1
			) {
				return `/${url.split('/').slice(1, -1).join('/')}`;
			}
		}
	}

	return "";
}
