<template>
  <div>

    <div v-html="abc"></div>
    <p style="text-align:center!important;border: 1px solid red;"> <img
        src="https://f.medsimmeta.com/3Dprint/3DModelDescription/1778666823341_Snipaste_2026-05-13_18-05-40.png" alt=""
        data-href="https://f.medsimmeta.com/3Dprint/3DModelDescription/1778666823341_Snipaste_2026-05-13_18-05-40.png"
        style="height: 434.42px; display: inline-block;"></p>
    <p style="text-align:center!important;border: 1px solid red;">
      <img src="https://f.medsimmeta.com/3Dprint/3DModelDescription/1778666823341_Snipaste_2026-05-13_18-05-40.png"
        alt=""
        data-href="https://f.medsimmeta.com/3Dprint/3DModelDescription/1778666823341_Snipaste_2026-05-13_18-05-40.png"
        style="max-width: 100%; height: auto;">
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import CryptoJS from 'crypto-js';


const abc = ref('<p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">一、</span><strong>病例基础信息 </strong></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">1. </span><strong>疾病诊断：</strong><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">右中叶支气管异物模拟</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\"> </span></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">2. </span><strong>就诊情况：</strong><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">患者因【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">反复咳嗽</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】就诊，专科体格检查提示【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">右侧肺部哮鸣音</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】，结合影像学及实验室检查明确诊断，拟行【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">右中叶支气管异物取出术</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】 </span></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">二、</span><strong>术前检查 </strong></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">1. </span><strong>影像学检查：</strong><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">【CT】检查（层厚【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">0.6914</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">mm】，DICOM格式），明确【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">右中叶支气管内异物</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】 </span></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">2. </span><strong>实验室检查：</strong><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">血常规、肝肾功能、凝血功能等关键指标【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">均正常</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】 </span></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">3. </span><strong>专科评估</strong><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">：【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">呼吸功能正常</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】 </span></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">三、</span><strong>术前规划：</strong></p><p style=\"text-indent: 21pt;\"><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">基于3D模型开展多学科会诊（【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">呼吸内科、胸外科</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】），明确【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">右肺中叶支气管内异物</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】 - 利用模型模拟【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">右肺中叶支气管内异物取出术</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】，制定个性化手术方案及应急预案 </span></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">四、</span><strong>手术实操：</strong></p><p style=\"text-indent: 21pt;\"><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">采用【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">鼻部进入方法</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】，借助3D打印导板精准完成【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">利用内窥镜进入气道</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】 - 术中通过【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">内窥摄像头</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】验证</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">异物</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">位置，调整操作角度，避免损伤【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">气道粘膜</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】 - 术后即刻复查【影像学检查】，确认【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">异物取出</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】 </span></p><p><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">五、</span><strong>术后管理：</strong></p><p style=\"text-indent: 21pt;\"><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">采取</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">半卧位</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">】</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">避免剧烈运动</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">【</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">至少一</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255);\">周】，</span><span style=\"color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: 宋体;\">定期进行【体温监测】，注意是否再次出现【咳嗽、咳血、呼吸困难】等。术后复查【胸片或胸部CT】，排除【气胸或阻塞性肺炎】。</span></p><p style=\"text-align: center;\"> <img src=\"https://f.medsimmeta.com/3Dprint/3DModelDescription/1778666823341_Snipaste_2026-05-13_18-05-40.png\" alt=\"\" data-href=\"https://f.medsimmeta.com/3Dprint/3DModelDescription/1778666823341_Snipaste_2026-05-13_18-05-40.png\" style=\"width: 677.00px;height: 434.42px;\"></p>')
const API_BASE = '/api';
const SECRET = "YxmKSrQR4uoJ5lOoWIhcbd7SlUEh9OOc";

const isLoggedIn = ref(!!localStorage.getItem('yjb_token'));
const currentView = ref('accounts');
const loading = ref(false);
const qrUrl = ref('');
const loginStatusText = ref('');
const accountList = ref([]);
const selectedAccId = ref(null);
const holdings = ref([]);
const generateSign = (path, token, timestamp) => {
  const tokenStr = token || "";
  const signPath = path.split('?')[0];
  return CryptoJS.MD5(signPath + tokenStr + timestamp + SECRET).toString();
};
const account_assets = computed(() => {
  // 如果 holdings 为空，返回 0
  if (!holdings.value || holdings.value.length === 0) {
    return 0;
  }

  // 计算总账户资产
  const totalAssets = holdings.value.reduce((sum, fund) => {
    const share = fund.hold_share || 0; // 持有份额
    const netValue = fund.last_net || 0; // 最新净值
    return sum + share * netValue;
  }, 0);

  return totalAssets.toFixed(2); // 保留两位小数
});

/**
 * 封装请求
 * @param {string} method
 * @param {string} path
 * @param {boolean} silent 是否静默请求（不触发全局loading）
 */
