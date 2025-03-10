// Copyright 2021 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import {Link} from "react-router-dom";
import {Select, Tag, Tooltip, message, theme} from "antd";
import {QuestionCircleTwoTone} from "@ant-design/icons";
import {isMobile as isMobileDevice} from "react-device-detect";
import "./i18n";
import i18next from "i18next";
import copy from "copy-to-clipboard";
import {authConfig} from "./auth/Auth";
import {Helmet} from "react-helmet";
import * as Conf from "./Conf";
import * as phoneNumber from "libphonenumber-js";
import * as path from "path-browserify";

const {Option} = Select;

export const ServerUrl = "";

// export const StaticBaseUrl = "https://cdn.jsdelivr.net/gh/casbin/static";
export const StaticBaseUrl = "https://cdn.casbin.org";

export const Countries = [{label: "English", key: "en", country: "US", alt: "English"},
  {label: "中文", key: "zh", country: "CN", alt: "中文"},
  {label: "Español", key: "es", country: "ES", alt: "Español"},
  {label: "Français", key: "fr", country: "FR", alt: "Français"},
  {label: "Deutsch", key: "de", country: "DE", alt: "Deutsch"},
  {label: "Indonesia", key: "id", country: "ID", alt: "Indonesia"},
  {label: "日本語", key: "ja", country: "JP", alt: "日本語"},
  {label: "한국어", key: "ko", country: "KR", alt: "한국어"},
  {label: "Русский", key: "ru", country: "RU", alt: "Русский"},
  {label: "TiếngViệt", key: "vi", country: "VN", alt: "TiếngViệt"},
];

export function getThemeData(organization, application) {
  if (application?.themeData?.isEnabled) {
    return application.themeData;
  } else if (organization?.themeData?.isEnabled) {
    return organization.themeData;
  } else {
    return Conf.ThemeDefault;
  }
}

export function getAlgorithm(themeAlgorithmNames) {
  return themeAlgorithmNames.map((algorithmName) => {
    if (algorithmName === "dark") {
      return theme.darkAlgorithm;
    }
    if (algorithmName === "compact") {
      return theme.compactAlgorithm;
    }
    return theme.defaultAlgorithm;
  });
}

export function getAlgorithmNames(themeData) {
  const algorithms = [themeData?.themeType !== "dark" ? "default" : "dark"];
  if (themeData?.isCompact === true) {
    algorithms.push("compact");
  }

  return algorithms;
}

