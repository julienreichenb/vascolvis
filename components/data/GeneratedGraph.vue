<template>
  <v-card class="grey darken-2">
    <v-card-title
      :id="'title-' + graph.id"
      v-text="graph.title"
      class="headline blue"
      contenteditable
    >
    </v-card-title>
    <v-card-text>
      <div class="mb-4">
        <v-layout justify-space-between>
          <div>
            <v-btn
              @click="swap(graph)"
              class="mt-4"
              color="red lighten-1"
              outlined
              depressed
              small
              ><v-icon>mdi-autorenew</v-icon>
              {{ $t('graphs.switch_button') }}
            </v-btn>
            <v-btn
              v-if="
                graph.data.encoding &&
                  graph.data.encoding.color &&
                  graph.data.encoding.shape
              "
              @click="swapColorShape(graph)"
              class="mt-4"
              color="blue lighten-1"
              outlined
              depressed
              small
              ><v-icon>mdi-invert-colors</v-icon>
              {{ $t('graphs.switch_colorshape') }}
            </v-btn>
          </div>
          <v-btn
            @click="save(graph)"
            class="mt-4 mr-4"
            color="green"
            outlined
            depressed
            small
            ><v-icon>mdi-content-save-outline</v-icon>
            {{ $t('graphs.save') }}
          </v-btn>
        </v-layout>
      </div>
      <v-layout flex align-center justify-space-around class="graph-wrapper">
        <div :id="'vis-' + graph.id" class="resize-graph"></div>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    graph: {
      type: Object,
      default: null
    }
  },
  methods: {
    swap() {
      this.$emit('swap', this.graph.id)
    },
    swapColorShape() {
      this.$emit('colorshape', this.graph.id)
    },
    save() {
      this.$emit('save', this.graph.id)
    }
  }
}
</script>
<style scoped>
.resize-graph {
  width: 100%;
}
.graph-wrapper {
  width: 100%;
  height: auto;
  max-height: 800px;
  overflow: auto;
}
</style>
