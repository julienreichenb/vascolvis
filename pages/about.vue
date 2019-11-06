<template>
  <div>
    <v-toolbar class="indigo darken-3">
      <v-toolbar-title class="mb-4 white--text">
        <h3>Le projet Vasco</h3>
      </v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-card-text class="pt-4">
        <div>
          <h4>Introduction</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas
            nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu
            suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie
            iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel
            id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet
            magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus
            vel massa sagittis tempus. Sed et urna sed eros gravida eleifend
            feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor
            ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis,
            tempor interdum turpis nec, dignissim rhoncus eros.
          </p>
          <h4>Data Visualisation</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas
            nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu
            suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie
            iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel
            id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet
            magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus
            vel massa sagittis tempus. Sed et urna sed eros gravida eleifend
            feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor
            ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis,
            tempor interdum turpis nec, dignissim rhoncus eros.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas
            nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu
            suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie
            iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel
            id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet
            magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus
            vel massa sagittis tempus. Sed et urna sed eros gravida eleifend
            feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor
            ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis,
            tempor interdum turpis nec, dignissim rhoncus eros.
          </p>
        </div>
        <v-btn color="white indigo--text" depressed @click="back()">
          <v-icon>mdi-keyboard-backspace</v-icon> | Retour
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    back() {
      try {
        if (localStorage.getItem('usertoken') !== null) {
          this.$router.push({ name: 'import' })
        } else {
          this.$router.push({ name: 'index' })
        }
      } catch {
        this.$router.push({ name: 'index' })
      }
    }
  }
}
</script>