export const OtherProviderInfo = {
  SMS: {
    "Aliyun SMS": {
      logo: `${StaticBaseUrl}/img/social_aliyun.png`,
      url: "https://aliyun.com/product/sms",
    },
    "Tencent Cloud SMS": {
      logo: `${StaticBaseUrl}/img/social_tencent_cloud.jpg`,
      url: "https://cloud.tencent.com/product/sms",
    },
    "Volc Engine SMS": {
      logo: `${StaticBaseUrl}/img/social_volc_engine.jpg`,
      url: "https://www.volcengine.com/products/cloud-sms",
    },
    "Huawei Cloud SMS": {
      logo: `${StaticBaseUrl}/img/social_huawei.png`,
      url: "https://www.huaweicloud.com/product/msgsms.html",
    },
    "Twilio SMS": {
      logo: `${StaticBaseUrl}/img/social_twilio.svg`,
      url: "https://www.twilio.com/messaging",
    },
    "SmsBao SMS": {
      logo: `${StaticBaseUrl}/img/social_smsbao.png`,
      url: "https://www.smsbao.com/",
    },
    "SUBMAIL SMS": {
      logo: `${StaticBaseUrl}/img/social_submail.svg`,
      url: "https://www.mysubmail.com",
    },
    "Mock SMS": {
      logo: `${StaticBaseUrl}/img/social_default.png`,
      url: "",
    },
  },
  Email: {
    "Default": {
      logo: `${StaticBaseUrl}/img/email_default.png`,
      url: "",
    },
    "SUBMAIL": {
      logo: `${StaticBaseUrl}/img/social_submail.svg`,
      url: "https://www.mysubmail.com",
    },
    "Mailtrap": {
      logo: `${StaticBaseUrl}/img/email_mailtrap.png`,
      url: "https://mailtrap.io",
    },
  },
  Storage: {
    "Local File System": {
      logo: `${StaticBaseUrl}/img/social_file.png`,
      url: "",
    },
    "AWS S3": {
      logo: `${StaticBaseUrl}/img/social_aws.png`,
      url: "https://aws.amazon.com/s3",
    },
    "MinIO": {
      logo: "https://min.io/resources/img/logo.svg",
      url: "https://min.io/",
    },
    "Aliyun OSS": {
      logo: `${StaticBaseUrl}/img/social_aliyun.png`,
      url: "https://aliyun.com/product/oss",
    },
    "Tencent Cloud COS": {
      logo: `${StaticBaseUrl}/img/social_tencent_cloud.jpg`,
      url: "https://cloud.tencent.com/product/cos",
    },
    "Azure Blob": {
      logo: `${StaticBaseUrl}/img/social_azure.png`,
      url: "https://azure.microsoft.com/en-us/services/storage/blobs/",
    },
  },
  SAML: {
    "Aliyun IDaaS": {
      logo: `${StaticBaseUrl}/img/social_aliyun.png`,
      url: "https://aliyun.com/product/idaas",
    },
    "Keycloak": {
      logo: `${StaticBaseUrl}/img/social_keycloak.png`,
      url: "https://www.keycloak.org/",
    },
  },
  Payment: {
    "Alipay": {
      logo: `${StaticBaseUrl}/img/payment_alipay.png`,
      url: "https://www.alipay.com/",
    },
    "WeChat Pay": {
      logo: `${StaticBaseUrl}/img/payment_wechat_pay.png`,
      url: "https://pay.weixin.qq.com/",
    },
    "PayPal": {
      logo: `${StaticBaseUrl}/img/payment_paypal.png`,
      url: "https://www.paypal.com/",
    },
    "GC": {
      logo: `${StaticBaseUrl}/img/payment_gc.png`,
      url: "https://gc.org",
    },
  },
  Captcha: {
    "Default": {
      logo: `${StaticBaseUrl}/img/captcha_default.png`,
      url: "https://pkg.go.dev/github.com/dchest/captcha",
    },
    "reCAPTCHA": {
      logo: `${StaticBaseUrl}/img/social_recaptcha.png`,
      url: "https://www.google.com/recaptcha",
    },
    "hCaptcha": {
      logo: `${StaticBaseUrl}/img/social_hcaptcha.png`,
      url: "https://www.hcaptcha.com",
    },
    "Aliyun Captcha": {
      logo: `${StaticBaseUrl}/img/social_aliyun.png`,
      url: "https://help.aliyun.com/product/28308.html",
    },
    "GEETEST": {
      logo: `${StaticBaseUrl}/img/social_geetest.png`,
      url: "https://www.geetest.com",
    },
    "Cloudflare Turnstile": {
      logo: `${StaticBaseUrl}/img/social_cloudflare.png`,
      url: "https://www.cloudflare.com/products/turnstile/",
    },
  },
};

export function initCountries() {
  const countries = require("i18n-iso-countries");
  countries.registerLocale(require("i18n-iso-countries/langs/" + getLanguage() + ".json"));
  return countries;
}

export function getCountryCode(country) {
  if (phoneNumber.isSupportedCountry(country)) {
    return phoneNumber.getCountryCallingCode(country);
  }
  return "";
}

export function getCountryCodeData(countryCodes = phoneNumber.getCountries()) {
  return countryCodes?.map((countryCode) => {
    if (phoneNumber.isSupportedCountry(countryCode)) {
      const name = initCountries().getName(countryCode, getLanguage());
      return {
        code: countryCode,
        name: name || "",
        phone: phoneNumber.getCountryCallingCode(countryCode),
      };
    }
  }).filter(item => item.name !== "")
    .sort((a, b) => a.phone - b.phone);
}

