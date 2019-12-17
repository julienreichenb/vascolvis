<template>
  <div class="mt-3">
    <h3>
      {{ $t('graphs.tip_1') }}
      <span class="emphaze">{{ $t('graphs.tip_2') }}</span
      >{{ $t('graphs.tip_3')
      }}<span class="emphaze">{{ $t('graphs.tip_4') }}</span
      >{{ $t('graphs.tip_5') }}
    </h3>
    <img
      class="mt-3"
      src="~/static/demo.gif"
      alt=""
      width="100%"
      style="border: 1px solid white"
    />
  </div>
</template>
<style scoped>
.emphaze {
  font-weight: bold;
  color: dodgerblue;
}
</style>
