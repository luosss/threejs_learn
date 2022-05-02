<template>
  <div class="three_canvas" ref="threeTarge"></div>
</template>


<script lang="ts">
import { defineComponent,onMounted,ref } from 'vue'
import {TEngine} from './assets/ts/TEngine'


export default defineComponent({
  setup() {
    const threeTarge = ref(null)

    onMounted(()=> {
      const TE = new TEngine(threeTarge.value!)

    })

    return {
      threeTarge
    }
  },
})
</script>

<style>
.three_canvas {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