export function getCountryCodeOption(country) {
  return (
    <Option key={country.code} value={country.code} label={`+${country.phone}`} text={`${country.name}, ${country.code}, ${country.phone}`} >
      <div style={{display: "flex", justifyContent: "space-between", marginRight: "10px"}}>
        <div>
          {getCountryImage(country)}
          {`${country.name}`}
        </div>
        {`+${country.phone}`}
      </div>
    </Option>
  );
}

export function getCountryImage(country) {
  return <img src={`${StaticBaseUrl}/flag-icons/${country.code}.svg`} alt={country.name} height={20} style={{marginRight: 10}} />;
}

export function initServerUrl() {
  // const hostname = window.location.hostname;
  // if (hostname === "localhost") {
  //   ServerUrl = `http://${hostname}:8000`;
  // }
}

export function isLocalhost() {
  const hostname = window.location.hostname;
  return hostname === "localhost";
}

export function getFullServerUrl() {
  let fullServerUrl = window.location.origin;
  if (fullServerUrl === "http://localhost:7001") {
    fullServerUrl = "http://localhost:8000";
  }
  return fullServerUrl;
}

export function isProviderVisible(providerItem) {
  if (providerItem.provider === undefined || providerItem.provider === null) {
    return false;
  }

  if (providerItem.provider.category !== "OAuth" && providerItem.provider.category !== "SAML") {
    return false;
  }

  if (providerItem.provider.type === "WeChatMiniProgram") {
    return false;
  }

  return true;
}

export function isResponseDenied(data) {
  if (data.msg === "Unauthorized operation" || data.msg === "未授权的操作") {
    return true;
  }
  return false;
}

export function isProviderVisibleForSignUp(providerItem) {
  if (providerItem.canSignUp === false) {
    return false;
  }

  return isProviderVisible(providerItem);
}

export function isProviderVisibleForSignIn(providerItem) {
  if (providerItem.canSignIn === false) {
    return false;
  }

  return isProviderVisible(providerItem);
}

export function isProviderPrompted(providerItem) {
  return isProviderVisible(providerItem) && providerItem.prompted;
}

export function isSignupItemPrompted(signupItem) {
  return signupItem.visible && signupItem.prompted;
}

export function getAllPromptedProviderItems(application) {
  return application.providers.filter(providerItem => isProviderPrompted(providerItem));
}

export function getAllPromptedSignupItems(application) {
  return application.signupItems.filter(signupItem => isSignupItemPrompted(signupItem));
}

export function getSignupItem(application, itemName) {
  const signupItems = application.signupItems?.filter(signupItem => signupItem.name === itemName);
  if (signupItems.length === 0) {
    return null;
  }
  return signupItems[0];
}

export function isValidPersonName(personName) {
  return personName !== "";

  // // https://blog.css8.cn/post/14210975.html
  // const personNameRegex = /^[\u4e00-\u9fa5]{2,6}$/;
  // return personNameRegex.test(personName);
}

export function isValidIdCard(idCard) {
  return idCard !== "";

  // const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/;
  // return idCardRegex.test(idCard);
}

export function isValidEmail(email) {
  // https://github.com/yiminghe/async-validator/blob/057b0b047f88fac65457bae691d6cb7c6fe48ce1/src/rule/type.ts#L9
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone, countryCode = "") {
  if (countryCode !== "" && countryCode !== "CN") {
    return phoneNumber.isValidPhoneNumber(phone, countryCode);
  }

  // https://learnku.com/articles/31543, `^s*$` filter empty email individually.
  const phoneCnRegex = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  const phoneRegex = /[0-9]{4,15}$/;

  return countryCode === "CN" ? phoneCnRegex.test(phone) : phoneRegex.test(phone);
}

export function isValidInvoiceTitle(invoiceTitle) {
  return invoiceTitle !== "";

  // if (invoiceTitle === "") {
  //   return false;
  // }
  //
  // // https://blog.css8.cn/post/14210975.html
  // const invoiceTitleRegex = /^[()（）\u4e00-\u9fa5]{0,50}$/;
  // return invoiceTitleRegex.test(invoiceTitle);
}

