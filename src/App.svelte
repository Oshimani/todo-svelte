<script lang="ts">
	import axios from "axios";
	import Todos from "./Todos.svelte";
	import Form from "./Form.svelte";
	import { enableMockStore } from "./store";
	import { MockStore } from "./mockStore";

	let useMockStore: boolean = false;
	const unsubscribe = enableMockStore.subscribe((value) => {
		useMockStore = value;
	});

	export let api: string;

	let todos: any[] = [];

	function reload() {
		fetchTodos();
	}

	function deleteTodoFromCachedList(id: string) {
		todos = todos.filter((t) => t._id !== id);
	}

	async function fetchTodos() {
		if (useMockStore) {
			todos = MockStore.instance.getAll();
		} else {
			const result = await axios.get(
				api + "/todos?$limit=50&$sort[created]=-1"
			);

			if (result.status === 200) {
				todos = result.data.data;
			} else {
				throw new Error(result.data);
			}
		}
	}
</script>

<main>
	<h1>Hello wORLD!</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>

	<Form {api} on:submitted={reload} />
	{#if todos}
		<Todos
			{api}
			{todos}
			on:delete={(e) => deleteTodoFromCachedList(e.detail)}
		/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
