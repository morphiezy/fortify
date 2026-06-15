<template>
  <section class="hero">
    <a
      class="hero-eyebrow"
      :href="heroEyebrow.href"
      target="_blank"
    >
      {{ heroEyebrow.label }}
    </a>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ heroEyebrow: { href: string; label: string } }>();
</script>
