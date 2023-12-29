<script setup lang="ts">

import {computed, ref} from "vue";

const playLine = [
  {"name": "虾米", "url": "https://jx.xmflv.com/?url=", "mobile": 1},
  {"name": "纯净", "url": "https://jx.m3u8.tv/jx/jx.php?url=", "mobile": 1},
  {"name": "B站1", "url": "https://jx.jsonplayer.com/player/?url=", "mobile": 1},
  {"name": "爱豆", "url": "https://jx.aidouer.net/?url=", "mobile": 1},
  {"name": "BL", "url": "https://vip.bljiex.com/?v=", "mobile": 0},
  {"name": "冰豆", "url": "https://bd.jx.cn/?url=", "mobile": 0},
  {"name": "CK", "url": "https://www.ckplayer.vip/jiexi/?url=", "mobile": 0},
  {"name": "H8", "url": "https://www.h8jx.com/jiexi.php?url=", "mobile": 0},
  {"name": "JY", "url": "https://jx.playerjy.com/?url=", "mobile": 0},
  {"name": "解析la", "url": "https://api.jiexi.la/?url=", "mobile": 0},
  {"name": "M3U8", "url": "https://jx.m3u8.tv/jiexi/?url=", "mobile": 0},
  {"name": "PM", "url": "https://www.playm3u8.cn/jiexi.php?url=", "mobile": 0},
  {"name": "盘古", "url": "https://www.pangujiexi.cc/jiexi.php?url=", "mobile": 0},
  {"name": "七哥", "url": "https://jx.nnxv.cn/tv.php?url=", "mobile": 0},
  {"name": "听乐", "url": "https://jx.dj6u.com/?url=", "mobile": 1},
  {"name": "维多", "url": "https://jx.ivito.cn/?url=", "mobile": 0},
  {"name": "YT", "url": "https://jx.yangtu.top/?url=", "mobile": 0},
  {"name": "夜幕", "url": "https://www.yemu.xyz/?url=", "mobile": 0},
  {"name": "云析", "url": "https://jx.yparse.com/index.php?url=", "mobile": 0},
  {"name": "17云", "url": "https://www.1717yun.com/jx/ty.php?url=", "mobile": 0},
  {"name": "180", "url": "https://jx.000180.top/jx/?url=", "mobile": 0},
  {"name": "4K", "url": "https://jx.4kdv.com/?url=", "mobile": 1},
  {"name": "2ys", "url": "https://gj.fenxiangb.com/player/analysis.php?v=", "mobile": 0},
  {"name": "8090", "url": "https://www.8090g.cn/?url=", "mobile": 0}
]

const iframeUrl = computed(() => {
  return vipAddress.value + videoAddress.value
})

const vipAddress = ref(playLine[0].url);
const videoAddress = ref('');

// 宽度判断是否为移动端
const isMobile = () => {
  return document.body.clientWidth <= 768
}

</script>

<template>
  <div class="max-main">
    <div>
      <img src="/favicon.ico" style="width: 40px;margin: 0 10px" alt="">
      <h1 style="display: inline-block">UnlockVid Pro</h1>
    </div>
    <div>
      <iframe
          :src="iframeUrl"
          :width="isMobile() ? '100%' : '450px'"
          height="250px"
          title="YouTube video player"
          allowfullscreen
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
    <div>
      <label for="playLine">播放线路：</label>
      <select class="styled-select" v-model="vipAddress">
        <option v-for="(item,index) in playLine" :value="item.url" :key="index">{{ item.name }}</option>
      </select>
    </div>
    <div>
      视频链接：<input type="text" v-model="videoAddress" placeholder="请输入视频原链接"/>
    </div>
    <ul class="fool-a">
      <a href="https://www.iqiyi.com" target="_blank">
        <li>爱奇艺</li>
      </a>
      <a href="https://v.qq.com" target="_blank">
        <li>腾讯视频</li>
      </a>
      <a href="https://www.youku.com" target="_blank">
        <li>优酷</li>
      </a>
    </ul>
  </div>
</template>

<style scoped>

.max-main {
  text-align: center;
}

.max-main div {
  margin: 10px 0;
}

.fool-a{
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 20px 0;
}

/* 输入框样式 */
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none; /* 去除默认的轮廓线 */
}

/* 按钮样式 */
button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

/* 按钮悬停样式 */
button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #0056b3;
  /* 可以根据需要调整按钮点击后的样式 */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* 输入框点击后样式 */

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* 自定义选择框样式 */
.styled-select {
  appearance: none; /* 隐藏默认的下拉箭头 */
  padding: 8px 20px; /* 添加内边距 */
  font-size: 16px; /* 设置字体大小 */
  border: 1px solid #ccc; /* 设置边框 */
  border-radius: 5px; /* 设置圆角 */
  background-color: #fff; /* 设置背景颜色 */
  cursor: pointer; /* 设置鼠标样式为指针 */
}

.styled-select:focus {
  outline: none; /* 去除默认的焦点样式 */
  border-color: #007bff; /* 设置获取焦点时的边框颜色 */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 添加获取焦点时的阴影效果 */
}

</style>
