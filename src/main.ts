import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		api:'http://localhost:3030'
	}
});

export default app;