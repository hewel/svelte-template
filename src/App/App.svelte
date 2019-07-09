<script>
  import Title from '../Components/Title'

  let hello = 'Hello Svelte!'
  class Time {
    constructor(props) {
      this.props = props
      this.nowDate = new Date()
    }
    get hours() {
      return this.nowDate.getHours() || 0
    }
    get minute() {
      return this.nowDate.getMinutes() || 0
    }
    get second() {
      return this.nowDate.getSeconds() || 0
    }
    get nowTime() {
      const { hours, minute, second } = this
      return `${hours}:${minute}:${second}`
    }
    get millisecond() {
      return this.nowDate.getMilliseconds()
    }
  }

  let time = new Time()
  let nowTime = time.nowTime
  let millisecond = time.millisecond

  let isStop = true

  const handleTimeStart = () => {
    isStop = !isStop
    requestAnimationFrame(timesGo)
  }
  function timesGo() {
    time = new Time()
    nowTime = time.nowTime
    millisecond = time.millisecond
    if (!isStop) {
      requestAnimationFrame(timesGo)
    }
  }
  const titleList = Array.from(new Array(1000)).map((val, index) => index)

</script>

<style>
  h1 {
    font-size: 16px;
    font-weight: 500;
    color: rebeccapurple;
  }
</style>

<h1>{hello}</h1>
<input type="text" bind:value={hello} />
<p>{nowTime}</p>
<p>{millisecond}</p>
<button on:click={handleTimeStart}>{isStop ? 'Start' : 'End'} Time</button>
{#each titleList as title, index(title)}
  <Title title={title}></Title>
{/each}
