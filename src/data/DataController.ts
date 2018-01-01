import axios from "axios";
import default_setting from "../data/default_setting.json";
export default class DataController {
  data: any;
  constructor() {
    if (localStorage.hasOwnProperty("data")) {
      this.data = this.loadData("data");
    } else {
      this.data = {};
      this.data = default_setting;
      // this.data.setting.date.start = this.setDateNow();
      // this.getDateNow();
      // this.saveData('data', this.data);
      this.setStartTime();
    }
    window.addEventListener(
      "blur",
      () => {
        this.saveData("data", this.data);
      },
      false
    );
  }
  getDateNow() {
    return axios.head(window.location.href).then((res) => {
      return new Date(res.headers.date);
    });
  }
  async setStartTime() {
    this.data.date.start = (await this.getDateNow()).getTime();
  }
  loadData(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  saveData(key: string, data: object) {
    console.log("save!!");
    localStorage.setItem(key, JSON.stringify(data));
  }
  async checkTime() {
    // 経過時間チェック
    // const startDiff = Math.floor(
    //   ((await this.getDateNow()).getTime() - new Date(this.data.date.start).getTime()) /
    //     3600000
    // );
    this.data.param.phase = 1;
    const startDiff = 15;
    this.checkEvol(startDiff);
  }
  checkEvol(hour: number) {
    if (1 <= hour && hour < 14 && this.data.param.phase == 0) {
      // デカマサラ
      return "masara";
    } else if (14 <= hour && hour < 24 && this.data.param.phase == 1) {
      // まきこorらんしぁ
      
      // for (let i = 0; i < this.data.param.ability.length; i++) {
      //   console.log(this.data.param.ability[i]);
      // }
      let max = '';
      for (const key in this.data.param.ability) {
        // console.log(value)
        
      }
    } else if (14 <= hour && hour < 24 && this.data.param.phase == 2) {
      // 成体
    } else if (24 <= hour) {
      // 墓
    }
  }
}
