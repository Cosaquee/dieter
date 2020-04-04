<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(
      `https://frwvarjcb2.execute-api.eu-west-1.amazonaws.com/prod/meals/${params.type}/${params.id}`
    );
    const data = await res.json();

    if (res.status === 200) {
      return { meal: data.meal };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { cart } from "./../../../../stores/store.js";

  export let meal;
  export let ingredients = [];
  export let openCart = false;

  function addToCart() {
    console.log("Added to cart")
  }
</script>

<style>
  input:checked + svg {
    display: block;
  }
</style>

<div class="bg-white overflow-hidden shadow rounded-lg">
  <div class="border-b border-gray-200 px-4 py-5 sm:px-6 flex justify-between">
    <p class="text-4xl">{meal.name}</p>
    <span class="inline-flex rounded-md shadow-sm">
      <button
        on:click={() => (openCart = true)}
        type="button"
        class="inline-flex items-center px-4 py-2 border border-gray-300
        text-base leading-6 font-medium rounded-md text-gray-700 bg-white
        hover:text-gray-500 focus:outline-none focus:border-blue-300
        focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50
        transition ease-in-out duration-150">
        Shopping list
      </button>
    </span>
  </div>
  <div class="px-4 py-5 sm:p-6">

    <section class="mb-2">
      <p class="text-3xl">Ingredients</p>
      <ul class="ml-2 list-disc list-outside">
        {#each meal.ingredients as ingredient}
          <li class="text-xl">{ingredient}</li>
        {/each}
      </ul>
    </section>

    <section class="mb-2">
      <p class="text-3xl">Steps</p>
      <ul class="ml-2 list-disc list-outside">
        {#each meal.steps as step}
          <li class="text-xl">{step}</li>
        {/each}
      </ul>
    </section>
  </div>
</div>
{ingredients}
{#if openCart}
  <div
    class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex
    sm:items-center sm:justify-center">
    <div
      x-transition:enter="ease-out duration-300"
      x-transition:enter-start="opacity-0"
      x-transition:enter-end="opacity-100"
      x-transition:leave="ease-in duration-200"
      x-transition:leave-start="opacity-100"
      x-transition:leave-end="opacity-0"
      class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75" />
    </div>

    <div
      x-transition:enter="ease-out duration-300"
      x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0
      sm:scale-95"
      x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
      x-transition:leave="ease-in duration-200"
      x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
      x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0
      sm:scale-95"
      class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl
      transform transition-all sm:max-w-sm sm:w-full sm:p-6">
      <div>
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full
          bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24">
            <path
              class="heroicon-ui"
              d="M17 16a3 3 0 1 1-2.83 2H9.83a3 3 0 1 1-5.62-.1A3 3 0 0 1 5
              12V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v1h14a1 1 0 0 1 .9 1.45l-4 8a1
              1 0 0 1-.9.55H5a1 1 0 0 0 0 2h12zM7 12h9.38l3-6H7v6zm0 8a1 1 0 1 0
              0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Ingredient list
          </h3>
          <div class="mt-2">
            {#each meal['shopping-list'] as order}
              <label class="flex justify-start items-start">
                <div
                  class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex
                  flex-shrink-0 justify-center items-center mr-2
                  focus-within:border-blue-500">
                  <input
                    type="checkbox"
                    bind:group={ingredients}
                    value={order}
                    class="opacity-0 absolute" />
                  <svg
                    class="fill-current hidden w-4 h-4 text-green-500
                    pointer-events-none"
                    viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
                <div class="select-none">
                  {order.name} {order.value.value} {order.value.type}
                </div>
              </label>
            {/each}
          </div>
        </div>
      </div>

      <div
        class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3
        sm:grid-flow-row-dense">
        <span class="flex w-full rounded-md shadow-sm sm:col-start-2">
          <button
            on:click={addToCart()}
            type="button"
            class="inline-flex justify-center w-full rounded-md border
            border-transparent px-4 py-2 bg-indigo-600 text-base leading-6
            font-medium text-white shadow-sm hover:bg-indigo-500
            focus:outline-none focus:border-indigo-700
            focus:shadow-outline-indigo transition ease-in-out duration-150
            sm:text-sm sm:leading-5">
            Add to shopping list
          </button>
        </span>
        <span
          class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
          <button
            on:click={() => (openCart = false)}
            type="button"
            class="inline-flex justify-center w-full rounded-md border
            border-transparent px-4 py-2 bg-indigo-600 text-base leading-6
            font-medium text-white shadow-sm hover:bg-indigo-500
            focus:outline-none focus:border-indigo-700
            focus:shadow-outline-indigo transition ease-in-out duration-150
            sm:text-sm sm:leading-5">
            Go back to meal
          </button>
        </span>
      </div>
    </div>
  </div>
{/if}