export function isValidTaxId(taxId) {
  return taxId !== "";

  // // https://www.codetd.com/article/8592083
  // const regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i];
  // for (let i = 0; i < regArr.length; i++) {
  //   if (regArr[i].test(taxId)) {
  //     return true;
  //   }
  // }
  // return false;
}

export function isAffiliationPrompted(application) {
  const signupItem = getSignupItem(application, "Affiliation");
  if (signupItem === null) {
    return false;
  }

  return signupItem.prompted;
}

export function hasPromptPage(application) {
  const providerItems = getAllPromptedProviderItems(application);
  if (providerItems.length !== 0) {
    return true;
  }

  const signupItems = getAllPromptedSignupItems(application);
  if (signupItems.length !== 0) {
    return true;
  }

  return isAffiliationPrompted(application);
}

function isAffiliationAnswered(user, application) {
  if (!isAffiliationPrompted(application)) {
    return true;
  }

  if (user === null) {
    return false;
  }
  return user.affiliation !== "";
}

function isProviderItemAnswered(user, application, providerItem) {
  if (user === null) {
    return false;
  }

  const provider = providerItem.provider;
  const linkedValue = user[provider.type.toLowerCase()];
  return linkedValue !== undefined && linkedValue !== "";
}

function isSignupItemAnswered(user, signupItem) {
  if (user === null) {
    return false;
  }

  if (signupItem.name !== "Country/Region") {
    return true;
  }

  const value = user["region"];
  return value !== undefined && value !== "";
}

export function isPromptAnswered(user, application) {
  if (!isAffiliationAnswered(user, application)) {
    return false;
  }

  const providerItems = getAllPromptedProviderItems(application);
  for (let i = 0; i < providerItems.length; i++) {
    if (!isProviderItemAnswered(user, application, providerItems[i])) {
      return false;
    }
  }

  const signupItems = getAllPromptedSignupItems(application);
  for (let i = 0; i < signupItems.length; i++) {
    if (!isSignupItemAnswered(user, signupItems[i])) {
      return false;
    }
  }
  return true;
}

export function parseObject(s) {
  try {
    return eval("(" + s + ")");
  } catch (e) {
    return null;
  }
}

export function parseJson(s) {
  if (s === "") {
    return null;
  } else {
    return JSON.parse(s);
  }
}

export function myParseInt(i) {
  const res = parseInt(i);
  return isNaN(res) ? 0 : res;
}

export function openLink(link) {
  // this.props.history.push(link);
  const w = window.open("about:blank");
  w.location.href = link;
}

export function openLinkSafe(link) {
  // Javascript window.open issue in safari
  // https://stackoverflow.com/questions/45569893/javascript-window-open-issue-in-safari
  const a = document.createElement("a");
  a.href = link;
  a.setAttribute("target", "_blank");
  a.click();
}

export function goToLink(link) {
  window.location.href = link;
}

export function goToLinkSoft(ths, link) {
  if (link.startsWith("http")) {
    openLink(link);
    return;
  }

  ths.props.history.push(link);
}

export function showMessage(type, text) {
  if (type === "success") {
    message.success(text);
  } else if (type === "error") {
    message.error(text);
  } else if (type === "info") {
    message.info(text);
  }
}

export function isAdminUser(account) {
  if (account === undefined || account === null) {
    return false;
  }
  return account.owner === "built-in" || account.isGlobalAdmin === true;
}

export function isLocalAdminUser(account) {
  if (account === undefined || account === null) {
    return false;
  }
  return account.isAdmin === true || isAdminUser(account);
}

export function deepCopy(obj) {
  return Object.assign({}, obj);
}

export function addRow(array, row, position = "end") {
  return position === "end" ? [...array, row] : [row, ...array];
}

export function deleteRow(array, i) {
  // return array = array.slice(0, i).concat(array.slice(i + 1));
  return [...array.slice(0, i), ...array.slice(i + 1)];
}

