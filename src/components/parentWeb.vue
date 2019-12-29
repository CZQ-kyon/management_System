<template>
  <div>
    <span class="glyphicon glyphicon-menu-hamburger but" @click="flag=!flag"></span>
    <div class="top">
      <a href class="button button-raised button-primary button-pill" @click.prevent="out">退出登录</a>
    </div>

    <div class="row">
      <transition name="fade">
        <div class="left col-md-2" v-show="flag">
          <div class="product-nav-title">权 限</div>
          <ul>
            <li class="showMessage">
              <div class="show1" @click="shensuo1=!shensuo1">
                信息查看
                <span v-if="shensuo1">
                  <span class="glyphicon glyphicon-chevron-up icon_up"></span>
                </span>
                <span v-else-if="!shensuo1" key="index">
                  <span class="glyphicon glyphicon-chevron-down icon_up"></span>
                </span>
              </div>
              <transition name="shensuo">
                <div v-show="shensuo1">
                  <a href class="name" @click.prevent="returnCom('message_table')">孩子信息</a>
                  <a href class="study_time" @click.prevent="returnCom('message_table')">上课信息</a>
                  <a href class="money" @click.prevent="returnCom('message_table')">作业信息</a>
                </div>
              </transition>
            </li>

            <li class="showControl">
              <div class="show2" @click="shensuo2=!shensuo2">
                设备控制
                <span v-if="shensuo2">
                  <span class="glyphicon glyphicon-chevron-up icon_up"></span>
                </span>
                <span v-else-if="!shensuo2" key="index">
                  <span class="glyphicon glyphicon-chevron-down icon_up"></span>
                </span>
              </div>
              <transition name="shensuo">
                <div v-show="shensuo2">
                  <a href @click.prevent="returnCom('cameras')">摄像头</a>
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </transition>

      <div class="right container container-fluid col-md-9 col-md-11 col-xs-12">
        <div class="message_table" id="message_table">
          <span class="message_title">信息查看</span>
          <div class="hr"></div>

          <table class="table table-hover container" style="width: 90%;border-radius: 6px;">
            <thead>
              <tr>
                <th>学号</th>
                <th>孩子姓名</th>
                <th>课程名</th>
                <th>打卡次数</th>
                <th>打卡时间</th>
                <th>上课时间</th>
                <th>作业</th>
                <th>教师评价</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key,index) in studenttrueData" v-if="item">
                <td>{{item.schoolid}}</td>
                <td>{{item.child_name}}</td>
                <td>{{item.course}}</td>
                <td>{{item.count}}</td>
                <td>{{item.count_time}}</td>
                <td>{{item.study_time}}</td>
                <td>{{item.homeword}}</td>
                <td>{{item.comment}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cameras" id="cameras">
          <span class="cameras_title">摄像头</span>
          <div class="hr"></div>
          <div class="container">
            <video src controls="controls" width="500" height="300">您的浏览器不支持播放该视频！</video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parent_name: this.$route.params.parent_name,
      studentData: [],
      studenttrueData: [],
      flag: true,
      shensuo1: true,
      shensuo2: true
    };
  },
  created() {
    axios.get(`http://116.62.171.43:3000/getdata_student`).then(res => {
      this.studentData = res.data.data;
      var s = 0;
      for (var i = 0; i < this.studentData.length; i++) {
        if (this.parent_name == this.studentData[i].parent_name) {
          this.studenttrueData[s++] = this.studentData[i];
        }
      }
      this.$forceUpdate();
    });
  },
  methods: {
    returnCom(add) {
      const returnEle = document.querySelector("#" + add);
      if (!!returnEle) {
        returnEle.scrollIntoView(true);
      }
    },
    out() {
      this.$router.push("/");
    }
  }
};
</script>

<style scope>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

body {
  background-color: rgba(240, 242, 245, 1);
}

.top {
  width: 100%;
  height: 50px;
  z-index: 1111;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
}

.top a {
  margin: 5px auto;
  float: right;
  font-size: 18px;
  padding: 0 20px;
}

.but {
  font-size: 40px;
  color: #8d8e8f;
  padding-top: 2px;
  padding-left: 2px;
  width: 45px;
  top: 4px;
  left: 30px;
  border-radius: 4px;
  position: fixed;
  background-color: #fff;

  box-shadow: 3px 2px 4px rgba(101, 163, 255, 0.8);
  z-index: 1000;
}

.but:hover {
  box-shadow: 0 0 0 2px rgba(101, 163, 255, 0.8);
}

/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-210px);
}

.shensuo-enter-active,
.shensuo-leave-active {
  transition: all 0.4s ease;
}

.shensuo-enter,
.shensuo-leave-to {
  opacity: 0;
}

.left {
  position: fixed;
  border-radius: 4px;
  float: left;
  left: 0;
  top: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  margin-top: 5px;
  width: 208px;
  height: 479px;
  background-color: #f5f5f5;
  display: block;
  box-shadow: 0 1px 4px 0 rgba(101, 163, 255, 0.8);
}

@media (max-width: 860px) {
  .left {
    display: none;
    transition: 0.5s;
  }

  .but {
    display: none;
    transition: 0.5s;
  }
}

.left .showMessage a,
.left .showControl a {
  text-decoration: none;
  color: #333;
  display: block;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-indent: 16px;
}

.left .showMessage a:hover,
.left .showControl a:hover {
  background: #dedede;
}

.left .product-nav-title {
  height: 48px;
  line-height: 48px;
  text-indent: 16px;
  font-size: 18px;
  border-bottom: 1px solid #dedede;
  font-weight: 550;
  color: rgb(80, 156, 255);
  letter-spacing: 5px;
}

.left .showMessage .show1 {
  height: 40px;
  line-height: 40px;
  text-indent: 16px;
  font-size: 16px;
  padding-top: 3px;
  font-weight: 600;
  letter-spacing: 3px;
}

.left .showMessage .show1 .icon_up,
.left .showControl .show2 .icon_up {
  float: right;
  width: 30px;
  height: 30px;
  line-height: 40px;
  margin-right: 30px;
}

.left .showControl {
  margin: 3px 0;
}

.left .showControl .show2 {
  height: 40px;
  line-height: 40px;
  text-indent: 16px;
  font-size: 16px;
  padding-top: 3px;
  padding-left: 15px;
  font-weight: 600;
  letter-spacing: 3px;
}

.left .showControl .show2::before {
  content: "";
  width: 170px;
  height: 1px;
  background: #c0bcbc;
  display: table;
  margin-left: -5px;
}

.right {
  position: relative;
  margin-left: 250px;
  margin-top: 20px;
  float: left;
}

@media (max-width: 860px) {
  .right {
    margin-left: 0;
    transition: 0.5s;
  }
}

.right .message_table {
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  padding-bottom: 40px;
}

.right .message_table .hr,
.right .cameras .hr {
  height: 2px;
  width: 90%;
  background-color: #c0bcbc;
  margin: 30px auto;
}

.right .message_table table {
  margin-bottom: 30px;
  border-radius: 4px;
}

/*表格表头样式*/
.right .message_table table thead {
  background-color: rgba(240, 242, 245, 1);
}

/*开头大文字样式*/
.right .message_table .message_title,
.right .cameras .cameras_title {
  display: inline-block;
  font-weight: 650;
  font-size: 30px;
  color: #333;
  letter-spacing: 14px;
  margin-top: 30px;
  margin-left: 30px;
}

/*教师样式 + 设备样式*/
.right .cameras {
  border-radius: 8px;
  background-color: #fff;
  margin-top: 60px;
  overflow: hidden;
  padding-bottom: 40px;
  position: relative;
}
</style>