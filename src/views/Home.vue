<template>
  <div class="home">
    <h1>pomodoro timer</h1>
    <timer />
  </div>
</template>

<script>
// @ is an alias to /src
import timer from '../components/timer'

export default {
  name: 'Home',
  components: {
    timer
  }
}
</script>
