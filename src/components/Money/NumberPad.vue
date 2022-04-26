<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <div class="button-wrapper">
        <button @click="inputContent">1</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">2</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">3</button>
      </div>
      <div class="button-wrapper">
        <button @click="remove">删除</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">4</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">5</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">6</button>
      </div>
      <div class="button-wrapper">
        <button @click="clear">清空</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">7</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">8</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">9</button>
      </div>
      <div class="button-wrapper ok">
        <button @click="ok" class="ok">OK</button>
      </div>
      <div class="button-wrapper zero">
        <button @click="inputContent" class="zero">0</button>
      </div>
      <div class="button-wrapper">
        <button @click="inputContent">.</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    output = '0';

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent as string;

      if (this.output.length === 16) return;
      if (this.output.indexOf('.') >= 0 && input === '.') return;
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += button.textContent;
        }
        return;
      }
      this.output += button.textContent;
      return;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
      return;
    }

    clear() {
      this.output = '0';
      return;
    }

    ok() {
      this.$emit('update-output', this.output);
      this.$emit('submit', this.output);
      this.output = '0';

    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;

    color: $lighter-font;
    font-size: 36px;
    font-family: Consolas, monospace;
    margin:9px 6px;
    text-align: right;
    height: 60px;
    line-height: 60px;
    background-color: #777777;
  }

  .buttons {
    @extend %clearFix;
    background: #141414;

    > .button-wrapper {
      width: 25%;
      height: 64px;
      float: left;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }

      > button {
        color: $lighter-font;
        width: 100%;
        height: 100%;
        background: #616161;
        border: none;
        border-radius: 10px;

        &.ok {
          background: #007AFF;
        }
      }
    }
  }
}
</style>