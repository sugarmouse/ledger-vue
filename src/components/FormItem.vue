<template>
  <div>
    <label class="formItem">
      <template v-if="type==='date'">
        <span class="name date">{{ this.fieldName }}</span>
        <input :type="type || 'text'"
               class="date-input"
               :value="formatDate(value)"
               @input="onValueChange($event.target.value)"
               :placeholder="placeholder"/>

      </template>
      <template v-else>
        <span class="name notes">{{ this.fieldName }}</span>
        <input :type="type || 'text'"
               :value="value"
               @input="onValueChange($event.target.value)"
               :placeholder="placeholder"/>
      </template>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';


  @Component
  export default class FormItem extends Vue {
    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string;
    @Prop({default: ''}) value!: string;
    @Prop() type?: string;

    onValueChange(value: string) {
      this.$emit('update:value', value);
    }

    formatDate(isoString: string) {
      return dayjs(isoString).format('YYYY-MM-DD');
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.formItem {
  font-size: 14px;
  padding-left: 6px;
  display: flex;
  align-items: center;

  .name {
    display: flex;
    padding: 4px 6px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;

    &.date {
      background: #9854b2;
    }

    &.notes {
      background: #678026;
    }
  }

  input {
    color: $lighter-font;
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding: 0 16px;

  }

}
</style>