export function swapRow(array, i, j) {
  return [...array.slice(0, i), array[j], ...array.slice(i + 1, j), array[i], ...array.slice(j + 1)];
}

export function trim(str, ch) {
  if (str === undefined) {
    return undefined;
  }

  let start = 0;
  let end = str.length;

  while (start < end && str[start] === ch) {++start;}

  while (end > start && str[end - 1] === ch) {--end;}

  return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}

export function isMobile() {
  // return getIsMobileView();
  return isMobileDevice;
}

export function getFormattedDate(date) {
  if (date === undefined) {
    return null;
  }

  date = date.replace("T", " ");
  date = date.replace("+08:00", " ");
  return date;
}

export function getFormattedDateShort(date) {
  return date.slice(0, 10);
}

export function getShortName(s) {
  return s.split("/").slice(-1)[0];
}

export function getNameAtLeast(s) {
  s = getShortName(s);
  if (s.length >= 6) {
    return s;
  }

  return (
    <React.Fragment>
      &nbsp;
      {s}
      &nbsp;
      &nbsp;
    </React.Fragment>
  );
}

export function getShortText(s, maxLength = 35) {
  if (s.length > maxLength) {
    return `${s.slice(0, maxLength)}...`;
  } else {
    return s;
  }
}

export function getFriendlyFileSize(size) {
  if (size < 1024) {
    return size + " B";
  }

  const i = Math.floor(Math.log(size) / Math.log(1024));
  let num = (size / Math.pow(1024, i));
  const round = Math.round(num);
  num = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round;
  return `${num} ${"KMGTPEZY"[i - 1]}B`;
}

function getHashInt(s) {
  let hash = 0;
  if (s.length !== 0) {
    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
  }

  if (hash < 0) {
    hash = -hash;
  }
  return hash;
}

export function getAvatarColor(s) {
  const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const hash = getHashInt(s);
  return colorList[hash % 4];
}

export function getLanguageText(text) {
  if (!text.includes("|")) {
    return text;
  }

  let res;
  const tokens = text.split("|");
  if (getLanguage() !== "zh") {
    res = trim(tokens[0], "");
  } else {
    res = trim(tokens[1], "");
  }
  return res;
}

export function getLanguage() {
  return i18next.language ?? Conf.DefaultLanguage;
}

export function setLanguage(language) {
  localStorage.setItem("language", language);
  i18next.changeLanguage(language);
}

export function getAcceptLanguage() {
  if (i18next.language === null || i18next.language === "") {
    return "en;q=0.9,en;q=0.8";
  }
  return i18next.language + ";q=0.9,en;q=0.8";
}

export function getClickable(text) {
  return (
    <a onClick={() => {
      copy(text);
      showMessage("success", "Copied to clipboard");
    }}>
      {text}
    </a>
  );
}

export function getProviderLogoURL(provider) {
  if (provider.category === "OAuth") {
    if (provider.type === "Custom") {
      return provider.customLogo;
    }
    return `${StaticBaseUrl}/img/social_${provider.type.toLowerCase()}.png`;
  } else {
    const info = OtherProviderInfo[provider.category][provider.type];
    // avoid crash when provider is not found
    if (info) {
      return info.logo;
    }
    return "";
  }
}

export function getProviderLogo(provider) {
  const idp = provider.type.toLowerCase().trim().split(" ")[0];
  const url = getProviderLogoURL(provider);
  return (
    <img width={30} height={30} src={url} alt={idp} />
  );
}

