import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export class UrlParamsHandler extends Vue {
  urlParamsHandle(paras: string | (string | null)[], defaultParas: string) {
    return (typeof paras === 'string') ? paras : defaultParas;
  }
}