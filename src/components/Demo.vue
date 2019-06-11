<template>
<div @click="$listeners.ljhClick()">ddd</div>
</template>
<script>
export default {
  created () {
    console.log(this.$listeners, 1);
    
  }
}
</script>