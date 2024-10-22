import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'cs'

register('cs', () => import('./locales/cs-CZ.json'));
register('en', () => import('./locales/en-US.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})