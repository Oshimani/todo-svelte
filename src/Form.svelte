<script lang="ts">
    import axios from "axios";
    import { createEventDispatcher } from "svelte";
    export let api;

    const dispatch = createEventDispatcher();

    let todo = {
        title: "",
        description: "",
        important: false,
        completed: false,
    };

    function toggleImportant() {
        todo.important = !todo.important;
    }

    function submit() {
        console.log("Submit");

        axios.post(api + "/todos/", todo).then((r) => {
            todo.title = "";
            todo.description = "";
            todo.important = false;
            dispatch("submitted");
        });
    }
</script>

<div class="card">
    <div>
        <input type="text" placeholder="Title" bind:value={todo.title} />
    </div>

    <textarea
        bind:value={todo.description}
        placeholder="Description text"
        rows="2"
    />

    <section>
        <button class:important={todo.important} on:click={toggleImportant}
            >❗</button
        >

        <button on:click={submit}>✔️</button>
    </section>
</div>

<style>
    input[type="text"],
    textarea {
        background-color: rgba(255, 255, 255, 0.3);
        color: white;
        margin-bottom: 0;
    }
    input[type="text"] {
        font-size: 2em;
        height: 100%;
    }
    textarea {
        resize: none;
        flex-grow: 1;
    }
    .card {
        background: linear-gradient(135deg, coral 30%, rgb(0, 186, 233));
        border-radius: 15px;
        display: flex;
        gap: 2em;
        padding: 12px 24px;
        justify-content: space-between;
        color: white;
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