const request = async (method, path, silent = false) => {
  if (!silent) loading.value = true;
  try {
    const token = localStorage.getItem('yjb_token') || "";
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = generateSign(path, token, timestamp);
    const res = await axios({
      method,
      url: API_BASE + path,
      headers: {
        'Request-Time': timestamp,
        'Request-Sign': sign,
        'Authorization': token
      }
    });
    return res.data.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  } finally {
    if (!silent) loading.value = false;
  }
};

const getQrCode = async () => {
  const res = await request('get', '/qr_code');
  qrUrl.value = res.url;
  loginStatusText.value = '养基宝公众号授权...';

  const timer = setInterval(async () => {
    try {
      // 轮询扫码状态使用 silent=true，避免界面不停闪烁loading
      const s = await request('get', `/qr_code_state/${res.id}`, true);
      if (s.state == 2) {
        clearInterval(timer);
        localStorage.setItem('yjb_token', s.token);
        isLoggedIn.value = true;
        fetchAccounts();
      }
    } catch (e) {
      clearInterval(timer);
    }
  }, 3000);
};
const saveApi = async () => {
  fetch('http://localhost:10086/save-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: '132' })
  })
    .then(response => {
      if (response.ok) {
        console.log('Token saved to server');
      } else {
        console.error('Failed to save token');
      }
    })
    .catch(error => {
      console.error('Network error:', error);
    });
};
const fetchAccounts = async () => {
  // saveApi()

  const res = await request('get', '/user_account');
  accountList.value = res.list || [];
  if (accountList.value.length > 0) {
    selectAccount(selectedAccId.value || accountList.value[0].id);
  }
};

const selectAccount = async (id) => {
  selectedAccId.value = id;
  holdings.value = await request('get', `/fund_hold?account_id=${id}`) || [];
};

const refreshAccountData = () => fetchAccounts();

const logout = () => {
  localStorage.clear()
  isLoggedIn.value = false;
  qrUrl.value = '';
};

// 工具函数
const getGszzl = (f) => f.nv_info?.gszzl || f.nv_info?.vgszzl || 0;
const calcEarn = (f) => ((f.hold_share || 0) * (f.last_net || 0) * (getGszzl(f) / 100)).toFixed(2);
const calcRate = (f) => (f.hold_share * f.hold_cost) === 0 ? 0 : ((f.hold_earn / (f.hold_share * f.hold_cost)) * 100).toFixed(2);
const getColorClass = (value) => {
  const num = parseFloat(value);
  if (num > 0) return 'txt-red';
  if (num < 0) return 'txt-green';
  return '';
};
const formatValue = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
};

const totalEstimatedIncome = computed(() =>
  holdings.value.reduce((sum, f) => sum + parseFloat(calcEarn(f)), 0)
);

onMounted(() => {
  if (isLoggedIn.value) fetchAccounts();
});
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f4f7f9;
}

.header {
  flex-shrink: 0;
  background: #1890ff;
  color: #fff;
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
}

.main-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.fixed-top-area {
  flex-shrink: 0;
  background: #fff;
  z-index: 100;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  color: #1890ff;
  font-size: 14px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.account-tab-header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.account-tabs {
  display: flex;
  overflow-x: auto;
  flex: 1;
  gap: 8px;
  scrollbar-width: none;
}

.account-tabs::-webkit-scrollbar {
  display: none;
}

.tab-item {
  padding: 6px 15px;
  border: 1px solid #eee;
  border-radius: 20px;
  white-space: nowrap;
  font-size: 12px;
  background: #fafafa;
  cursor: pointer;
}

.tab-item.active {
  border-color: #1890ff;
  background: #e6f7ff;
  color: #1890ff;
}

.account-summary-strip {
  padding: 12px 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.scrollable-wrapper {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #fff;
}

.sticky-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.sticky-table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f8f9fa;
  padding: 10px 0;
  color: #999;
  font-size: 13px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.sticky-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #f9f9f9;
  font-size: 14px;
}

.login-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 80%;
}

.qr-box img {
  width: 180px;
  height: 180px;
  margin: 0 auto 10px;
}

.blink-text {
  color: #666;
  font-size: 13px;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}

.col-name {
  width: 40%;
}

.col-rate {
  width: 18%;
}

.col-earn {
  width: 21%;
}

.f-name {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
}

.f-code {
  margin-top: 2px;
  font-size: 13px;
  color: #999;
}

.txt-red {
  color: #f5222d;
}

.txt-green {
  color: #52c41a;
}

.btn-refresh-mini {
  padding-left: 10px;
  font-size: 20px;
  color: #1890ff;
  cursor: pointer;
}

.btn-logout {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}

.btn-primary:disabled {
  background: #bfbfbf;
}

.empty-state {
  padding: 60px;
  text-align: center;
  color: #ccc;
}
</style>