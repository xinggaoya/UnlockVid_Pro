<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {ElNotification} from 'element-plus'
import {getVideoInfo} from "@/api/system/videoInfo";

const playLine = [
  {'name': '2ys', 'url': 'https://gj.fenxiangb.com/player/analysis.php?v=', 'mobile': 0},
  {'name': '虾米', 'url': 'https://jx.xmflv.com/?url=', 'mobile': 1},
  {'name': 'B站1', 'url': 'https://jx.jsonplayer.com/player/?url=', 'mobile': 1},
  {'name': '爱豆', 'url': 'https://jx.aidouer.net/?url=', 'mobile': 1},
  {'name': 'BL', 'url': 'https://vip.bljiex.com/?v=', 'mobile': 0},
  {'name': '冰豆', 'url': 'https://bd.jx.cn/?url=', 'mobile': 0},
  {'name': 'H8', 'url': 'https://www.h8jx.com/jiexi.php?url=', 'mobile': 0},
  {'name': 'JY', 'url': 'https://jx.playerjy.com/?url=', 'mobile': 0},
  {'name': 'M3U8', 'url': 'https://jx.m3u8.tv/jiexi/?url=', 'mobile': 0},
  {'name': 'PM', 'url': 'https://www.playm3u8.cn/jiexi.php?url=', 'mobile': 0},
  {'name': '七哥', 'url': 'https://jx.nnxv.cn/tv.php?url=', 'mobile': 0},
  {'name': '听乐', 'url': 'https://jx.dj6u.com/?url=', 'mobile': 1},
  {'name': '维多', 'url': 'https://jx.ivito.cn/?url=', 'mobile': 0},
  {'name': 'YT', 'url': 'https://jx.yangtu.top/?url=', 'mobile': 0},
  {'name': '夜幕', 'url': 'https://www.yemu.xyz/?url=', 'mobile': 0},
  {'name': '云析', 'url': 'https://jx.yparse.com/index.php?url=', 'mobile': 0},
  {'name': '17云', 'url': 'https://www.1717yun.com/jx/ty.php?url=', 'mobile': 0},
  {'name': '180', 'url': 'https://jx.000180.top/jx/?url=', 'mobile': 0},
  {'name': '4K', 'url': 'https://jx.4kdv.com/?url=', 'mobile': 1}
]

const videoInfo = ref([])

const iframeUrl = computed(() => {
  return vipAddress.value + videoAddress.value
})

const vipAddress = ref(playLine[0].url)
const videoAddress = ref('')

function inputHande(v: string) {
  localStorage.setItem('videoAddress', v)
  getVideoInfoApi()
}

// 点击切换剧集
function videoAddressChange(v: string) {
  videoAddress.value = v
  localStorage.setItem('videoAddress', v)
}

function vipAddressChange(v: string) {
  localStorage.setItem('vipAddress', v)
}

/**
 * 获取视频信息网
 */
async function getVideoInfoApi() {
  videoInfo.value = []
  const res = await getVideoInfo({url: videoAddress.value})
  if (!res.data.template.pure_data.selector_bk) {
    videoInfo.value.push({
      page_url: videoAddress.value,
      album_order: '1'
    })
    return
  }
  const data = res.data.template?.pure_data?.selector_bk[1]?.videos?.feature_paged
  // 获取第一个属性的值
  const videoInfoList = Object.values(data)[0]
  videoInfo.value = videoInfoList;
}

onMounted(() => {
  const address = localStorage.getItem('videoAddress')
  const vip = localStorage.getItem('vipAddress')
  if (address) {
    videoAddress.value = address
  }
  if (vip) {
    vipAddress.value = vip
  }
  getVideoInfoApi()

  ElNotification({
    title: '提示',
    message: '部分接口存在恶意广告；仅供测试！！',
    type: 'warning'
  })
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="main-header">
        <div>
          <el-image src="/favicon.ico" style="width: 40px;margin: 0 10px"/>
        </div>
        <div class="main-center">
          <h1 style="display: inline-block">UnlockVid Pro</h1>
        </div>
      </el-header>
      <el-main>
        <div>
          <iframe
              id="playLine"
              :src="iframeUrl"
              width="100%"
              title="YouTube video player"
              allowfullscreen
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <el-card>
          <div>
            <el-form label-position="top">
              <el-form-item label="播放线路">
                <el-select v-model="vipAddress" placeholder="请选择播放线路" @change="vipAddressChange">
                  <el-option
                      v-for="(item,index) in playLine"
                      :key="index"
                      :label="item.name"
                      :value="item.url"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="视频链接">
                <el-input type="textarea" v-model="videoAddress" rows="4" @input="inputHande"
                          placeholder="请输入视频原链接"/>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-container>
              <el-header style="height: auto">剧集列表</el-header>
              <el-main>
                <el-skeleton :rows="5" animated v-if="videoInfo.length==0"/>
                <el-space wrap alignment="center">
                  <el-button :type="item.page_url === videoAddress ? 'primary' : 'default'"
                             style="width: 80px;"
                             v-for="(item,index) in videoInfo"
                             :key="index"
                             @click="videoAddressChange(item.page_url)"
                  >
                    {{ item.album_order }}
                  </el-button>
                </el-space>
              </el-main>
            </el-container>
          </div>
          <div class="main-center">
            <el-space>
              <el-link type="info" href="https://www.iqiyi.com">爱奇艺</el-link>
              <el-link type="info" href="https://v.qq.com">腾讯视频</el-link>
              <el-link type="info" href="https://www.youku.com">优酷</el-link>
            </el-space>
          </div>
        </el-card>
      </el-main>
      <el-footer class="main-center">
        <el-text tag="mark">请注意部分接口存在恶意广告，请斟酌使用；仅供测试</el-text>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .common-layout {
    width: 100%;
    height: 100%;
  }

  #playLine {
    width: 100%;
    height: 250px;
  }
}

@media screen and (min-width: 768px) {
  .common-layout {
    width: 768px;
    height: 100%;
    margin: 0 auto;
  }

  #playLine {
    width: 100%;
    height: 450px;
  }
}

.main-center {
  text-align: center;
}

.main-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
