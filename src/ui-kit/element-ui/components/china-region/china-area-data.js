import { cloneDeep } from "lodash";
import areaData from "china-area-data";

let REGION_DATAStr = JSON.stringify(areaData);

// 繁体文字处理
const TraditionalChineseEnum = {
  區: "区",
  灣: "湾",
  東: "东",
  龍: "龙",
  觀: "观",
  門: "门",
  貢: "贡",
  離: "离",
  島: "岛",
  瑪: "玛",
  風: "风",
  聖: "圣",
  濟: "济"
};
Object.keys(TraditionalChineseEnum).forEach(key => {
  REGION_DATAStr = REGION_DATAStr.replace(new RegExp(key, "g"), TraditionalChineseEnum[key]);
});

const REGION_DATA = JSON.parse(REGION_DATAStr);

// code 转汉字大对象
const CodeToText = {};
// 汉字转 code 大对象
const TextToCode = {};
const provinceObject = REGION_DATA["86"]; // 省份对象
const regionData = [];
let provinceAndCityData = [];

CodeToText[""] = "全部";

// 计算省
for (const prop in provinceObject) {
  regionData.push({
    value: prop, // 省份 code 值
    label: provinceObject[prop] // 省份汉字
  });
  CodeToText[prop] = provinceObject[prop];
  TextToCode[provinceObject[prop]] = {
    code: prop
  };
  TextToCode[provinceObject[prop]]["全部"] = {
    code: ""
  };
}

// 计算市
for (let i = 0, len = regionData.length; i < len; i++) {
  const provinceCode = regionData[i].value;
  const provinceText = regionData[i].label;
  const provinceChildren = [];
  for (const prop in REGION_DATA[provinceCode]) {
    let label = REGION_DATA[provinceCode][prop];
    if (label === "市辖区") {
      label = provinceText;
      if (provinceText === "重庆市") {
        label = `${provinceText}-市辖区`;
      }
    }
    if (label === "县") {
      label = `${provinceText}-县`;
    }
    provinceChildren.push({
      value: prop,
      label: label
    });
    CodeToText[prop] = label;
    TextToCode[provinceText][label] = {
      code: prop
    };
    TextToCode[provinceText][label]["全部"] = {
      code: ""
    };
  }
  if (provinceChildren.length) {
    regionData[i].children = provinceChildren;
  }
}
provinceAndCityData = cloneDeep(regionData);

// 计算区
for (let i = 0, len = regionData.length; i < len; i++) {
  const province = regionData[i].children;
  const provinceText = regionData[i].label;
  if (province) {
    for (let j = 0, len = province.length; j < len; j++) {
      const cityCode = province[j].value;
      const cityText = province[j].label;
      const cityChildren = [];
      for (const prop in REGION_DATA[cityCode]) {
        cityChildren.push({
          value: prop,
          label: REGION_DATA[cityCode][prop]
        });
        CodeToText[prop] = REGION_DATA[cityCode][prop];
        TextToCode[provinceText][cityText][REGION_DATA[cityCode][prop]] = {
          code: prop
        };
      }
      if (cityChildren.length) {
        province[j].children = cityChildren;
      }
    }
  }
}

// 处理香港、澳门数据保证一致性
provinceAndCityData.forEach(it => {
  if (it.value === "810000" || it.value === "820000") {
    // 省市数据只需要两层
    it.children = [
      {
        label: it.label,
        value: it.value
      }
    ];
  }
});
// 处理香港、澳门数据（再嵌套一层，保证数据一致为 3层）
regionData.forEach(it => {
  if (it.value === "810000" || it.value === "820000") {
    it.children = [cloneDeep(it)];
    // TextToCode 文案枚举同样做嵌套操作
    if (Object.keys(TextToCode[it.label]).length > 2) {
      TextToCode[it.label] = {
        code: it.value,
        [it.label]: cloneDeep(TextToCode[it.label])
      };
    }
  }
});

// 添加“全部”选项
const provinceAndCityDataPlus = cloneDeep(provinceAndCityData);
provinceAndCityDataPlus.unshift({
  value: "",
  label: "全部"
});
for (let i = 0, len = provinceAndCityDataPlus.length; i < len; i++) {
  const province = provinceAndCityDataPlus[i].children;
  if (province && province.length) {
    province.unshift({
      value: "",
      label: "全部"
    });

    for (let j = 0, len = province.length; j < len; j++) {
      const city = province[j].children;
      if (city && city.length) {
        city.unshift({
          value: "",
          label: "全部"
        });
      }
    }
  }
}

const regionDataPlus = cloneDeep(regionData);
regionDataPlus.unshift({
  value: "",
  label: "全部"
});
for (let i = 0, len = regionDataPlus.length; i < len; i++) {
  const province = regionDataPlus[i].children;
  if (province && province.length) {
    province.unshift({
      value: "",
      label: "全部"
    });

    for (let j = 0, len = province.length; j < len; j++) {
      const city = province[j].children;
      if (city && city.length) {
        city.unshift({
          value: "",
          label: "全部"
        });
      }
    }
  }
}

function getCityName(city, district) {
  if (city === "重庆市") {
    let suffix = "市辖区";
    if (district.endsWith("县")) {
      suffix = "县";
    }
    return `${city}-${suffix}`;
  }
  return city;
}

export {
  // 省市数据
  provinceAndCityData,
  // 省市区数据
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
  getCityName
};
