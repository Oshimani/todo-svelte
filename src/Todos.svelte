<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import Todo from "./Todo.svelte";
    const dispatch = createEventDispatcher();

    export let api: string;
    export let todos: any[];
</script>

<div>
    Hi, I am the todos component!
    <p>
        I will send requests to
        <code>{api}</code>

        {#each todos as todo (todo._id)}
            <div class="todo" transition:slide>
                <Todo
                    {api}
                    {todo}
                    on:delete={(e) => dispatch(e.type, e.detail)}
                />
            </div>
        {/each}
    </p>
</div>

<style>
    .todo {
        margin-bottom: 18px;
    }
    .todo:last-of-type {
        margin-bottom: initial;
    }
</style>
