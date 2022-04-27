import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import _ from 'lodash';

@Component
export class TagHelper extends Vue {
  findTag(tagName: string, tagList: Tag[]) {
    for (let i = 0; i <= tagList.length; i++) {
      if (tagList[i].name === tagName) {
        return (_.cloneDeep(tagList[i]));
      }
    }
  }
}