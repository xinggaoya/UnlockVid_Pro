<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'

const playLine = [
  { 'name': '2S0', 'url': 'https://jx.2s0.cn/player/?url=' },
  { 'name': '2ys', 'url': 'https://gj.fenxiangb.com/player/analysis.php?v=' },
  { 'name': 'B站1', 'url': 'https://jx.jsonplayer.com/player/?url=' },
  { 'name': '虾米', 'url': 'https://jx.xmflv.com/?url=' }
]

const iframeUrl = computed(() => {
  return vipAddress.value + videoAddress.value
})

const vipAddress = ref(playLine[0].url)
const videoAddress = ref('')
const radioValue = ref(playLine[0].name)
const iframeLoading = ref(false)

function inputHande(v: string) {
  localStorage.setItem('videoAddress', v)
}

function handelChange(v: any) {
  vipAddress.value = v.url
  localStorage.setItem('vipAddress', JSON.stringify(v))
  ElMessage.success('切换成功,请稍等片刻...')

  loading()
}

// 加载
function loading() {
  iframeLoading.value = true
  setTimeout(() => {
    iframeLoading.value = false
  }, 1000)
}

function hanleClear() {
  videoAddress.value = ''
  ElMessage.success('清除成功')
}

function pasteBoardCopy() {
  videoAddress.value = ''
  navigator.clipboard.readText().then(text => {
    videoAddress.value = text
    ElMessage.success('粘贴成功')
  })
}

onMounted(() => {
  loading()
  const address = localStorage.getItem('videoAddress')
  const vip = localStorage.getItem('vipAddress')
  if (address) {
    videoAddress.value = address
  }
  if (vip) {
    const data = JSON.parse(vip)
    vipAddress.value = data.url
    radioValue.value = data.name
  }

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
      <el-main>
        <div class="layout-main">
          <div v-loading="iframeLoading" style="flex: 1;margin-right: 20px">
            <iframe
              id="playLine"
              :src="iframeUrl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              frameborder="0"
              title="YouTube video player"
              width="100%"
            ></iframe>
          </div>
          <el-card header="播放设置">
            <el-form label-position="top">
              <el-form-item>
                <el-alert title="请注意部分接口存在恶意广告，请斟酌使用；仅供测试" type="warning" />
              </el-form-item>
              <el-form-item label="播放线路">
                <el-radio-group v-model="radioValue">
                  <el-radio
                    v-for="(item,index) in playLine"
                    :key="index"
                    :label="item.name"
                    border
                    @change="handelChange(item)"
                  />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="视频链接">
                <el-input v-model="videoAddress" clearable placeholder="请输入视频原链接" rows="4"
                          type="textarea"
                          @input="inputHande" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pasteBoardCopy">粘贴</el-button>
                <el-button type="info" @click="hanleClear">清空</el-button>
              </el-form-item>
            </el-form>
          </el-card>

        </div>
      </el-main>
      <el-footer class="main-center">
        <div class="main-center">
          <el-space>
            <el-link href="https://www.iqiyi.com" target="_blank" type="info">爱奇艺</el-link>
            <el-link href="https://v.qq.com" target="_blank" type="info">腾讯视频</el-link>
            <el-link href="https://www.youku.com" target="_blank" type="info">优酷</el-link>
          </el-space>
        </div>
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
    height: 100%;
    margin: 0 auto;
  }

  .layout-main {
    display: flex;
    justify-content: space-between;
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
