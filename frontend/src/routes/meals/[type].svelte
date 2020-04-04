<script context="module">

  export async function preload({ params, query }) {
    const res = await this.fetch(
      `https://frwvarjcb2.execute-api.eu-west-1.amazonaws.com/prod/meals/${params.type}`
    );
    const data = await res.json();

    if (res.status === 200) {
      return { meals: data.meals.sort(), type: params.type};
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
    export let meals;
    export let type;
</script>

<div class="flex flex-col items-center">
  <div>

  </div>
  <div >
    <ul class="list-disc list-outside">
        {#each meals as meal}
        <li class="text-xl p-2"><a href="/meals/{type}/meal/{meal.ref['@ref']['id']}">{ meal.data.name }</a></li>
      {/each}
    </ul>
  </div>
</div>

