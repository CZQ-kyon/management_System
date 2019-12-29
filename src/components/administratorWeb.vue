<template>
  <div>
    <span class="glyphicon glyphicon-menu-hamburger but" @click="flag=!flag"></span>
    <div class="top">
      <a href class="button button-raised button-primary button-pill" @click.prevent="out">退出登录</a>
    </div>

    <div class="row">
      <transition name="fade">
        <div class="left col-md-2" v-show="flag">
          <div class="product-nav-title">管理权限</div>
          <ul>
            <li class="showUser">
              <div class="show1" @click="shensuo1=!shensuo1">
                信息管理
                <span v-if="shensuo1">
                  <span class="glyphicon glyphicon-chevron-up icon_up"></span>
                </span>
                <span v-else-if="!shensuo1">
                  <span class="glyphicon glyphicon-chevron-down icon_up"></span>
                </span>
              </div>
              <transition name="shensuo">
                <div v-show="shensuo1">
                  <a href class="jiazhang" @click.prevent="returnCom('parents_table')">家长</a>
                  <a href class="xuesheng" @click.prevent="returnCom('students_table')">学生</a>
                  <a href class="jiaoshi" @click.prevent="returnCom('teachers_table')">教师</a>
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
                  <a href @click.prevent="returnCom('light')">灯</a>
                  <a href @click.prevent="returnCom('fan')">风扇</a>
                  <a href @click.prevent="returnCom('Twet')">温湿度</a>
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </transition>

      <div class="right container container-fluid col-md-9 col-sm-11 col-xs-12">
        <div class="parents_table" id="parents_table">
          <span class="parent_title">家长信息</span>
          <div class="hr"></div>

          <div class="add-button">
            <a
              href
              class="button button-glow button-rounded button-raised button-primary add-parent pull-right"
              data-toggle="modal"
              data-target="#add_parentModal"
            >
              +&nbsp;
              新建家长
            </a>
            <div class="modal fade" id="add_parentModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">新建家长</h4>
                  </div>

                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="parent-name">家长姓名:</label>
                        <input type="text" class="kuang" id="parent-name" v-model="tempparent_name" />
                      </div>
                      <div class="form-group">
                        <label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
                        <input type="text" class="kuang" id="password" v-model="temppassword" />
                      </div>
                    </form>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                      @click.prevent="cancel"
                    >取消</button>
                    <button type="button" class="btn btn-primary" @click.prevent="addParent">保存</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table class="table table-hover container" style="width: 90%;border-radius: 6px;">
            <thead>
              <tr>
                <th>家长姓名</th>
                <th>密码</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key,index) of parentData" :key="index">
                <td>{{item.parent_name}}</td>
                <td>{{item.password}}</td>
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#exampleModal"
                    style="text-decoration: none;color:#1890FF;cursor: pointer;"
                    @click.prevent="getIndexP(item.parent_name)"
                  >编辑</a>
                  <span style="font-size:12px;color:#108EE9;"></span>
                  <span style="font-size:12px;color:#D7D7D7;">|</span>
                  <a
                    href
                    style="text-decoration: none;color:#1890FF;cursor: pointer;"
                    @click.prevent="delP(item.parent_name)"
                  >删除</a>

                  <div class="modal fade" id="exampleModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 class="modal-title">修改信息</h4>
                        </div>

                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="pwd">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
                              <input
                                type="text"
                                class="kuang"
                                id="pwd"
                                v-model="temppassword"
                                :placeholder="temppassword"
                              />
                            </div>
                          </form>
                        </div>

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-default"
                            data-dismiss="modal"
                            @click.prevent="cancel"
                          >取消</button>
                          <button type="button" class="btn btn-primary" @click.prevent="saveP">保存</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="students_table" id="students_table">
          <span class="student_title">学员信息</span>
          <div class="hr"></div>

          <div class="add-button">
            <a
              href
              class="button button-glow button-rounded button-raised button-primary add-student pull-right"
              data-toggle="modal"
              data-target="#add_studentModal"
            >
              +&nbsp;
              新建学员
            </a>
            <div class="modal fade" id="add_studentModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">新建学员</h4>
                  </div>

                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="id">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
                        <input type="text" class="kuang" id="id" v-model="tempidcard" />
                        <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ttid}} -->
                      </div>

                      <div class="form-group">
                        <label for="schoolid">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
                        <input type="text" class="kuang" id="schoolid" v-model="tempschoolid" />
                      </div>

                      <div class="form-group">
                        <label for="child-name">学生姓名:</label>
                        <input type="text" class="kuang" id="child-name" v-model="tempchild_name" />
                      </div>

                      <div class="form-group">
                        <label for="parent_name">家长姓名</label>
                        <input type="text" class="kuang" id="parent_name" v-model="tempparent_name" />
                      </div>

                      <div class="form-group">
                        <label for="phone">家长电话</label>
                        <input type="text" class="kuang" id="phone" v-model="tempphone" />
                      </div>

                      <div class="form-group">
                        <label for="course">课程名称:</label>
                        <input type="text" class="kuang" id="course" v-model="tempcourse" />
                      </div>

                      <div class="form-group">
                        <label for="study-time">上课时间:</label>
                        <input type="text" class="kuang" id="study-time" v-model="tempstudy_time" />
                      </div>
                    </form>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                      @click.prevent="cancel"
                    >取消</button>
                    <button type="button" class="btn btn-primary" @click.prevent="addStudent">保存</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table class="table table-hover container" style="width: 90%;border-radius: 6px;">
            <thead>
              <tr>
                <th>卡号</th>
                <th>学号</th>
                <th>学生姓名</th>
                <th>家长姓名</th>
                <th>家长电话</th>
                <th>课程名称</th>
                <th>上课时间</th>
                <th>打卡次数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key,index) of studentData" :key="index">
                <td>{{item.idcard}}</td>
                <td>{{item.schoolid}}</td>
                <td>{{item.child_name}}</td>
                <td>{{item.parent_name}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.course}}</td>
                <td>{{item.study_time}}</td>
                <td>{{item.count}}</td>
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#exampleModal3"
                    style="text-decoration: none;color:#1890FF;cursor: pointer;"
                    @click.prevent="getIndexS(item.id,item.child_name,item.course,item.study_time)"
                  >编辑</a>
                  <span style="font-size:12px;color:#108EE9;"></span>
                  <span style="font-size:12px;color:#D7D7D7;">|</span>
                  <a
                    href
                    style="text-decoration: none;color:#1890FF;cursor: pointer;"
                    @click.prevent="delS(item.id,item.child_name,item.course)"
                  >删除</a>

                  <div class="modal fade" id="exampleModal3">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 class="modal-title">修改信息</h4>
                        </div>

                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="study_time">上课时间:</label>
                              <input
                                type="text"
                                class="kuang"
                                id="study_time"
                                v-model="tempstudy_time"
                                :placeholder="tempstudy_time"
                              />
                            </div>
                          </form>
                        </div>

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-default"
                            data-dismiss="modal"
                            @click.prevent="cancel"
                          >取消</button>
                          <button type="button" class="btn btn-primary" @click.prevent="saveS">保存</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="teachers_table" id="teachers_table">
          <span class="teacher_title">教师信息</span>
          <div class="hr"></div>

          <div class="add-button">
            <a
              href
              class="button button-glow button-rounded button-raised button-primary add-teacher pull-right"
              data-toggle="modal"
              data-target="#add_teacherModal"
            >
              +&nbsp;
              新建教师
            </a>
            <div class="modal fade" id="add_teacherModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">新建教师</h4>
                  </div>

                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="id">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
                        <input type="text" class="kuang" id="id" v-model="tempidcard" />
                        <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ttid}} -->
                      </div>

                      <div class="form-group">
                        <label for="schoolid">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
                        <input type="text" class="kuang" id="schoolid" v-model="tempschoolid" />
                      </div>

                      <div class="form-group">
                        <label for="teacher-name">教师姓名:</label>
                        <input
                          type="text"
                          class="kuang"
                          id="teacher-name"
                          v-model="tempteacher_name"
                        />
                      </div>

                      <div class="form-group">
                        <label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
                        <input type="text" class="kuang" id="password" v-model="temppassword" />
                      </div>

                      <div class="form-group">
                        <label for="money">课&nbsp;&nbsp;时&nbsp;&nbsp;费:</label>
                        <input type="text" class="kuang" id="money" v-model="tempmoney" />
                      </div>

                      <div class="form-group">
                        <label for="course">课程名称</label>
                        <input type="text" class="kuang" id="course" v-model="tempcourse" />
                      </div>

                      <div class="form-group">
                        <label for="study-time">教学时间:</label>
                        <input type="text" class="kuang" id="study-time" v-model="tempstudy_time" />
                      </div>
                    </form>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                      @click.prevent="cancel"
                    >取消</button>
                    <button type="button" class="btn btn-primary" @click.prevent="addTeacher">保存</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table class="table table-hover container" style="width: 90%;border-radius: 6px;">
            <thead>
              <tr>
                <th>卡号</th>
                <th>工号</th>
                <th>教师姓名</th>
                <th>密码</th>
                <th>课程名称</th>
                <th>课时费</th>
                <th>打卡次数</th>
                <th>教学时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key,index) in teacherData" :key="index">
                <td>{{item.idcard}}</td>
                <td>{{item.schoolid}}</td>
                <td>{{item.teacher_name}}</td>
                <td>{{item.password}}</td>
                <td>{{item.course}}</td>
                <td>{{item.money}}</td>
                <td>{{item.count}}</td>
                <td>{{item.study_time}}</td>
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#exampleModal2"
                    style="text-decoration: none;color:#1890FF;cursor: pointer;"
                    @click.prevent="getIndexT(item.idcard)"
                  >编辑</a>
                  <span style="font-size:12px;color:#108EE9;"></span>
                  <span style="font-size:12px;color:#D7D7D7;">|</span>
                  <a
                    href
                    style="text-decoration: none;color:#1890FF;cursor: pointer;"
                    @click.prevent="delT(item.idcard)"
                  >删除</a>

                  <div class="modal fade" id="exampleModal2">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 class="modal-title">修改信息</h4>
                        </div>

                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
                              <input
                                type="text"
                                class="kuang"
                                id="password"
                                v-model="temppassword"
                                :placeholder="temppassword"
                              />
                            </div>

                            <div class="form-group">
                              <label for="money">课&nbsp;&nbsp;时&nbsp;&nbsp;费:</label>
                              <input
                                type="text"
                                class="kuang"
                                id="money"
                                v-model="tempmoney"
                                :placeholder="tempmoney"
                              />
                            </div>

                            <div class="form-group">
                              <label for="study-time">教学时间:</label>
                              <input
                                type="text"
                                class="kuang"
                                id="study-time"
                                v-model="tempstudy_time"
                                :placeholder="tempstudy_time"
                              />
                            </div>
                          </form>
                        </div>

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-default"
                            data-dismiss="modal"
                            @click.prevent="cancel"
                          >取消</button>
                          <button type="button" class="btn btn-primary" @click.prevent="saveT">保存</button>
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
      ttidcard: "23333",
      tempid: "",
      tempidcard: "",
      tempmoney: "",
      temppassword: "",
      tempchild_name: "",
      tempteacher_name: "",
      tempparent_name: "",
      tempcount: "",
      tempstudy_time: "",
      tempschoolid: "",
      tempcourse: "",
      tempphone: "",
      //tempparentData: [],
      // tempteacherData: [],
      parentData: [],
      teacherData: [],
      studentData: [],
      flag: true,
      shensuo1: true,
      shensuo2: true
    };
  },
  created() {
    axios.get(`http://116.62.171.43:3000/getdata_parent`).then(res => {
      this.parentData = res.data.data;
    });
    axios.get(`http://116.62.171.43:3000/getdata_teacher`).then(res => {
      this.teacherData = res.data.data;
    });
    axios.get(`http://116.62.171.43:3000/getdata_student`).then(res => {
      this.studentData = res.data.data;
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

    getIndexT(idcard) {
      this.tempidcard = idcard;
      for (var i = 0; i < this.teacherData.length; i++) {
        if (this.teacherData[i].idcard == idcard) {
          this.temppassword = this.teacherData[i].password;
          this.tempmoney = this.teacherData[i].money;
          this.tempstudy_time = this.teacherData[i].study_time;
        }
      }
    },

    saveT() {
      for (var i = 0; i < this.teacherData.length; i++) {
        if (this.tempidcard == this.teacherData[i].idcard) {
          var tempteacherData = {
            password: this.temppassword,
            money: this.tempmoney,
            study_time: this.tempstudy_time,
            idcard: this.tempidcard
          };
          this.getAxios(
            `http://116.62.171.43:3000/updatedata_teacher`,
            tempteacherData
          ).then(res => {
            this.teacherData[
              this.teacherData.findIndex(
                e => e.idcard == tempteacherData.idcard
              )
            ] = res.data.data;
            console.log(res.data.data);
          });
        }
      }
      this.cancel();
    },

    getIndexP(index) {
      this.tempparent_name = index;
    },

    saveP() {
      var tempparentData = {
        password: this.temppassword,
        parent_name: this.tempparent_name
      };
      this.getAxios(
        `http://116.62.171.43:3000/updatedata_parent`,
        tempparentData
      ).then(res => {
        this.parentData[
          this.parentData.findIndex(
            e => e.parent_name == tempparentData.parent_name
          )
        ] = res.data.data;
        console.log(res.data.data);
      });
      this.cancel();
    },

    getIndexS(id, child_name, course, study_time) {
      this.tempid = id;
      this.tempchild_name = child_name;
      this.tempcourse = course;
      this.tempstudy_time = study_time;
    },

    saveS() {
      var tempstudentData = {
        id: this.tempid,
        study_time: this.tempstudy_time
      };
      this.getAxios(
        `http://116.62.171.43:3000/updatedata_studentstudytime`,
        tempstudentData
      ).then(res => {
        this.studentData[
          this.studentData.findIndex(
            e =>
              e.child_name == this.tempchild_name && e.course == this.tempcourse
          )
        ] = res.data.data;
        console.log(res.data.data);
      });
      this.cancel();
    },

    cancel() {
      this.tempid = this.tempidcard = this.tempmoney = this.temppassword = this.tempchild_name = this.tempteacher_name = this.tempparent_name = this.tempcount = this.tempstudy_time = this.tempschoolid = this.tempcourse = this.tempphone =
        "";
    },

    delP(parent_name) {
      this.getAxios(`http://116.62.171.43:3000/deletedata_parent`, {
        parent_name: parent_name
      }).then(res => {
        this.parentData.splice(
          this.parentData.findIndex(e => e.parent_name == parent_name),
          1
        );
      });
      console.log(this.parentData);

      this.getAxios(`http://116.62.171.43:3000/deletedata_parent_student`, {
        parent_name: parent_name
      }).then(res => {
        for (var i = this.studentData.length - 1; i >= 0; i--) {
          if (this.studentData[i].parent_name == parent_name) {
            this.studentData.splice(i, 1);
          }
        }
      });
    },

    delT(idcard) {
      this.getAxios(`http://116.62.171.43:3000/deletedata_teacher`, {
        idcard: idcard
      }).then(res => {
        this.teacherData.splice(
          this.teacherData.findIndex(e => e.idcard == idcard),
          1
        );
      });
      console.log(this.teacherData);
    },

    delS(id, child_name, course) {
      console.log(id);
      this.getAxios(`http://116.62.171.43:3000/deletedata_student`, {
        id: id
      }).then(res => {
        console.log(res);
        this.studentData.splice(
          this.studentData.findIndex(
            e => e.child_name == child_name && e.course == course
          ),
          1
        );
      });
    },

    addParent() {
      var tempparentData = {
        parent_name: this.tempparent_name,
        password: this.temppassword
      };

      this.getAxios(
        `http://116.62.171.43:3000/insertdata_parent`,
        tempparentData
      ).then(res => {
        this.parentData.push(res.data.data);
      });
      this.cancel();
    },

    addTeacher() {
      var tempteacherData = {
        idcard: this.tempidcard,
        schoolid: this.tempschoolid,
        teacher_name: this.tempteacher_name,
        password: this.temppassword,
        money: this.tempmoney,
        course: this.tempcourse,
        study_time: this.tempstudy_time
      };
      this.getAxios(
        `http://116.62.171.43:3000/insertdata_teacher`,
        tempteacherData
      ).then(res => {
        this.teacherData.push(res.data.data);
      });

      this.cancel();
    },

    addStudent() {
      var tempstudentData = {
        idcard: this.tempidcard,
        schoolid: this.tempschoolid,
        child_name: this.tempchild_name,
        parent_name: this.tempparent_name,
        phone: this.tempphone,
        course: this.tempcourse,
        study_time: this.tempstudy_time
      };
      this.getAxios(
        `http://116.62.171.43:3000/insertdata_student`,
        tempstudentData
      ).then(res => {
        axios.get(`http://116.62.171.43:3000/getdata_student`).then(res => {
          this.studentData = res.data.data;
        });
      });

      this.cancel();
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

.left .showUser a,
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

.left .showUser a:hover,
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

.left .showUser .show1 {
  height: 40px;
  line-height: 40px;
  text-indent: 16px;
  font-size: 16px;
  padding-top: 3px;
  font-weight: 600;
  letter-spacing: 3px;
}

.left .showUser .show1 .icon_up,
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

.right .parents_table {
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  padding-bottom: 40px;
}

.right .parents_table .hr,
.right .students_table .hr,
.right .teachers_table .hr,
.right .light .hr,
.right .fan .hr,
.right .Twet .hr {
  height: 2px;
  width: 90%;
  background-color: #c0bcbc;
  margin: 30px auto;
}

.right .parents_table table,
.right .students_table table,
.right .teachers_table table {
  margin-bottom: 30px;
  border-radius: 4px;
}

/*表格表头样式*/
.right .parents_table table thead,
.right .students_table table thead,
.right .teachers_table table thead {
  background-color: rgba(240, 242, 245, 1);
}

/*开头大文字样式*/
.right .parents_table .parent_title,
.right .students_table .student_title,
.right .teachers_table .teacher_title,
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

/*表格标题样式*/
.right .parents_table table tbody td .modal .modal-body .kuang,
.right .students_table table tbody td .modal .modal-body .kuang,
.right .teachers_table table tbody td .modal .modal-body .kuang,
.right .parents_table .add-button .modal .modal-body .kuang,
.right .teachers_table .add-button .modal .modal-body .kuang,
.right .students_table .add-button .modal .modal-body .kuang {
  width: 70%;
  height: 32px;
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  padding-left: 8px;
}

/*教师样式 + 设备样式*/
.right .students_table,
.right .teachers_table,
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

/*新建按钮样式*/
.right .parents_table .add-button,
.right .students_table .add-button,
.right .teachers_table .add-button {
  width: 90%;
  height: 32px;
  margin: 0 auto;
  margin-top: -15px;
  margin-bottom: 15px;
}

.right .parents_table .add-button .add-parent,
.right .students_table .add-button .add-student,
.right .teachers_table .add-button .add-teacher {
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
</style>