<template>
  <section class="container">
    <div class="timer">
      <div class="graphics"></div>
      <div class="time">
        <h1>{{ timer.duration.minutes }}.{{ timer.duration.seconds }}</h1>
      </div>
    </div>
    <div class="actions grid">
      <div class="sessions">
        <vs-row justify="center">
          <vs-col v-for="option in options" :key="option.key" :w="sessWidth">
            <p>{{ option.title }}</p>
            <div class="session-items">
              <vs-button
                color="#00996d"
                transparent
                square
                class="item"
                @click="subTo(option.key)"
              >
                -
              </vs-button>
              <h2 class="item">{{ option.lengthInMinutes }}</h2>
              <vs-button
                color="#00996d"
                transparent
                square
                class="item"
                @click="addTo(option.key)"
              >
                +
              </vs-button>
            </div>
          </vs-col>
        </vs-row>
        <vs-button
          block
          v-if="!timer.active"
          color="#00996d"
          size="xl"
          square
          gradient
          @click="startTimer"
        >
          Start
        </vs-button>
        <vs-button
          :active="timer.active"
          block
          v-if="timer.active"
          color="#00996d"
          size="xl"
          square
          gradient
          @click="resetTimer"
        >
          Restart
        </vs-button>
        <p>{{ screen }}</p>
        <p>{{ sessWidth }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      timer: {
        active: false,
        ticker: null,
        interval: null,
        duration: {
          minutes: 25,
          seconds: 0
        }
      },
      timerInt: null,
      options: [
        {
          key: 0,
          title: 'Session Length',
          lengthInMinutes: 25
        },
        {
          key: 1,
          title: 'Break Length',
          lengthInMinutes: 5
        }
      ]
    }
  },
  computed: {
    screen() {
      return {
        'is-phone': this.$screen.sm,
        'is-tablet': this.$screen.md,
        'is-desktop': this.$screen.lg,
        'can-touch': this.$screen.touch,
        breakpoint: this.$screen.breakpoint
      }
    },
    sessWidth() {
      if (this.$screen.breakpoint == 'sm') {
        return 6
      }
      if (this.$screen.breakpoint == 'md') {
        return 5
      }
      if (this.$screen.breakpoint == 'lg') {
        return 4
      }
      if (this.$screen.breakpoint == 'xl') {
        return 2
      }
    }
  },
  methods: {
    MinToSec() {
      this.timer.duration.minutes--
      this.timer.duration.seconds = 59
    },
    timerUtils() {
      this.timerInt = setInterval(
        function() {
          if (
            this.timer.duration.minutes === 0 &&
            this.timer.duration.seconds === 0
          ) {
            this.resetTimer()
            alert('time is up')
          }
          if (this.timer.duration.seconds === 0) {
            this.MinToSec()
          } else {
            this.timer.duration.seconds--
          }
        }.bind(this),
        1000
      )
    },
    startTimer() {
      this.timer.active = true
      this.MinToSec()
      this.timerUtils()
    },
    resetTimer() {
      this.timer.active = false
      clearInterval(this.timerInt)
      this.timer.duration.seconds = 0
      this.timer.duration.minutes = this.options[0].lengthInMinutes
    },
    addTo(target) {
      if (this.options[target].lengthInMinutes <= 99) {
        this.options[target].lengthInMinutes++
        if (this.options[target].key == 0) {
          this.timer.duration.minutes++
        }
      }
    },
    subTo(target) {
      if (this.options[target].lengthInMinutes > 0) {
        this.options[target].lengthInMinutes--
        if (this.options[target].key == 0) {
          this.timer.duration.minutes--
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.timer {
  h1 {
    font-size: 10vh;
  }
}
.session-items {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .item {
    flex-grow: 3;
  }
}
.start {
  @include bg-gradient;
  @include shadow;
  width: 290px;
  text-align: center;
  color: white;
  padding: 20px 20px;
  cursor: pointer;
  &:hover {
    background: $green;
  }
  &:active {
    @include bg-gradient;
  }
}
</style>
