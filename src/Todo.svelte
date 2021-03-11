<script lang="ts">
    import axios from "axios";
    import { createEventDispatcher } from "svelte";
    import { MockStore } from "./mockStore";
    import { enableMockStore } from "./store";
    export let todo;
    export let api;

    let useMockStore: boolean = false;
    const unsubscribe = enableMockStore.subscribe((value) => {
        useMockStore = value;
    });

    const dispatch = createEventDispatcher();

    // $: showImportant = todo.important;

    function toggleImportant() {
        todo.important = !todo.important;
        todo.modified = new Date();
        if (useMockStore) {
            MockStore.instance.toggleImportant(todo.id);
        } else {
            axios.patch(api + "/todos/" + todo._id, {
                important: todo.important,
            });
        }
    }

    function toggleCompleted() {
        todo.completed = !todo.completed;
        todo.modified = new Date();
        if (useMockStore) {
            MockStore.instance.toggleCompleted(todo.id);
        } else {
            axios.patch(api + "/todos/" + todo._id, {
                completed: todo.completed,
            });
        }
    }

    function updateTitle() {
        todo.title = title;
        todo.modified = new Date();
        if (useMockStore) {
            MockStore.instance.updateTitle(todo.id, title);
        } else {
            axios.patch(api + "/todos/" + todo._id, { title: todo.title });
        }
        showTitleInput = false;
    }

    function deleteTodo() {
        if (useMockStore) {
            MockStore.instance.delete(todo.id);
        } else {
            axios
                .delete(api + "/todos/" + todo._id)
                .then(() => dispatch("delete", todo._id));
        }
    }

    let showTitleInput = false;
    let title = todo.title;
</script>

<div class="card">
    {#if showTitleInput}
        <!-- content here -->
        <div>
            <input type="text" bind:value={title} />
            <button on:click={updateTitle}>✔️</button>
        </div>
    {:else}
        <!-- else content here -->
        <h1
            class:completed={todo.completed}
            on:click={() => (showTitleInput = !showTitleInput)}
        >
            {todo.title}
        </h1>
    {/if}

    <p>{todo.description || ""}</p>

    <section class="dates">
        <div>
            {#if todo.created}
                <div>
                    created: {new Date(todo.created).toLocaleString()}
                </div>
            {/if}
            {#if todo.modified}
                <div>
                    modified: {new Date(todo.modified).toLocaleString()}
                </div>
            {/if}
        </div>
    </section>

    <section>
        <button on:click={toggleCompleted}>
            {#if todo.completed}
                ❌
            {:else}
                ✔️
            {/if}
        </button>

        <button class:important={todo.important} on:click={toggleImportant}
            >❗</button
        >

        <button on:click={deleteTodo}>🗑️</button>
    </section>
</div>

<style>
    .completed {
        text-decoration: line-through;
    }
    .card {
        background: linear-gradient(135deg, coral 30%, rgb(0, 186, 233));
        border-radius: 15px;
        display: flex;
        padding: 12px 24px;
        justify-content: space-between;
        color: white;
        gap: 2em;
    }
    p {
        flex-grow: 1;
    }

    section {
        display: flex;
        gap: 1em;
        align-items: center;
        flex-direction: row;
        justify-content: center;
    }

    button {
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 28px;
        line-height: 0;
        font-weight: bold;
        color: lightcoral;
        cursor: pointer;
        margin-bottom: 0;
    }
    .important {
        background-color: lightcoral;
    }
</style>
