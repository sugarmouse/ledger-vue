<template>
  <div>
    <div class="tags-wrapper">
      <div class="selected-tag">
        <span class="describe">选中的标签：</span>
        <TagItem :tag="selectedTagName"/>
      </div>
      <div class="all-tags">
        <div class="outgoTags" v-if="type==='-'">
          <ul class="tags" @click="selectTag">
            <li class="tag" v-for="tag in outgoTagList"
                :value="tag.name"
                :key="tag.name">
              <TagItem :tag="tag"/>
            </li>
            <li class="tag more">
              <TagItem :tag="{name:'more',text:'更多'}" class-prefix="more"/>
            </li>
            <li class="hidden"></li>
            <li class="hidden"></li>
            <li class="hidden"></li>
            <li class="hidden"></li>
            <li class="hidden"></li>
          </ul>
        </div>
        <div v-else class="incomeTags">
          <ul class="tags" @click="selectTag">
            <li class="tag" v-for="tag in incomeTagList"
                :value="tag.name"
                :key="tag.name">
              <TagItem :tag="tag"/>
            </li>
            <li class="tag more">
              <TagItem :tag="{name:'more',text:'更多'}" class-prefix="more"/>
            </li>
            <li class="hidden"></li>
            <li class="hidden"></li>
            <li class="hidden"></li>
            <li class="hidden"></li>
            <li class="hidden"></li>


          </ul>
        </div>
      </div>
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
    selectedTagName: Tag = {name: 'toBeSelected', text: '待选'};

    get tagList(): Tag[] {
      return store.state.tagList;
    }

    get incomeTagList(): Tag[] {
      return this.findTypedTagList('+').slice(0, 8);
    }

    get outgoTagList(): Tag[] {
      return this.findTypedTagList('-').slice(0, 9);
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
  display: flex;
  flex-direction: column;

  .selected-tag {
    margin: 10px 20px 0 20px;
    padding: 8px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: lighten($background,30%);


    .describe {
      font-size: 24px;

    }
  }

  .all-tags {
    .incomeTags, .outgoTags {
      .tags {
        font-size: 14px;
        padding: 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;

        .tag {
          margin: 4px;

          .more-tagItem-wrapper {
            color: $lighter-font;
            background: lighten($background, 30%);
          }
        }

        .hidden {
          width: 60px;
          margin: 4px;
          height: 0;
        }
      }
    }

  }


}


</style>