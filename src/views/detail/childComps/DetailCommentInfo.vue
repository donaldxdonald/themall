<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img v-for="(item, index) in commentInfo.images" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {timestampToTime} from 'common/utils.js'

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      return timestampToTime(value)
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 20px 10px;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  
  .header-title {
    font-size: 18px;
  }

  .header-more {
    font-size: 14px;
  }

  .info-user {
    display: flex;
    align-items: center;
    margin-top: 13px;
    margin-bottom: 13px;
  }

  .info-user img {
    width: 37px;
    margin-right: 8px;
  }

  .info-user span {
    font-weight: 500;
  }

  .info-detail p {
    font-size: 14px;
    line-height: 23px;
    color: var(--color-text);
  }

  .info-other {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 12px;
    color: var(--color-tint);
  }

  .info-other .date {
    margin-right: 10px;
  }

  .info-imgs {
    display: flex;
  }

  .info-imgs img {
    width: 75px;
    margin-right: 10px;
  }

</style>