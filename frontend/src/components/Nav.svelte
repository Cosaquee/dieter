<script>
  export let segment;
  const pages = ["breakfast", "snack", "dinner", "supper"];

  function capitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
</script>

<nav>
  <ul class="flex">
    {#each pages as page}
      <li class="mr-6">
        <a
          class="text-blue-500 hover:text-blue-800"
          aria-current={segment === page ? 'page' : undefined}
          href="meals/{page}">
          {capitalize(page)}
        </a>
      </li>
    {/each}
    <li class="mr-6">
      <a class="text-blue-500 hover:text-blue-800" href="#">Shopping List</a>
    </li>
  </ul>
</nav>
<!-- 
<nav>
	<ul>
		<li><a >Meals</a></li>
	</ul>
</nav> -->
