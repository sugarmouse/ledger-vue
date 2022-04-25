<template>
  <div>
    <div class="tags-wrapper">
      <div>
        <span>选中的标签：</span>
        <TagItem :tag="selectedTagName"/>
      </div>
      <div>
        <div class="outgoTags" v-if="type==='-'">
          <ul class="tags" @click="selectTag">
            <li v-for="tag in outgoTagList"
                :value="tag.name"
                :key="tag.name">
              <TagItem :tag="tag"/>
            </li>
          </ul>
        </div>
        <div v-else class="incomeTags tags" >
          <ul class="tags" @click="selectTag">
            <li v-for="tag in incomeTagList"
                :value="tag.name"
                :key="tag.name">
              <TagItem :tag="tag"/>
            </li>
          </ul>
        </div>
      </div>


<!--      <ul class="tags" @click="selectTag">-->
<!--        <li v-if="tag.type===type" v-for="tag in tagList"-->
<!--            :value="tag.name"-->
<!--            :key="tag.name">-->
<!--          <TagItem :tag="tag"/>-->
<!--        </li>-->
<!--      </ul>-->
    </div>
  </div>

</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import store from '@/store/index';
  import {mixins} from 'vue-class-component';
  import {TagHelper} from '@/mixins/TagHelper';
  import TagItem from '@/components/TagItem.vue';
  import _ from 'lodash';

  @Component({
    components: {TagItem}
  })
  export default class Tags extends mixins(TagHelper) {
    @Prop() type!: '-' | '+';
    selectedTagName: Tag = {name: 'none', text: '待选'};

    get tagList(): Tag[] {
      return store.state.tagList;
    }

    get incomeTagList(): Tag[] {
      return this.findTypedTagList('+');
    }

    get outgoTagList(): Tag[] {
      return this.findTypedTagList('-');
    }


    created(): void {
      store.commit('fetchTags');
    }

    selectTag(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Element) {
        const li = target.closest('li');
        if (li) {
          const name = li.getAttribute('value');
          if (name) {
            const selectedTag = this.findTag(name, this.tagList);
            if (selectedTag) this.selectedTagName = selectedTag;
          }
        }
      }
    }

    findTag(tagName: string, tagList: Tag[]) {
      for (let i = 0; i <= tagList.length; i++) {
        if (tagList[i].name === tagName) {
          return (_.cloneDeep(tagList[i]));
        }
      }
    }

    findTypedTagList(type: '-' | '+') {
      // _.filter(this.tagList,)
      return this.tagList.filter(tag => tag.type === type);
    }
  }
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "~@/assets/style/helper.scss";

.tags-wrapper {
  background: #000;

  .tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content: space-evenly;

  }
}


</style>