export function getProviderTypeOptions(category) {
  if (category === "OAuth") {
    return (
      [
        {id: "Google", name: "Google"},
        {id: "GitHub", name: "GitHub"},
        {id: "QQ", name: "QQ"},
        {id: "WeChat", name: "WeChat"},
        {id: "WeChatMiniProgram", name: "WeChat Mini Program"},
        {id: "Facebook", name: "Facebook"},
        {id: "DingTalk", name: "DingTalk"},
        {id: "Weibo", name: "Weibo"},
        {id: "Gitee", name: "Gitee"},
        {id: "LinkedIn", name: "LinkedIn"},
        {id: "WeCom", name: "WeCom"},
        {id: "Lark", name: "Lark"},
        {id: "GitLab", name: "GitLab"},
        {id: "Adfs", name: "Adfs"},
        {id: "Baidu", name: "Baidu"},
        {id: "Alipay", name: "Alipay"},
        {id: "Casdoor", name: "Casdoor"},
        {id: "Infoflow", name: "Infoflow"},
        {id: "Apple", name: "Apple"},
        {id: "AzureAD", name: "AzureAD"},
        {id: "Slack", name: "Slack"},
        {id: "Steam", name: "Steam"},
        {id: "Bilibili", name: "Bilibili"},
        {id: "Okta", name: "Okta"},
        {id: "Douyin", name: "Douyin"},
        {id: "Line", name: "Line"},
        {id: "Amazon", name: "Amazon"},
        {id: "Auth0", name: "Auth0"},
        {id: "BattleNet", name: "Battle.net"},
        {id: "Bitbucket", name: "Bitbucket"},
        {id: "Box", name: "Box"},
        {id: "CloudFoundry", name: "Cloud Foundry"},
        {id: "Dailymotion", name: "Dailymotion"},
        {id: "Deezer", name: "Deezer"},
        {id: "DigitalOcean", name: "DigitalOcean"},
        {id: "Discord", name: "Discord"},
        {id: "Dropbox", name: "Dropbox"},
        {id: "EveOnline", name: "Eve Online"},
        {id: "Fitbit", name: "Fitbit"},
        {id: "Gitea", name: "Gitea"},
        {id: "Heroku", name: "Heroku"},
        {id: "InfluxCloud", name: "InfluxCloud"},
        {id: "Instagram", name: "Instagram"},
        {id: "Intercom", name: "Intercom"},
        {id: "Kakao", name: "Kakao"},
        {id: "Lastfm", name: "Lastfm"},
        {id: "Mailru", name: "Mailru"},
        {id: "Meetup", name: "Meetup"},
        {id: "MicrosoftOnline", name: "MicrosoftOnline"},
        {id: "Naver", name: "Naver"},
        {id: "Nextcloud", name: "Nextcloud"},
        {id: "OneDrive", name: "OneDrive"},
        {id: "Oura", name: "Oura"},
        {id: "Patreon", name: "Patreon"},
        {id: "PayPal", name: "PayPal"},
        {id: "SalesForce", name: "SalesForce"},
        {id: "Shopify", name: "Shopify"},
        {id: "Soundcloud", name: "Soundcloud"},
        {id: "Spotify", name: "Spotify"},
        {id: "Strava", name: "Strava"},
        {id: "Stripe", name: "Stripe"},
        {id: "TikTok", name: "TikTok"},
        {id: "Tumblr", name: "Tumblr"},
        {id: "Twitch", name: "Twitch"},
        {id: "Twitter", name: "Twitter"},
        {id: "Typetalk", name: "Typetalk"},
        {id: "Uber", name: "Uber"},
        {id: "VK", name: "VK"},
        {id: "Wepay", name: "Wepay"},
        {id: "Xero", name: "Xero"},
        {id: "Yahoo", name: "Yahoo"},
        {id: "Yammer", name: "Yammer"},
        {id: "Yandex", name: "Yandex"},
        {id: "Zoom", name: "Zoom"},
        {id: "Custom", name: "Custom"},
      ]
    );
  } else if (category === "Email") {
    return (
      [
        {id: "Default", name: "Default"},
        {id: "SUBMAIL", name: "SUBMAIL"},
        {id: "Mailtrap", name: "Mailtrap"},
      ]
    );
  } else if (category === "SMS") {
    return (
      [
        {id: "Aliyun SMS", name: "Aliyun SMS"},
        {id: "Tencent Cloud SMS", name: "Tencent Cloud SMS"},
        {id: "Volc Engine SMS", name: "Volc Engine SMS"},
        {id: "Huawei Cloud SMS", name: "Huawei Cloud SMS"},
        {id: "Twilio SMS", name: "Twilio SMS"},
        {id: "SmsBao SMS", name: "SmsBao SMS"},
        {id: "SUBMAIL SMS", name: "SUBMAIL SMS"},
      ]
    );
  } else if (category === "Storage") {
    return (
      [
        {id: "Local File System", name: "Local File System"},
        {id: "AWS S3", name: "AWS S3"},
        {id: "MinIO", name: "MinIO"},
        {id: "Aliyun OSS", name: "Aliyun OSS"},
        {id: "Tencent Cloud COS", name: "Tencent Cloud COS"},
        {id: "Azure Blob", name: "Azure Blob"},
      ]
    );
  } else if (category === "SAML") {
    return ([
      {id: "Aliyun IDaaS", name: "Aliyun IDaaS"},
      {id: "Keycloak", name: "Keycloak"},
    ]);
  } else if (category === "Payment") {
    return ([
      {id: "Alipay", name: "Alipay"},
      {id: "WeChat Pay", name: "WeChat Pay"},
      {id: "PayPal", name: "PayPal"},
      {id: "GC", name: "GC"},
    ]);
  } else if (category === "Captcha") {
    return ([
      {id: "Default", name: "Default"},
      {id: "reCAPTCHA", name: "reCAPTCHA"},
      {id: "hCaptcha", name: "hCaptcha"},
      {id: "Aliyun Captcha", name: "Aliyun Captcha"},
      {id: "GEETEST", name: "GEETEST"},
      {id: "Cloudflare Turnstile", name: "Cloudflare Turnstile"},
    ]);
  } else {
    return [];
  }
}

