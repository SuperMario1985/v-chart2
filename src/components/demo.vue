<template>
  <div class="demo">
    <h5>开关数值按钮</h5>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1000.0', 1)"
        >远程写入1</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1000.0', 0)"
        >就地写入0</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1000.1', 1)"
        >自动启动（写入1）</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1000.1', 0)"
        >自动停止（写入0）</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1001.0', 1)"
        >回用泵启动（写入1））</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1001.0', 0)"
        >回用泵停止（写入0）</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1001.1', 1)"
        >排空泵启动（写入1））</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1001.1', 0)"
        >排空泵停止（写入0）</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1001.2', 1)"
        >过滤器启动（写入1））</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1001.2', 0)"
        >过滤器停止（写入0）</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1001.3', 1)"
        >消毒器启动（写入1））</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1001.3', 0)"
        >消毒器停止（写入0）</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1001.4', 1)"
        >补水阀打开（写入1））</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1001.4', 0)"
        >补水阀关闭（写入0）</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1001.5', 1)"
        >按钮备用1（写入1））</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1001.5', 0)"
        >按钮备用1（写入0）</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1001.6', 1)"
        >按钮备用2（写入1））</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1001.6', 0)"
        >按钮备用2（写入0）</el-button
      >
    </div>
    <div class="test-box">
      <el-button type="primary" @click="remoteWriting('V1001.7', 1)"
        >按钮备用3（写入1））</el-button
      >
      <el-button type="primary" @click="remoteWriting('V1001.7', 0)"
        >按钮备用3（写入0）</el-button
      >
    </div>
    <h5>回用泵运行</h5>
    <div class="test-box">
      <el-switch
        v-model="swtchInfo.reusePumpOperation"
        active-color="red"
        inactive-color="#999"
        active-text="运行"
        inactive-text="停机"
        disabled
      ></el-switch>
    </div>
    <h5>排空泵运行</h5>
    <div class="test-box">
      <el-switch
        v-model="swtchInfo.reusePumpOperation2"
        active-color="red"
        inactive-color="#999"
        active-text="运行"
        inactive-text="停机"
        disabled
      ></el-switch>
    </div>
    <h5>过滤器运行</h5>
    <div class="test-box">
      <el-switch
        v-model="swtchInfo.reusePumpOperation3"
        active-color="red"
        inactive-color="#999"
        active-text="运行"
        inactive-text="停机"
        disabled
      ></el-switch>
    </div>
    <div class="test-box">
      <div class="part-item">
        <div>
          <p>流量:</p>
          <strong>
            <i>{{ swtchInfo.flow }}</i>
            <span>M3/H</span>
          </strong>
        </div>
        <div>
          <p>液位</p>
          <strong>
            <i>{{ swtchInfo.liquidLevel }}</i>
            <span>M</span>
          </strong>
        </div>
        <div>
          <p>频率</p>
          <strong>
            <i>{{ swtchInfo.frequency }}</i>
            <span>Hz</span>
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpService from "../api/httpService";
export default {
  name: "Demo",
  data() {
    return {
      swtchInfo: {
        reusePumpOperation: false,
        reusePumpOperation2: false,
        reusePumpOperation3: false,
        flow: "",
        liquidLevel: "",
        frequency: "",
      },
    };
  },
  methods: {
    remoteWriting(tag, val) {
      httpService.remoteWriting(tag, val, () => {
        this.getInfo();
      });
    },
    getInfo() {
      let that = this;
      httpService.getInfo(function (response) {
        if (response && response.data) {
          that.swtchInfo.reusePumpOperation =
            response.data["V1004.0"] === "1" ? true : false;
          that.swtchInfo.reusePumpOperation2 =
            response.data["V1004.1"] === "1" ? true : false;
          that.swtchInfo.reusePumpOperation3 =
            response.data["V1004.2"] === "1" ? true : false;

          that.swtchInfo.flow = response.data["VD1012"];
          that.swtchInfo.liquidLevel = response.data["VD1008"];
          that.swtchInfo.frequency = response.data["VD1016"];
        }
      });
    },
  },
  computed: {},
  created: function () {
    this.getInfo();
  },
  mounted: function () {
    let that = this;
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.demo {
  padding-bottom: 100px;
  h5 {
    text-align: center;
    padding-top: 40px;
  }
  .test-box {
    padding-top: 20px;
    text-align: center;
  }
  .part-item {
    // display: flex;
    // flex-wrap: wrap;
    // text-align: left;
    & > div {
      padding-top: 10px;
      p {
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(1, 211, 213, 1);
        line-height: 45px;
      }
      strong {
        display: inline-block;
        i {
          display: inline-block;
          width: 182px;
          height: 46px;
          border: 1px solid rgba(0, 255, 252, 1);
          border-radius: 4px;
          line-height: 45px;
          margin-right: 20px;
          vertical-align: bottom;
          font-size: 24px;
          padding: 0 8px;
          color: #fff;
        }
        span {
          display: inline-block;
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(1, 211, 213, 1);
          line-height: 45px;
        }
      }
    }
  }
}
</style>
