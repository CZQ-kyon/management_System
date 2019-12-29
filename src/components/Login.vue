<template>
  <div class="login_bg">
    <form name="login" action method="POST" class="login_form">
      <h1>培训机构小管家</h1>
      <input type="text" class="u_c" name="username" placeholder="Username" v-model="username" />
      <br />
      <br />
      <input
        type="password"
        class="p_c"
        name="pw"
        id="pw"
        placeholder="Password"
        v-model="password"
      />
      <br />

      <div class="radio_box">
        <input type="radio" name="user" id="parents" value="parent" v-model="user" />
        <label for="parents">家长</label>

        <input type="radio" name="user" id="teacher" value="teacher" v-model="user" />
        <label for="teacher">教师</label>

        <input type="radio" name="user" id="administrator" value="administrator" v-model="user" />
        <label for="administrator">管理员</label>
      </div>

      <br />

      <a
        href
        class="button button-block button-rounded button-royal button-large"
        @click.prevent="loginBtn"
      >Login</a>
    </form>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      user: "",
      parentData: [],
      teacherData: [],
      administratorData: []
    };
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

    loginBtn() {
      if (this.user == "parent") {
        this.getAxios(`http://116.62.171.43:3000/getdata_parent`).then(res => {
          this.parentData = res.data.data;
          console.log(this.parentData);
          for (var i = 0; i < this.parentData.length; i++) {
            if (
              this.username == this.parentData[i].parent_name &&
              this.password == this.parentData[i].password
            ) {
              //匹配成功时操作
              this.$router.push({
                name: "parentWeb",
                params: { parent_name: this.parentData[i].parent_name }
              });
              console.log("Parent Success");
            }
          }
        });
      }

      if (this.user == "teacher") {
        this.getAxios(`http://116.62.171.43:3000/getdata_teacher`).then(res => {
          this.teacherData = res.data.data;
          console.log(this.teacherData);
          for (var i = 0; i < this.teacherData.length; i++) {
            if (
              this.username == this.teacherData[i].schoolid &&
              this.password == this.teacherData[i].password
            ) {
              //匹配成功时操作
              this.$router.push({
                name: "teacherWeb",
                params: { schoolid: this.teacherData[i].schoolid }
              });
              console.log("Teacher Success");
            }
          }
        });
      }

      if (this.user == "administrator") {
        this.getAxios(`http://116.62.171.43:3000/getdata_administrator`).then(
          res => {
            this.administratorData = res.data.data;
            console.log(this.administratorData);
            for (var i = 0; i < this.administratorData.length; i++) {
              if (
                this.username == this.administratorData[i].username &&
                this.password == this.administratorData[i].password
              ) {
                //匹配成功时操作
                this.$router.push("/administratorWeb");
                console.log("Administrator Success");
              }
            }
          }
        );
      }
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/buttons.css";
/* * {
    margin: 0;
    padding: 0;
    list-style: none;
} */

.login_bg {
  background: url(../../static/images/img4.jpg) no-repeat;
  height: 100%;
  overflow: hidden;
}

.login_form {
  margin: 100px auto;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 30px 30px;
  width: 500px;
  height: 380px;
  border-radius: 6px;
}

.login_form h1 {
  text-align: center;
}

.login_form .u_c,
.p_c {
  display: block;
  width: 100%;
  height: 50px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: rgba(255, 255, 255, 0.85);
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.login_form .radio_box {
  width: 230px;
  height: 27px;
  margin: 0 auto;
  font-size: 17px;
}

.login_form .radio_box > input {
  display: none;
}

.login_form .radio_box > label {
  position: relative;
  margin: 0 5px;
}

.login_form .radio_box > label::before {
  display: inline-block;
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgb(219, 219, 219);
}

.login_form .radio_box > input:checked + label::before {
  background-color: #3c86f1;
}
</style>
