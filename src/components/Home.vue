<template>
  <div class="home">
    <div class="header-page">雨水回用处理间</div>
    <div class="main-box">
      <div class="time-page">{{ nowTime }}</div>
      <div class="weather-page">
        <div class="weather-info-left">
          <img
            v-if="nowWeatherInfo"
            :src="'./static/images/128/' + nowWeatherInfo.icon + '.png'"
            alt
          />
          <div class="p1">
            <h5>今日天气</h5>
            <p v-if="nowWeatherInfo">
              {{ nowWeatherInfo.temp }}
              <span>℃</span>
            </p>
          </div>
          <div class="p2">
            <h5>北京 大兴</h5>
            <h6 v-if="nowWeatherInfo">{{ nowWeatherInfo.text }}</h6>
            <p v-if="threeDaysWeatherInfo">
              {{ threeDaysWeatherInfo[0].tempMin }}~{{
                threeDaysWeatherInfo[0].tempMax
              }}℃
            </p>
          </div>
          <div class="right-line"></div>
        </div>
        <div class="weather-info-right">
          <h6><i></i>小时预报</h6>
          <ul class="weather-list" v-if="fultherWeatherInfo">
            <li
              v-for="(item, $index) in fultherWeatherInfo.slice(0, 5)"
              :key="$index"
            >
              <span>{{ item.fxTime.slice(11, 16) }}</span>
              <img
                :src="'./static/images/128/' + item.icon + '.png'"
                :onerror="avatarDefaultImg"
                alt
              />
              <strong>{{ item.temp }}℃</strong>
            </li>
          </ul>
        </div>
      </div>
      <div class="feature-page">
        <div class="video-box" v-if="loginInfo.status === 1">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlay($event)"
            @pause="onPause($event)"
            @ended="onEended($event)"
            v-show="bannerStatus === 2"
          ></video-player>
          <el-carousel
            height="437px"
            :interval="8000"
            indicator-position="outside"
            arrow="never"
            trigger="click"
            @change="handleBannerChange"
            v-if="bannerStatus === 1"
          >
            <el-carousel-item>
              <img src="../assets/images/banner/1.png" alt />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/images/banner/2.png" alt />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/images/banner/3.png" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="login" v-if="loginInfo.status === 2">
          <div class="top">
            <div class="log-box" @click="ownerLogin">
              <div class="img-box">
                <img src="../assets/images/display/login01.png" alt />
              </div>
              <a href="javascript:void(0)">管理员登录</a>
              <div class="right-border"></div>
              <div class="left-border"></div>
            </div>
            <div class="log-box" @click="visitorsLogin">
              <div class="img-box">
                <img src="../assets/images/display/login02.png" alt />
              </div>
              <a href="javascript:void(0)">游客登录</a>
              <div class="right-border"></div>
              <div class="left-border"></div>
            </div>
          </div>
          <!-- <div class="bottom">
            <div class="log-box" @click="login">
              <img src="../assets/images/display/login02.png" alt />
              <a href="javascript:void(0)">管理员登录</a>
              <div class="right-border"></div>
              <div class="left-border"></div>
            </div>
          </div> -->
        </div>
        <div class="rain" v-if="loginInfo.status === 3.1 && false">
          <div class="top">
            <div class="left">
              <h5>水池水量</h5>
              <div class="liquid-fill liquid-fill2">
                <ve-liquidfill
                  width="100%"
                  height="100%"
                  radius="100%"
                  :data="chartData2"
                  :settings="chartSettings2"
                ></ve-liquidfill>
              </div>
              <div class="liquid-fill liquid-fill2">
                <ve-liquidfill
                  width="100%"
                  height="100%"
                  radius="100%"
                  :data="chartData"
                  :settings="chartSettings"
                ></ve-liquidfill>
              </div>
              <div class="liquid-info" v-if="swtchInfo">
                <span>调蓄池液位：{{ swtchInfo.liquidLevel }}</span>
                <span>清水池液位：{{ swtchInfo.liquidLevel2 }}</span>
                <span>涌泉池液位：{{ swtchInfo.liquidLevel3 }}</span>
              </div>
            </div>
            <div class="right">
              <h5>雨水回收</h5>
              <div class="btn-box">
                <i
                  :class="{ active: ownerConfigPageStatus['V1000.4'] }"
                  @click="remoteWritingList('V1000.4', 1)"
                  >绿化浇灌</i
                >
                <i
                  :class="{ active: ownerConfigPageStatus['V1000.6'] }"
                  @click="remoteWritingList('V1000.6', 1)"
                  >场地冲洗</i
                >
              </div>
              <div class="btn-box">
                <i
                  :class="{ active: ownerConfigPageStatus['V1000.5'] }"
                  @click="remoteWritingList('V1000.5', 1)"
                  >雨水洗车</i
                >
                <i
                  :class="{ active: ownerConfigPageStatus['V1000.7'] }"
                  @click="remoteWritingList('V1000.7', 1)"
                  >景观补水</i
                >
              </div>
              <div class="btn-box">
                <i class="stop" @click="stopRainBack">停止</i>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <h5>水质检测</h5>
              <div class="btn-box">
                <i
                  :class="{ active: ownerConfigPageStatus['V1002.6'] }"
                  @click="remoteWritingList('V1002.6', 1)"
                  >一键反冲洗</i
                >
                <i
                  :class="{ active: ownerConfigPageStatus['V1002.7'] }"
                  @click="remoteWritingList('V1002.7', 1)"
                  >一键调蓄排空</i
                >
              </div>
              <div class="btn-box">
                <i class="stop" @click="stopWaterCheck">停止</i>
                <i @click="goToConfig">配置参数</i>
              </div>
            </div>
            <div class="right">
              <h5>设备状态</h5>
              <div class="device-status">
                <i></i>
              </div>
            </div>
          </div>
        </div>
        <div class="rain2" v-if="loginInfo.status === 3.1">
          <div class="left">
            <h5>水池水量</h5>
            <div class="liquid-fill liquid-fill2">
              <p>清水池</p>
              <ve-liquidfill
                width="100%"
                height="100%"
                radius="100%"
                :data="chartData2"
                :settings="chartSettings2"
              ></ve-liquidfill>
            </div>
            <div class="liquid-fill liquid-fill2">
              <p>调蓄池</p>
              <ve-liquidfill
                width="100%"
                height="100%"
                radius="100%"
                :data="chartData"
                :settings="chartSettings"
              ></ve-liquidfill>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <h5>液位显示</h5>
              <div class="liquid-info" v-if="swtchInfo">
                <span>调蓄池液位：{{ swtchInfo.liquidLevel }}</span>
                <span>清水池液位：{{ swtchInfo.liquidLevel2 }}</span>
                <span>涌泉池液位：{{ swtchInfo.liquidLevel3 }}</span>
              </div>
            </div>
            <div class="center">
              <h5>雨水回收</h5>
              <div class="btn-info">
                <div class="btn-box">
                  <i
                    :class="{ active: ownerConfigPageStatus['V1000.6'] }"
                    @click="remoteWritingList('V1000.6', 1)"
                    >场地冲洗</i
                  >
                  <br />
                  <i
                    :class="{ active: ownerConfigPageStatus['V1000.5'] }"
                    @click="remoteWritingList('V1000.5', 1)"
                    >雨水洗车</i
                  >
                </div>
                <div class="btn-box">
                  <i
                    :class="{ active: ownerConfigPageStatus['V1000.4'] }"
                    @click="remoteWritingList('V1000.4', 1)"
                    >绿化浇灌</i
                  >
                  <br />
                  <i
                    :class="{ active: ownerConfigPageStatus['V1000.7'] }"
                    @click="remoteWritingList('V1000.7', 1)"
                    >景观补水</i
                  >
                </div>
                <div class="btn-box">
                  <i class="stop" @click="stopRainBack">停止</i>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="left">
                <h5>水质检测</h5>
                <div class="btn-info">
                  <div class="btn-box">
                    <i
                      :class="{ active: ownerConfigPageStatus['V1002.6'] }"
                      @click="remoteWritingList('V1002.6', 1)"
                      >一键反冲洗</i
                    >
                    <i
                      :class="{ active: ownerConfigPageStatus['V1002.7'] }"
                      @click="remoteWritingList('V1002.7', 1)"
                      >一键调蓄排空</i
                    >
                  </div>
                  <div class="btn-box">
                    <i class="stop" @click="stopWaterCheck">停止</i>
                    <i @click="goToConfig">配置参数</i>
                  </div>
                </div>
              </div>
              <div class="right">
                <h5>设备状态</h5>
                <div class="device-status">
                  <div class="img-box">
                    <img
                      src="../../src/assets/images/display/bg-info05.png"
                      alt=""
                    />
                    <i></i>
                  </div>
                  <div class="status-info">
                    <div class="status-item">
                      <h6>
                        <img
                          src="../../src/assets/images/display/bg-info06.png"
                          alt=""
                        />出场编号
                      </h6>
                      <p>#000025</p>
                    </div>
                    <div class="status-item">
                      <h6>
                        <img
                          src="../../src/assets/images/display/bg-info06.png"
                          alt=""
                        />启用时间
                      </h6>
                      <p>2022年11月10日</p>
                    </div>
                    <div class="status-item">
                      <h6>
                        <img
                          src="../../src/assets/images/display/bg-info06.png"
                          alt=""
                        />累计同行时长（小时）
                      </h6>
                      <p>1125</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rain" v-if="loginInfo.status === 3.2">
          <div class="top">
            <div class="left">
              <h5>雨水利用量</h5>
              <div class="config config2">
                <div class="part-item">
                  <div>
                    <p>年雨水利用量:</p>
                    <strong>
                      <i>{{ swtchInfo.yearTotalRain }}</i>
                      <span>M</span>
                    </strong>
                  </div>
                </div>
                <div class="part-item">
                  <div>
                    <p>累计雨水利用量:</p>
                    <strong>
                      <i>{{ swtchInfo.yearTotalUsed }}</i>
                      <span>M</span>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <h5>设别设施状态</h5>
              <div class="device-box">
                <div class="device-state">
                  <span>回用泵</span>
                  <strong v-if="swtchInfo.reusePumpOperation">运行</strong>
                  <strong class="error" v-else-if="swtchInfo.error1"
                    >故障</strong
                  >
                  <strong v-else>停机</strong>
                  <img
                    v-if="swtchInfo.reusePumpOperation"
                    src="../assets/images/config/btn2-active.gif"
                    alt=""
                  />
                  <img
                    v-else
                    src="../assets/images/config/btn-closed.png"
                    alt=""
                  />
                </div>
                <div class="device-state">
                  <span>调蓄泵</span>
                  <strong v-if="swtchInfo.reusePumpOperation6">运行</strong>
                  <strong class="error" v-else-if="swtchInfo.error5"
                    >故障</strong
                  >
                  <strong v-else>停机</strong>
                  <img
                    v-if="swtchInfo.reusePumpOperation6"
                    src="../assets/images/config/btn2-active.gif"
                    alt=""
                  />
                  <img
                    v-else
                    src="../assets/images/config/btn-closed.png"
                    alt=""
                  />
                </div>
                <div class="device-state">
                  <span>过滤器</span>
                  <strong v-if="swtchInfo.reusePumpOperation3">运行</strong>
                  <strong v-else>停机</strong>
                  <img
                    v-if="swtchInfo.reusePumpOperation3"
                    src="../assets/images/config/btn2-active.gif"
                    alt=""
                  />
                  <img
                    v-else
                    src="../assets/images/config/btn-closed.png"
                    alt=""
                  />
                </div>
                <div class="device-state">
                  <span>消毒器</span>
                  <strong v-if="swtchInfo.reusePumpOperation7">运行</strong>
                  <strong v-else>停机</strong>
                  <img
                    v-if="swtchInfo.reusePumpOperation7"
                    src="../assets/images/config/btn2-active.gif"
                    alt=""
                  />
                  <img
                    v-else
                    src="../assets/images/config/btn-closed.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <h5>水质检测数据</h5>
              <div class="check">
                <div class="cover"></div>
              </div>
            </div>
            <div class="right">
              <h5>设备状态</h5>
              <div class="device-status">
                <i></i>
              </div>
            </div>
          </div>
        </div>
        <div class="config" v-if="loginInfo.status === 4">
          <div class="part-item input-box">
            <div>
              <p>调蓄池液位上限:</p>
              <strong>
                <i @click="configFlur(2)">{{ swtchInfo.liquidUp }}</i>
                <span>M</span>
              </strong>
            </div>
            <div>
              <p>清水池液位上限:</p>
              <strong>
                <i @click="configFlur(4)">{{ swtchInfo.liquidUp2 }}</i>
                <span>M</span>
              </strong>
            </div>
            <div>
              <p>涌泉池液位上限:</p>
              <strong>
                <i @click="configFlur(6)">{{ swtchInfo.liquidUp3 }}</i>
                <span>M</span>
              </strong>
            </div>
          </div>
          <div class="part-item input-box">
            <div>
              <p>调蓄池液位下限:</p>
              <strong>
                <i @click="configFlur(1)">{{ swtchInfo.liquidDown }}</i>
                <span>M</span>
              </strong>
            </div>
            <div>
              <p>清水池液位下限:</p>
              <strong>
                <i @click="configFlur(3)">{{ swtchInfo.liquidDown2 }}</i>
                <span>M</span>
              </strong>
            </div>
            <div>
              <p>涌泉池液位下限:</p>
              <strong>
                <i @click="configFlur(5)">{{ swtchInfo.liquidDown3 }}</i>
                <span>M</span>
              </strong>
            </div>
          </div>
          <div class="header">
            <i
              :class="{ active: !isShowBtns }"
              @click="remoteWriting('V1000.0', 1)"
              >远程</i
            >
            <i
              :class="{ active: isShowBtns }"
              @click="remoteWriting('V1000.0', 0)"
              >就地</i
            >
            <i
              :class="{ active: !isSingleContral }"
              @click="remoteWriting('V1000.1', 1)"
              >联动控制</i
            >
            <i
              :class="{ active: isSingleContral }"
              @click="remoteWriting('V1000.1', 0)"
              >单独控制</i
            >
          </div>
          <div class="config-box">
            <div class="config-item">
              <h6>回用泵</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation }"
                  class="button btn-open"
                  @click="remoteWriting('V1001.0', 1)"
                  >启动</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1001.0', 0)"
                  >停止</i
                >
              </div>
              <div>
                <p v-if="swtchInfo.reusePumpOperation">运行</p>
                <p class="error" v-else-if="swtchInfo.error1">故障</p>
                <p v-else>停机</p>
                <img
                  v-if="swtchInfo.reusePumpOperation"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-else
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6 class="opacity">回用泵2</h6>
              <div v-show="isShowBtns" class="opacity">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation0 }"
                  class="button btn-open"
                  @click="remoteWriting('V1001.1', 1)"
                  >启动</i
                >
              </div>
              <div v-show="isShowBtns" class="opacity">
                <i class="button btn-close" @click="remoteWriting('V1001.1', 0)"
                  >停止</i
                >
              </div>
              <div>
                <p v-if="swtchInfo.reusePumpOperation0">运行</p>
                <p class="error" v-else-if="swtchInfo.error0">故障</p>
                <p v-else>停机</p>
                <img
                  v-if="swtchInfo.reusePumpOperation0"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-else
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6>清水池提升泵</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation8 }"
                  class="button btn-open"
                  @click="remoteWriting('V1001.2', 1)"
                  >启动</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1001.2', 0)"
                  >停止</i
                >
              </div>
              <div>
                <p v-if="swtchInfo.reusePumpOperation8">运行</p>
                <p class="error" v-else-if="swtchInfo.error8">故障</p>
                <p v-else>停机</p>
                <img
                  v-if="swtchInfo.reusePumpOperation8"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-else
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6>调蓄池回用泵</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation9 }"
                  class="button btn-open"
                  @click="remoteWriting('V1001.3', 1)"
                  >启动</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1001.3', 0)"
                  >停止</i
                >
              </div>
              <div>
                <p v-if="swtchInfo.reusePumpOperation9">运行</p>
                <p class="error" v-else-if="swtchInfo.error9">故障</p>
                <p v-else>停机</p>
                <img
                  v-if="swtchInfo.reusePumpOperation9"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-else
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6>调蓄池排空泵</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation2 }"
                  class="button btn-open"
                  @click="remoteWriting('V1001.4', 1)"
                  >启动</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1001.4', 0)"
                  >停止</i
                >
              </div>
              <div>
                <p v-if="swtchInfo.reusePumpOperation2">运行</p>
                <p class="error" v-else-if="swtchInfo.error2">故障</p>
                <p v-else>停机</p>
                <img
                  v-if="swtchInfo.reusePumpOperation2"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-else
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item" v-if="false">
              <h6>调储泵</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation6 }"
                  class="button btn-open"
                  @click="remoteWriting('V1001.5', 1)"
                  >启动</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1001.5', 0)"
                  >停止</i
                >
              </div>
              <div>
                <p v-if="swtchInfo.reusePumpOperation6">运行</p>
                <p class="error" v-else-if="swtchInfo.error5">故障</p>
                <p v-else>停机</p>
                <img
                  v-if="swtchInfo.reusePumpOperation6"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-else
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6>过滤器</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation3 }"
                  class="button btn-open"
                  @click="remoteWriting('V1001.5', 1)"
                  >启动</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1001.5', 0)"
                  >停止</i
                >
              </div>
              <div>
                <p v-if="swtchInfo.reusePumpOperation3">运行</p>
                <p v-else>停机</p>
                <img
                  v-if="swtchInfo.reusePumpOperation3"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-else
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6>消毒灯</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation7 }"
                  class="button btn-open"
                  @click="remoteWriting('V1001.6', 1)"
                  >启动</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1001.6', 0)"
                  >停止</i
                >
              </div>
              <div>
                <p v-if="swtchInfo.reusePumpOperation7">运行</p>
                <p v-else>停机</p>
                <img
                  v-if="swtchInfo.reusePumpOperation7"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-else
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6>过滤阀</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation12 }"
                  class="button btn-open"
                  @click="remoteWriting('V1002.0', 1)"
                  >打开</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1002.0', 0)"
                  >关闭</i
                >
              </div>
              <div>
                <p class="error" v-if="swtchInfo.error12">故障</p>
                <p v-else-if="swtchInfo.reusePumpOperation12">开位</p>
                <p v-else-if="swtchInfo.reusePumpOperation13">关位</p>
                <img
                  v-if="swtchInfo.reusePumpOperation12"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-if="swtchInfo.reusePumpOperation13"
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6>反洗阀</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation10 }"
                  class="button btn-open"
                  @click="remoteWriting('V1002.1', 1)"
                  >打开</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1002.1', 0)"
                  >关闭</i
                >
              </div>
              <div>
                <p class="error" v-if="swtchInfo.error10">故障</p>
                <p v-else-if="swtchInfo.reusePumpOperation10">开位</p>
                <p v-else-if="swtchInfo.reusePumpOperation11">关位</p>
                <img
                  v-if="swtchInfo.reusePumpOperation10"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-if="swtchInfo.reusePumpOperation11"
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="config-item">
              <h6>补水阀</h6>
              <div v-show="isShowBtns">
                <i
                  :class="{ active: swtchInfo.reusePumpOperation4 }"
                  class="button btn-open"
                  @click="remoteWriting('V1002.2', 1)"
                  >打开</i
                >
              </div>
              <div v-show="isShowBtns">
                <i class="button btn-close" @click="remoteWriting('V1002.2', 0)"
                  >关闭</i
                >
              </div>
              <div>
                <p class="error" v-if="swtchInfo.error3">故障</p>
                <p v-else-if="swtchInfo.reusePumpOperation4">开位</p>
                <p v-else-if="swtchInfo.reusePumpOperation5">关位</p>
                <img
                  v-if="swtchInfo.reusePumpOperation4"
                  src="../assets/images/config/btn2-active.gif"
                  alt=""
                />
                <img
                  v-if="swtchInfo.reusePumpOperation5"
                  src="../assets/images/config/btn-closed.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="header" v-if="false">
            <i
              :class="{ active: !isSingleContral }"
              @click="remoteWriting('V1000.1', 1)"
              >联动控制</i
            >
            <i
              :class="{ active: isSingleContral }"
              @click="remoteWriting('V1000.1', 0)"
              >单独控制</i
            >
            <!-- <i
              v-if="
                swtchInfo.error1 ||
                swtchInfo.error2 ||
                swtchInfo.error3 ||
                swtchInfo.error5
              "
              @touchstart="remoteWriting('V1000.2', 1)"
              @touchend="remoteWriting('V1000.2', 0)"
              >故障复位</i
            > -->
            <i
              v-if="
                swtchInfo.error1 ||
                swtchInfo.error2 ||
                swtchInfo.error3 ||
                swtchInfo.error5
              "
              @touchstart="remoteWriting('V1000.2', 1)"
              >故障复位</i
            >
          </div>
        </div>
      </div>
      <div
        class="footer-page"
        v-if="loginInfo.status === 1 || loginInfo.status === 2"
      >
        <ul v-if="newsList">
          <li>
            <i></i>
            <span>
              <marquee behavior="scroll" direction="left">{{
                newsList.news1
              }}</marquee>
            </span>
          </li>
          <li>
            <i></i>
            <span>
              <marquee behavior="scroll" direction>{{
                newsList.news2
              }}</marquee>
            </span>
          </li>
          <li>
            <i></i>
            <span>
              <marquee behavior direction>{{ newsList.news3 }}</marquee>
            </span>
          </li>
        </ul>
        <img
          v-if="loginInfo.status !== 1"
          src="../assets/images/display/erweima.png"
          alt
        />
        <img
          class="icon-enter"
          v-if="loginInfo.status === 1"
          src="../assets/images/display/icon-inter.png"
          alt
          @click="goLoginPage"
        />
      </div>
    </div>
    <div
      v-if="loginInfo.status === 2"
      class="login-out"
      @click="
        loginInfo.status = 1;
        clearTimeoutToken();
      "
    >
      返回
    </div>
    <div
      v-if="loginInfo.status === 4"
      class="login-out"
      @click="
        loginInfo.status = 3.1;
        clearTimeoutToken();
      "
    >
      返回
    </div>

    <div
      v-if="loginInfo.status === 3.1 || loginInfo.status === 3.2"
      class="login-out"
      @click="goLoginPage"
    >
      退出
    </div>
    <div class="charge-box" @click="toggleFullScreen">
      <div
        v-if="loginInfo.status === 4 || loginInfo.status === 2"
        class="login-out"
      >
        切换屏幕
      </div>
    </div>
    <el-dialog
      width="600px"
      title="液位配置"
      :visible.sync="dialogTableVisible"
    >
      <div
        class="password-box"
        v-if="configType === 1 || configType === 3 || configType === 5"
      >
        <el-input
          width="300px"
          placeholder="请输入液位下限"
          v-model="fluVlue"
        ></el-input>
      </div>
      <div
        class="password-box"
        v-if="configType === 2 || configType === 4 || configType === 6"
      >
        <el-input
          width="300px"
          placeholder="请输入液位上限"
          v-model="fluVlue"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmPassword">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="600px"
      title="频率设置"
      :visible.sync="dialogFrequencyVlueVisible"
    >
      <div class="password-box">
        <el-input
          width="300px"
          placeholder="请输入频率"
          v-model="frequencyVlue2"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFrequencyVlueVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFrequency">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="600px"
      title="压力设置"
      :visible.sync="dialogPressureVlueVisible"
    >
      <div class="password-box">
        <el-input
          width="300px"
          placeholder="请输入压力"
          v-model="pressureVlue2"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPressureVlueVisible = false">取 消</el-button>
        <el-button type="primary" @click="configPressureValue">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="600px"
      title="权限验证"
      :visible.sync="dialogAccessVisible"
    >
      <div class="password-box">
        <el-input
          width="300px"
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAccessVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAccessPassword(3.1)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import httpService from "../api/httpService";
export default {
  name: "Home",
  data() {
    return {
      // 轮播图的状态1：图片播放；2：视频播放
      bannerStatus: 1,
      loginInfo: {
        // 1:屏保；2：登录页；3：已经登录 4:配置页
        status: 1,
        // 1:停止；2：手动；3：自动
        runningStatus: 2,
      },
      // 业主配置页信息
      ownerConfigPageStatus: {
        "V1000.4": false,
        "V1000.6": false,
        "V1000.5": false,
        "V1000.7": false,
        "V1002.6": false,
        "V1002.7": false,
      },
      // 密码验证框
      dialogAccessVisible: false,
      password: "",
      chartData: {
        columns: ["city", "percent"],
        rows: [
          {
            city: "调蓄池水量",
            percent: 0.6,
          },
        ],
      },
      chartData2: {
        columns: ["city", "percent"],
        rows: [
          {
            city: "清水池水量",
            percent: 0.6,
          },
        ],
      },
      chartSettings: {
        seriesMap: {
          调蓄池水量: {
            color: ["#74FC9E"],
            period: "1500",
            radius: "100%",
            itemStyle: {
              opacity: 1,
            },
            emphasis: {
              itemStyle: {
                opacity: 0.5,
              },
            },
            backgroundStyle: {
              color: "#072862",
            },
            label: {
              formatter(options) {
                const { seriesName, value } = options;
                return `${(value * 5 * 52).toFixed(1)}m³`;
              },
              fontSize: 15,
              color: "green",
              insideColor: "#041C6B",
              position: ["50%", "60%"],
            },
            outline: {
              show: false,
              borderDistance: 0,
              itemStyle: {
                color: "#7BFF49",
                borderColor: "#7BFF49",
                borderWidth: 3,
                shadowBlur: 0,
              },
            },
          },
        },
      },
      chartSettings2: {
        seriesMap: {
          清水池水量: {
            color: ["#74FC9E"],
            period: "1500",
            radius: "100%",
            itemStyle: {
              opacity: 1,
            },
            emphasis: {
              itemStyle: {
                opacity: 0.5,
              },
            },
            backgroundStyle: {
              color: "#072862",
            },
            label: {
              formatter(options) {
                const { seriesName, value } = options;
                return `${(value * 5 * 52).toFixed(1)}m³`;
              },
              fontSize: 15,
              color: "green",
              insideColor: "#041C6B",
              position: ["50%", "60%"],
            },
            outline: {
              show: false,
              borderDistance: 0,
              itemStyle: {
                color: "#7BFF49",
                borderColor: "#7BFF49",
                borderWidth: 3,
                shadowBlur: 0,
              },
            },
          },
        },
      },
      nowTime: "",
      nowWeatherInfo: null,
      fultherWeatherInfo: null,
      threeDaysWeatherInfo: null,
      randomArr: [
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
        Math.ceil(Math.random() * 8),
      ],
      randomArr2: [
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
        Math.ceil(Math.random() * 10 + 20),
      ],
      // 播放器参数
      playerOptions: {
        height: 1000,
        responsive: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:11", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "./static/video/北京泰宁宣传视频001.mp4", //url地址
          },
        ],
        poster: "", // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false, // 全屏按钮
        },
      },
      // 回到屏保的timeoutToken
      timeoutToken: null,
      newsList: {
        news1:
          "中共中央政治局常务委员会召开会议 研究部署防汛救灾工作 中共中央总书记习近平主持会议 中共中央政治局常务委员会7月17日召开会议，研究部署防汛救灾工作。中共中央总书记习近平主持会议并发表重要讲话。",
        news2:
          "中共中央政治局常务委员会召开会议 研究部署防汛救灾工作 中共中央总书记习近平主持会议",
        news3:
          "北京泰宁科创雨水利用技术股份有限公司，北京市昌平区科技园区双营西路90号，4006-501-510",
      },
      // 配置参数
      swtchInfo: {
        reusePumpOperation0: false,
        reusePumpOperation: false,
        reusePumpOperation2: false,
        reusePumpOperation3: false,
        reusePumpOperation4: false,
        reusePumpOperation5: false,
        reusePumpOperation6: false,
        reusePumpOperation7: false,
        reusePumpOperation8: false,
        reusePumpOperation9: false,
        reusePumpOperation10: false,
        reusePumpOperation11: false,
        reusePumpOperation12: false,
        reusePumpOperation13: false,
        error1: false,
        error2: false,
        error3: false,
        error5: false,
        error8: false,
        error9: false,
        error10: false,
        error12: false,
        flow: "",
        liquidLevel: "",
        liquidLevel2: "",
        liquidLevel3: "",
        frequency: "",
        frequency2: "",
        frequency3: "",
        liquidDown: "",
        liquidDown2: "",
        liquidDown3: "",
        liquidUp: "",
        liquidUp2: "",
        liquidUp3: "",
        pressure: "",
        // 年雨水利用量
        yearTotalRain: "",
        // 累计雨水利用量
        yearTotalUsed: "",
      },
      dialogTableVisible: false,
      // 1：液位下限  2:液位上限
      configType: 1,
      dialogFrequencyVlueVisible: false,
      fluVlue: "",
      dialogPressureVlueVisible: false,
      frequencyVlue: "",
      frequencyVlue2: "",
      pressureVlue: "",
      pressureVlue2: "",
      // 是否是远程控制
      isShowBtns: true,
      isSingleContral: true,
      configTimerToken: null,
      // 是否全屏
      isFullScreen: false,
      avatarDefaultImg: 'this.src="' + "./static/images/128/100.png" + '"',
    };
  },
  methods: {
    getInfo() {
      let that = this;
      httpService.getInfo(function (response) {
        if (response && response.data) {
          // 回用泵1
          that.swtchInfo.reusePumpOperation =
            response.data["V1004.1"] === "1" ? true : false;
          that.swtchInfo.error1 =
            response.data["V1004.3"] === "1" ? true : false;

          // 回用泵2
          that.swtchInfo.reusePumpOperation0 =
            response.data["V1004.2"] === "1" ? true : false;
          that.swtchInfo.error0 =
            response.data["V1004.4"] === "1" ? true : false;

          // 提升泵
          that.swtchInfo.reusePumpOperation8 =
            response.data["V1004.5"] === "1" ? true : false;
          that.swtchInfo.error8 =
            response.data["V1004.6"] === "1" ? true : false;

          // 调蓄池排空泵
          that.swtchInfo.reusePumpOperation2 =
            response.data["V1005.1"] === "1" ? true : false;
          that.swtchInfo.error2 =
            response.data["V1005.2"] === "1" ? true : false;

          // 过滤器
          that.swtchInfo.reusePumpOperation3 =
            response.data["V1005.3"] === "1" ? true : false;

          // 过滤阀
          that.swtchInfo.reusePumpOperation12 =
            response.data["V1006.0"] === "1" ? true : false;
          that.swtchInfo.reusePumpOperation13 =
            response.data["V1006.1"] === "1" ? true : false;
          that.swtchInfo.error12 =
            response.data["V1006.2"] === "1" ? true : false;

          // 反洗阀
          that.swtchInfo.reusePumpOperation10 =
            response.data["V1006.3"] === "1" ? true : false;
          that.swtchInfo.reusePumpOperation11 =
            response.data["V1006.4"] === "1" ? true : false;
          that.swtchInfo.error10 =
            response.data["V1006.5"] === "1" ? true : false;

          // 补水阀
          that.swtchInfo.reusePumpOperation4 =
            response.data["V1006.6"] === "1" ? true : false;
          that.swtchInfo.reusePumpOperation5 =
            response.data["V1006.7"] === "1" ? true : false;
          that.swtchInfo.error3 =
            response.data["V1007.0"] === "1" ? true : false;

          // 调蓄泵
          that.swtchInfo.reusePumpOperation6 =
            response.data["V1005.2"] === "1" ? true : false;

          // 消毒灯
          that.swtchInfo.reusePumpOperation7 =
            response.data["V1005.4"] === "1" ? true : false;

          // 调蓄池回用泵
          that.swtchInfo.reusePumpOperation9 =
            response.data["V1004.7"] === "1" ? true : false;
          that.swtchInfo.error9 =
            response.data["V1005.0"] === "1" ? true : false;

          // 调蓄泵故障
          that.swtchInfo.error5 =
            response.data["V1005.3"] === "1" ? true : false;

          that.swtchInfo.flow = response.data["VD1012"];

          // 调蓄池
          that.swtchInfo.liquidLevel = response.data["VD1020"];
          that.chartData.rows[0].percent =
            Number(that.swtchInfo.liquidLevel) / 5;
          that.swtchInfo.frequency = response.data["VD1008"];
          that.swtchInfo.liquidDown = response.data["VD904"];
          that.swtchInfo.liquidUp = response.data["VD900"];

          // 清水池
          that.swtchInfo.liquidLevel2 = response.data["VD1024"];
          that.chartData2.rows[0].percent =
            Number(that.swtchInfo.liquidLevel2) / 5;
          that.swtchInfo.frequency2 = response.data["VD1012"];

          that.swtchInfo.liquidDown2 = response.data["VD912"];
          that.swtchInfo.liquidUp2 = response.data["VD908"];

          // 涌泉池
          that.swtchInfo.liquidLevel3 = response.data["VD1016"];

          that.swtchInfo.liquidDown3 = response.data["VD920"];
          that.swtchInfo.liquidUp3 = response.data["VD916"];
          // 压力
          that.swtchInfo.pressure = response.data["VD1020"];
          that.pressureVlue = response.data["VW1036"];

          // 频率设定
          that.frequencyVlue = response.data["VW1038"];

          // 年雨水利用量
          that.swtchInfo.yearTotalRain = response.data["VD1024"];
          // 累计雨水利用量
          that.swtchInfo.yearTotalUsed = response.data["VD1028"];
        }
      });
    },
    // 获取当天天气
    getNowweather() {
      let that = this;
      httpService.nowWeather(function (response) {
        if (response && response.success) {
          that.nowWeatherInfo = response.data;
        }
      });
    },
    // 获取未来12小时天气
    getFultherWeather() {
      let that = this;
      httpService.fultherWeather(function (response) {
        if (response && response.success) {
          that.fultherWeatherInfo = response.data;
        }
      });
    },
    // 获取未来三天的天气
    getThreeDaysWeather() {
      let that = this;
      httpService.threeDaysWeather(function (response) {
        if (response && response.success) {
          that.threeDaysWeatherInfo = response.data;
        }
      });
    },
    handleBannerChange(key1, key2) {
      console.log(key1, key2);
      if (key1 === 0) {
        this.bannerStatus = 2;
        this.$refs.videoPlayer.player.play();
        // this.player.muted(false);
      }
    },
    gradientToColor(color) {},
    setCircle1(percent) {
      var deg = percent * 360;
      var reDeg = 0;
      if (deg >= 180) {
        reDeg = deg - 315;
        document.querySelectorAll(".circle-right")[0].style.transform =
          "rotate(45deg)";
        document.querySelectorAll(".circle-left")[0].style.transform =
          "rotate(" + reDeg + "deg)";
      } else {
        reDeg = deg - 135;
        document.querySelectorAll(".circle-right")[0].style.transform =
          "rotate(" + reDeg + "deg)";
        document.querySelectorAll(".circle-left")[0].style.transform =
          "rotate(-135deg)";
      }
    },
    setCircle2(percent) {
      var deg = percent * 360;
      var reDeg = 0;
      if (deg >= 180) {
        reDeg = deg - 315;
        document.querySelectorAll(".circle-right")[1].style.transform =
          "rotate(45deg)";
        document.querySelectorAll(".circle-left")[1].style.transform =
          "rotate(" + reDeg + "deg)";
      } else {
        reDeg = deg - 135;
        document.querySelectorAll(".circle-right")[1].style.transform =
          "rotate(" + reDeg + "deg)";
        document.querySelectorAll(".circle-left")[1].style.transform =
          "rotate(-135deg)";
      }
    },
    goLoginPage() {
      this.loginInfo.status = 2;
      this.addTimeoutTken();
      if (this.configTimerToken) {
        clearInterval(this.configTimerToken);
      }
      // this.$router.push({
      //   name:"Demo"
      // })
    },
    login() {},
    ownerLogin() {
      this.dialogAccessVisible = true;
    },
    confirmAccessPassword(status) {
      if (this.password === "1234") {
        this.dialogAccessVisible = false;
        this.loginInfo.status = status;
        this.addTimeoutTken();
        this.password = "";
      } else {
        this.$message({
          message: "密码错误，请重新输入！",
          type: "warning",
        });
      }
    },
    visitorsLogin() {
      this.loginInfo.status = 3.2;
      this.getInfo();
      this.addTimeoutTken();
    },
    goScreen() {
      this.bannerStatus = 1;
      this.loginInfo.status = 1;
      this.clearTimeoutToken();
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      var day = new Date(timeStamp).getDay();
      var weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      var week = weeks[day];
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日," +
        " " +
        week +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    onPlay(event) {
      this.$refs.videoPlayer.player.play();
    },
    onPause(event) {
      console.log(event);
    },
    onEended(event) {
      this.bannerStatus = 1;
    },
    // 每一小时，更新一次天气
    updateWeather() {
      setTimeout(() => {
        console.log("整分更新天气");
        this.getNowweather();
        this.getFultherWeather();
        this.updateWeather();
      }, 3600000);
    },
    // 清除锁屏定时器
    clearTimeoutToken() {
      window.clearTimeout(this.timeoutToken);
      console.log("清除定时器");
      this.timeoutToken = null;
    },
    addTimeoutTken() {
      if (this.timeoutToken) {
        console.log("清除之前的定时器");
        window.clearTimeout(this.timeoutToken);
      }
      this.timeoutToken = setTimeout(() => {
        console.log("回到屏保");
        this.loginInfo.status = 1;
      }, 180000);
      console.log("开启新的定时器");
    },
    // 去配置页
    goToConfig() {
      this.loginInfo.status = 4;
      this.addTimeoutTken();
      this.getInfo();
      this.configTimerToken = setInterval(() => {
        this.getInfo();
      }, 5000);
    },
    // 写入数据
    remoteWriting(tag, val) {
      this.addTimeoutTken();
      if (tag === "V1000.0" && val === 1) {
        this.isShowBtns = false;
      } else if (tag === "V1000.0" && val === 0) {
        this.isShowBtns = true;
      } else if (tag === "V1000.1" && val === 0) {
        this.isSingleContral = true;
      } else if (tag === "V1000.1" && val === 1) {
        this.isSingleContral = false;
      }
      httpService.remoteWriting(tag, val, () => {
        setTimeout(() => {
          this.getInfo();
        }, 2000);
      });
    },
    // 批量写入数据
    remoteWritingList(tag, val) {
      if (this.ownerConfigPageStatus[tag]) {
        return;
      } else {
        this.remoteWriting(tag, val);
        for (const key in this.ownerConfigPageStatus) {
          if (Object.hasOwnProperty.call(this.ownerConfigPageStatus, key)) {
            const item = this.ownerConfigPageStatus[key];
            if (item) {
              if (tag === key) {
                continue;
              }
              this.remoteWriting(key, 0);
              this.ownerConfigPageStatus[key] = false;
            }
          }
        }
        this.ownerConfigPageStatus[tag] = true;
      }
    },
    stopRainBack() {
      if (this.ownerConfigPageStatus["V1000.4"]) {
        this.remoteWriting("V1000.4", 0);
        this.ownerConfigPageStatus["V1000.4"] = false;
      }
      if (this.ownerConfigPageStatus["V1000.5"]) {
        this.remoteWriting("V1000.5", 0);
        this.ownerConfigPageStatus["V1000.5"] = false;
      }
      if (this.ownerConfigPageStatus["V1000.6"]) {
        this.remoteWriting("V1000.6", 0);
        this.ownerConfigPageStatus["V1000.6"] = false;
      }
      if (this.ownerConfigPageStatus["V1000.7"]) {
        this.remoteWriting("V1000.7", 0);
        this.ownerConfigPageStatus["V1000.7"] = false;
      }
    },
    stopWaterCheck() {
      if (this.ownerConfigPageStatus["V1002.6"]) {
        this.remoteWriting("V1002.6", 0);
        this.ownerConfigPageStatus["V1002.6"] = false;
      }
      if (this.ownerConfigPageStatus["V1002.7"]) {
        this.remoteWriting("V1002.7", 0);
        this.ownerConfigPageStatus["V1002.7"] = false;
      }
    },
    // 液位设定
    configFlur(type) {
      if (!this.isShowBtns) {
        return;
      }
      this.fluVlue = "";
      this.configType = type;
      this.dialogTableVisible = true;
    },
    confirmPassword() {
      this.dialogTableVisible = false;
      if (this.fluVlue) {
        let value = Number(Number(this.fluVlue).toFixed(1));
        if (this.configType === 1) {
          this.remoteWriting("VD904", value);
        } else if (this.configType === 2) {
          this.remoteWriting("VD900", value);
        } else if (this.configType === 3) {
          this.remoteWriting("VD912", value);
        } else if (this.configType === 4) {
          this.remoteWriting("VD908", value);
        } else if (this.configType === 5) {
          this.remoteWriting("VD920", value);
        } else if (this.configType === 6) {
          this.remoteWriting("VD916", value);
        }
      }
    },
    // 频率设定
    configfrequency() {
      if (!this.isShowBtns) {
        return;
      }
      this.frequencyVlue2 = "";
      this.dialogFrequencyVlueVisible = true;
    },
    confirmFrequency() {
      this.dialogFrequencyVlueVisible = false;
      if (this.frequencyVlue2) {
        let value = Number(Number(this.frequencyVlue2).toFixed(1));
        this.remoteWriting("VW1038", value);
      }
    },
    configPressure() {
      if (!this.isShowBtns) {
        return;
      }
      this.pressureVlue2 = "";
      this.dialogPressureVlueVisible = true;
    },
    configPressureValue() {
      this.dialogPressureVlueVisible = false;
      if (this.pressureVlue2) {
        let value = Number(Number(this.pressureVlue2).toFixed(1));
        this.remoteWriting("VW1036", value);
      }
    },
    toggleFullScreen() {
      if (this.isFullScreen) {
        this.exitFullscreen();
        this.isFullScreen = false;
      } else {
        this.toFullScreen();
        this.isFullScreen = true;
      }
    },
    // 全屏
    toFullScreen() {
      let el = document.documentElement;
      let rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;

      //typeof rfs != "undefined" && rfs
      if (rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      } else {
        alert("浏览器不支持全屏");
      }
    },
    // 退出全屏
    exitFullscreen() {
      let el = parent.document;
      let cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;

      //typeof cfs != "undefined" && cfs
      if (cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      } else {
        alert("切换失败,可尝试Esc退出");
      }
    },
  },
  computed: {
    getNum() {
      return Math.ceil(Math.random() * 8);
    },
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  created: function () {
    let that = this;
    httpService.getNews(function (response) {
      if (response && response.success) {
        that.newsList = response.data;
      }
    });
    this.nowTimes();
    this.getNowweather();
    this.getFultherWeather();
    this.getThreeDaysWeather();
    let myDate = new Date();
    let myDateS = myDate.getSeconds() * 1000;
    let myDateMs = 1000 - myDate.getMilliseconds();
    // 3600000
    setTimeout(() => {
      // 整小时第一次更新天气
      console.log("整分第一次更新天气");
      this.updateWeather();
    }, 3600000 - myDateS - myDateMs);
  },
  mounted: function () {
    let that = this;
    // 屏蔽右键
    document.oncontextmenu = () => false;
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./Home.scss";
</style>