export function renderLogo(application) {
  if (application === null) {
    return null;
  }

  if (application.homepageUrl !== "") {
    return (
      <a target="_blank" rel="noreferrer" href={application.homepageUrl}>
        <img className="panel-logo" width={250} src={application.logo} alt={application.displayName} />
      </a>
    );
  } else {
    return (
      <img className="panel-logo" width={250} src={application.logo} alt={application.displayName} />
    );
  }
}

export function getLoginLink(application) {
  let url;
  if (application === null) {
    url = null;
  } else if (!application.enablePassword && window.location.pathname.includes("/auto-signup/oauth/authorize")) {
    url = window.location.href.replace("/auto-signup/oauth/authorize", "/login/oauth/authorize");
  } else if (authConfig.appName === application.name) {
    url = "/login";
  } else if (application.signinUrl === "") {
    url = path.join(application.homepageUrl, "/login");
  } else {
    url = application.signinUrl;
  }
  return url;
}

export function renderLoginLink(application, text) {
  const url = getLoginLink(application);
  return renderLink(url, text, null);
}

export function redirectToLoginPage(application, history) {
  const loginLink = getLoginLink(application);
  if (loginLink.indexOf("http") === 0 || loginLink.indexOf("https") === 0) {
    window.location.replace(loginLink);
  }
  history.push(loginLink);
}

function renderLink(url, text, onClick) {
  if (url === null) {
    return null;
  }

  if (url.startsWith("/")) {
    return (
      <Link style={{float: "right"}} to={url} onClick={() => {
        if (onClick !== null) {
          onClick();
        }
      }}>{text}</Link>
    );
  } else if (url.startsWith("http")) {
    return (
      <a target="_blank" rel="noopener noreferrer" style={{float: "right"}} href={url} onClick={() => {
        if (onClick !== null) {
          onClick();
        }
      }}>{text}</a>
    );
  } else {
    return null;
  }
}

export function renderSignupLink(application, text) {
  let url;
  if (application === null) {
    url = null;
  } else if (!application.enablePassword && window.location.pathname.includes("/login/oauth/authorize")) {
    url = window.location.href.replace("/login/oauth/authorize", "/auto-signup/oauth/authorize");
  } else if (authConfig.appName === application.name) {
    url = "/signup";
  } else {
    if (application.signupUrl === "") {
      url = `/signup/${application.name}`;
    } else {
      url = application.signupUrl;
    }
  }

  const storeSigninUrl = () => {
    sessionStorage.setItem("signinUrl", window.location.href);
  };

  return renderLink(url, text, storeSigninUrl);
}

