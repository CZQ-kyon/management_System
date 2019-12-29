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
                <span v-else-if="!shensuo1">
                  <span class="glyphicon glyphicon-chevron-down icon_up"></span>
                </span>
              </div>
              <transition name="shensuo">
                <div v-show="shensuo1">
                  <a href class="count" @click.prevent="returnCom('message_table')">打卡次数</a>
                  <a href class="teacher-time" @click.prevent="returnCom('message_table')">上课时间</a>
                  <a href class="money" @click.prevent="returnCom('message_table')">工资</a>
                </div>
              </transition>
            </li>

            <li class="showStudent">
              <div class="show3" @click="shensuo3=!shensuo3">
                学员信息
                <span v-if="shensuo3">
                  <span class="glyphicon glyphicon-chevron-up icon_up"></span>
                </span>
                <span v-else-if="!shensuo3">
                  <span class="glyphicon glyphicon-chevron-down icon_up"></span>
                </span>
              </div>
              <transition>
                <div v-show="shensuo3">
                  <a href @click.prevent="returnCom('student_table')">学号</a>
                  <a href @click.prevent="returnCom('student_table')">姓名</a>
                </div>
              </transition>
            </li>

            <li class="showControl">
              <div class="show2" @click="shensuo2=!shensuo2">
                设备控制
                <span v-if="shensuo2">
                  <span class="glyphicon glyphicon-chevron-up icon_up"></span>
                </span>
                <span v-else-if="!shensuo2">
                  <span class="glyphicon glyphicon-chevron-down icon_up"></span>
                </span>
              </div>
              <transition name="shensuo">
                <div v-show="shensuo2">
                  <a href="#light" @click.prevent="returnCom('light')">灯</a>
                  <a href="#fan" @click.prevent="returnCom('fan')">风扇</a>
                  <a href="#Twet" @click.prevent="returnCom('Twet')">温湿度</a>
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
                <th>教师姓名</th>
                <th>教师工号</th>
                <th>课程名称</th>
                <th>打卡次数</th>
                <th>打卡时间</th>
                <th>上课时间</th>
                <th>课时费</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{teachertrueData.teacher_name}}</td>
                <td>{{teachertrueData.schoolid}}</td>
                <td>{{teachertrueData.course}}</td>
                <td>{{teachertrueData.count}}</td>
                <td>{{teachertrueData.count_time}}</td>
                <td>{{teachertrueData.study_time}}</td>
                <td>{{teachertrueData.money}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="student_table" id="student_table">
          <span class="message_title">学生信息</span>
          <div class="hr"></div>

          <div class="add-button">
            <a
              href
              class="button button-glow button-rounded button-raised button-primary add-homeword pull-right"
              data-toggle="modal"
              data-target="#add_homewordModal"
            >
              +&nbsp;
              发布作业
            </a>
            <div class="modal fade" id="add_homewordModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">发布作业</h4>
                  </div>

                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="message-text" class="control-label">本周作业:</label>
                        <textarea class="form-control" id="message-text" v-model="temphomeword"></textarea>
                      </div>
                    </form>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancelHomeword">取消</button>
                    <button type="button" class="btn btn-primary" @click.prevent="saveHomeword">保存</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table class="table table-hover container" style="width: 90%;border-radius: 6px;">
            <thead>
              <tr>
                <th>学号</th>
                <th>学生姓名</th>
                <th>家长姓名</th>
                <th>家长电话</th>
                <th>上课时间</th>
                <th>作业</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key,index) in studenttrueData" :key="index" v-if="item">
                <td>{{item.schoolid}}</td>
                <th>{{item.child_name}}</th>
                <th>{{item.parent_name}}</th>
                <th>{{item.phone}}</th>
                <td>{{item.study_time}}</td>
                <th>{{item.homeword}}</th>
                <!-- 操作功能 -->
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#exampleModal2"
                    style="text-decoration: none;color:#1890FF;cursor: pointer;"
                    @click.prevent="getIndex(item.schoolid)"
                  >评价</a>

                  <div class="modal fade" id="exampleModal2">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 class="modal-title">学生评价</h4>
                        </div>

                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="message-text" class="control-label">评价内容:</label>
                              <textarea
                                class="form-control"
                                id="message-text"
                                v-model="tempcomment"
                              ></textarea>
                            </div>
                          </form>
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancelComment">取消</button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="saveComment"
                          >保存</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="light" id="light">
          <span class="light_title">灯设备</span>
          <div class="hr"></div>
          <div class="control-light container">
            <span class="title col-md-2 col-sm-2 col-xs-2">开关：</span>
            <div class="switch-box">
              <input type="checkbox" class="switch-input" id="switch-input" />
              <span class="switch-txt pull-right" data-open-txt="已开启" data-close-txt="已关闭"></span>
              <label class="switch-label pull-right" for="switch-input"></label>
            </div>
          </div>
        </div>

        <div class="fan" id="fan">
          <span class="fan_title">风扇设备</span>
          <div class="hr"></div>
          <div class="control-fan container">
            <span class="title col-md-2 col-sm-2 col-xs-2">开关：</span>
            <div class="switch-box">
              <input type="checkbox" class="switch-input" id="switch-input2" />
              <span class="switch-txt pull-right" data-open-txt="已开启" data-close-txt="已关闭"></span>
              <label class="switch-label pull-right" for="switch-input2"></label>
            </div>
          </div>
        </div>

        <div class="Twet" id="Twet">
          <span class="Twet_title">温湿度设备</span>
          <div class="hr"></div>

          <div class="Tep container">
            <span class="title col-md-2 col-sm-2 col-xs-2">温度：</span>
            <div class="Tkuang"></div>
          </div>

          <div class="Wet container">
            <span class="title col-md-2 col-sm-2 col-xs-2">湿度：</span>
            <div class="Wkuang"></div>
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
      schoolid: this.$route.params.schoolid,
      tempschoolid: "",
      temphomeword: "",
      tempcomment: "",
      teacherData: [],
      studentData: [],
      teachertrueData: [],
      studenttrueData: [],
      flag: true,
      shensuo1: true,
      shensuo2: true,
      shensuo3: true
    };
  },
  created() {
    //获取教师信息
    axios.get(`http://116.62.171.43:3000/getdata_teacher`).then(res => {
      this.teacherData = res.data.data;
      for (var i = 0; i < this.teacherData.length; i++) {
        if (this.schoolid == this.teacherData[i].schoolid) {
          this.teachertrueData = this.teacherData[i];
        }
      }
    });

    //获取学生信息
    axios.get(`http://116.62.171.43:3000/getdata_student`).then(res => {
      this.studentData = res.data.data;
      var s = 0;
      for (var i = 0; i < this.studentData.length; i++) {
        if (this.teachertrueData.course == this.studentData[i].course) {
          this.studenttrueData[s++] = this.studentData[i];
        }
      }
      this.$forceUpdate();
    });
  },
  methods: {
    getAxios(url, params, showNotify) {
      return new Promise((resolve, reject) => {
        axios({
          method: params ? "post" : "get",
          url: url,
          data: params
        })
          .then(res => {
            if (res.data.code == 200) {
              resolve(res);
            } else {
              reject(`${res.data.data}`);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    returnCom(add) {
      const returnEle = document.querySelector("#" + add);
      if (!!returnEle) {
        returnEle.scrollIntoView(true);
      }
    },

    getIndex(schoolid) {
      this.tempschoolid = schoolid;
      //根据schoolid, 操作students_table
    },

    cancelComment(){
      this.tempcomment = this.tempschoolid = "";
    },

    saveComment() {
      var tempstudentData = {
        comment: this.tempcomment,
        schoolid: this.tempschoolid,
        course:this.teachertrueData.course
      };
      this.getAxios(
        `http://116.62.171.43:3000/updatedata_studentcomment`,
        tempstudentData
      ).then(res => {
        this.studenttrueData[
          this.studenttrueData.findIndex(e => e.schoolid == tempstudentData.schoolid)
        ] = res.data.data;
        console.log(res.data.data);
      });
      this.tempschoolid = "";
    },

    cancelHomeword(){
      this.temphomeword ="";
    },

    saveHomeword() {
      var tempstudentData = {
        homeword: this.temphomeword,
        course: this.teachertrueData.course
      };

      this.getAxios(
        `http://116.62.171.43:3000/updatedata_studenthomeword`,
        tempstudentData
      ).then(res => {
        this.studenttrueData = res.data.data;
        console.log(this.studenttrueData);
      });
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
.left .showControl a,
.left .showStudent a {
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
.left .showControl a:hover,
.left .showStudent a:hover {
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

.left .showStudent .show3,
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
.left .showControl .show2 .icon_up,
.left .showStudent .show3 .icon_up {
  float: right;
  width: 30px;
  height: 30px;
  line-height: 40px;
  margin-right: 30px;
}

.left .showStudent,
.left .showControl {
  margin: 3px 0;
}

.left .showStudent .show3,
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

.left .showStudent .show3::before,
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

.right .message_table,
.right .student_table {
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  padding-bottom: 40px;
}

.right .message_table .hr,
.right .student_table .hr,
.right .light .hr,
.right .fan .hr,
.right .Twet .hr {
  height: 2px;
  width: 90%;
  background-color: #c0bcbc;
  margin: 30px auto;
}

.right .message_table table,
.right .student_table table {
  margin-bottom: 30px;
  border-radius: 4px;
}

.right .student_table .add-button {
  width: 90%;
  height: 32px;
  margin: 0 auto;
  margin-top: -15px;
  margin-bottom: 15px;
}

.right .student_table .add-button .add-homeword {
  width: 108px !important;
  height: 35px !important;
  padding: 0 2px !important;
  background-color: rgba(24, 144, 255, 1);
  border-radius: 4px;
  font-family: "微软雅黑";
  font-weight: 400;
  font-style: normal;
  font-style: 14px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  margin-right: 20px;
}

/*表格表头样式*/
.right .message_table table thead,
.right .student_table table thead {
  background-color: rgba(240, 242, 245, 1);
}

/*开头大文字样式*/
.right .message_table .message_title,
.right .student_table .message_title,
.right .light .light_title,
.right .fan .fan_title,
.right .Twet .Twet_title {
  display: inline-block;
  font-weight: 650;
  font-size: 30px;
  color: #333;
  letter-spacing: 14px;
  margin-top: 30px;
  margin-left: 30px;
}

/*教师样式 + 设备样式*/
.right .student_table,
.right .light,
.right .fan,
.right .Twet {
  border-radius: 8px;
  background-color: #fff;
  margin-top: 60px;
  overflow: hidden;
  padding-bottom: 40px;
}

.light .control-light,
.fan .control-fan,
.Twet .Tep,
.Twet .Wet {
  display: flex;
}

.light .control-light .title,
.fan .control-fan .title,
.Twet .Tep .title,
.Twet .Wet .title {
  font-size: 22px;
  letter-spacing: 6px;
  font-weight: 650;
  flex-grow: 3;
  line-height: 48px;
}

.Twet .Tep {
  margin-bottom: 40px;
}

.Twet .Tep .Tkuang,
.Twet .Wet .Wkuang {
  flex-grow: 4;
  align-self: center;
  position: relative;
  height: 48px;
  box-shadow: 0 1.2px 4px 0 rgba(0, 0, 0, 0.9);
  border-radius: 6px;
}

/*开关样式*/
.switch-box {
  flex-grow: 7;
  align-self: center;
  position: relative;
  height: 48px;
  width: 60%;
  margin: 0 auto;
  box-shadow: 0 1.2px 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}

.switch-input {
  opacity: 0;
}

.switch-label {
  position: relative;
  width: 60px;
  height: 30px;
  background-color: #e3e3e3;
  border-radius: 20px;
  transition: 0.3s;
  margin-top: 9px;
  margin-right: 25px;
}

.switch-label::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
  transition: 0.3s;
}

.switch-input:checked ~ .switch-label {
  background-color: #05abc1;
}

.switch-input:checked ~ .switch-label::after {
  left: 33px;
}

.switch-txt {
  position: relative;
  margin-left: 5px;
  line-height: 48px;
  font-size: 18px;
  letter-spacing: 5px;
  margin-right: 5px;
  font-weight: 650px;
}

.switch-txt::after {
  content: attr(data-close-txt);
}

.switch-input:checked ~ .switch-txt::after {
  content: attr(data-open-txt);
}
</style>