export function renderForgetLink(application, text) {
  let url;
  if (application === null) {
    url = null;
  } else if (authConfig.appName === application.name) {
    url = "/forget";
  } else {
    if (application.forgetUrl === "") {
      url = `/forget/${application.name}`;
    } else {
      url = application.forgetUrl;
    }
  }

  return renderLink(url, text, null);
}

export function renderHelmet(application) {
  if (application === undefined || application === null || application.organizationObj === undefined || application.organizationObj === null || application.organizationObj === "") {
    return null;
  }

  return (
    <Helmet>
      <title>{application.organizationObj.displayName}</title>
      <link rel="icon" href={application.organizationObj.favicon} />
    </Helmet>
  );
}

export function getLabel(text, tooltip) {
  return (
    <React.Fragment>
      <span style={{marginRight: 4}}>{text}</span>
      <Tooltip placement="top" title={tooltip}>
        <QuestionCircleTwoTone twoToneColor="rgb(45,120,213)" />
      </Tooltip>
    </React.Fragment>
  );
}

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export function getOption(label, value) {
  return {
    label,
    value,
  };
}

function repeat(str, len) {
  while (str.length < len) {
    str += str.substr(0, len - str.length);
  }
  return str;
}

function maskString(s) {
  if (s.length <= 2) {
    return s;
  } else {
    return `${s[0]}${repeat("*", s.length - 2)}${s[s.length - 1]}`;
  }
}

export function getMaskedPhone(s) {
  return s.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
}

export function getMaskedEmail(email) {
  if (email === "") {return;}
  const tokens = email.split("@");
  let username = tokens[0];
  username = maskString(username);

  const domain = tokens[1];
  const domainTokens = domain.split(".");
  domainTokens[domainTokens.length - 2] = maskString(domainTokens[domainTokens.length - 2]);

  return `${username}@${domainTokens.join(".")}`;
}

export function getArrayItem(array, key, value) {
  const res = array.filter(item => item[key] === value)[0];
  return res;
}

export function getDeduplicatedArray(array, filterArray, key) {
  const res = array.filter(item => filterArray.filter(filterItem => filterItem[key] === item[key]).length === 0);
  return res;
}

export function getNewRowNameForTable(table, rowName) {
  const emptyCount = table.filter(row => row.name.includes(rowName)).length;
  let res = rowName;
  for (let i = 0; i < emptyCount; i++) {
    res = res + " ";
  }
  return res;
}

export function getTagColor(s) {
  return "processing";
}

export function getTags(tags, urlPrefix = null) {
  const res = [];
  if (!tags) {
    return res;
  }

  tags.forEach((tag, i) => {
    if (urlPrefix === null) {
      res.push(
        <Tag color={getTagColor(tag)}>
          {tag}
        </Tag>
      );
    } else {
      res.push(
        <Link to={`/${urlPrefix}/${tag}`}>
          <Tag color={getTagColor(tag)}>
            {tag}
          </Tag>
        </Link>
      );
    }
  });
  return res;
}

export function getTag(color, text) {
  return (
    <Tag color={color}>
      {text}
    </Tag>
  );
}

export function getApplicationOrgName(application) {
  return `${application?.organizationObj.owner}/${application?.organizationObj.name}`;
}

export function getApplicationName(application) {
  return `${application?.owner}/${application?.name}`;
}

export function getRandomName() {
  return Math.random().toString(36).slice(-6);
}

export function getRandomNumber() {
  return Math.random().toString(10).slice(-11);
}

export function getFromLink() {
  const from = sessionStorage.getItem("from");
  if (from === null) {
    return "/";
  }
  return from;
}

export function scrollToDiv(divId) {
  if (divId) {
    const ele = document.getElementById(divId);
    if (ele) {
      ele.scrollIntoView({behavior: "smooth"});
    }
  }
}

export function inIframe() {
  try {
    return window !== window.parent;
  } catch (e) {
    return true;
  }
}
