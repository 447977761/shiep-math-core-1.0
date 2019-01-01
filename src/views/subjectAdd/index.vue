<template>
  <div class='tinymce'>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="题目类型">
        <el-select v-model="formInline.subjectType" filterable placeholder="请选择题目类型" clearable>
          <el-option
            v-for="item in subjectType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="题目分类">
        <el-select v-model="formInline.subjectTag" filterable placeholder="请选择题目分类">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="题目出处">
        <el-select v-model="formInline.subjectOrigin" filterable placeholder="请选择题目出处">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="题目出处（省）">
        <el-select v-model="formInline.subjectProvince" filterable placeholder="请选择省">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="题目出处（市）">
        <el-select v-model="formInline.subjectCity" filterable placeholder="请选择市">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="题目出处（区）">
        <el-select v-model="formInline.subjectArea" filterable placeholder="请选择区">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-form-item label="题目出处时间">
        <el-date-picker
          v-model="formInline.subjectYear"
          type="year"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
    <!--<div v-html='tinymceHtml'></div>-->
    <el-button type="primary" @click="submitMath" style="margin-top: 10px;margin-left: 10px">提交</el-button>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/modern/theme'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  export default {
    name: 'tinymce',
    data () {
      return {
        tinymceHtml: '请输入内容',
        imgUrlProcess: '/test/testWordProcess/test',
        submitMathUrl: '/test/testWordProcess/saveMath',
        imgBase64Arr: '',
        postImgUrl: [],
        proimgUrl: '',
        resNewValue: '',
        init: {
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        },
        formInline: {
          mathSubject: '',
          subjectType:'',
          subjectTag:'',
          subjectOrigin: '',
          subjectProvince:'',
          subjectCity:'',
          subjectArea:'',
          subjectYear:'',
        },
        subjectType:[
          {
            label:'选择题',
            value:'1'
          },
          {
            label:'填空题',
            value:'2'
          },
          {
            label:'计算题',
            value:'3'
          }
        ],
      }
    },
    mounted () {
      tinymce.init({});

    },
    watch:{
      'tinymceHtml': function(newVal){
        this.resNewValue = newVal;
        console.log(newVal.length);
        var index = newVal.indexOf('<p class="MsoNormal">');
        var res = newVal.substring(index, newVal.length);
        var positions = new Array();
        var pos = res.indexOf('src=');
        while (pos > -1) {
          positions.push(pos);
          pos = res.indexOf('src=', pos + 1);
        }

        var resurl = this.getStr(res);

        for(var a=0;a<resurl.length;a++){
          if(resurl[a].indexOf("file:///C:") !== -1) {
            this.postImgUrl.push(resurl[a]);
          }
        }
        console.log("-------------------")
        console.log(this.postImgUrl);

        if(null != this.postImgUrl){
          let self = this;
          var newCache = newVal;
          for(var i=0;i<this.postImgUrl.length;i++){
            self.proimgUrl = this.postImgUrl[i];
            //后台交互
            var postDate = {
              imgUrl: self.proimgUrl
            };
            self.$axios.post(self.imgUrlProcess, postDate).then((res) => {
              if (res.data.success) {
                this.imgBase64Arr = res.data.result.process;
                console.log(this.imgBase64Arr)
                this.proimgUrl = res.data.result.origin;
                newCache = newCache.replace(this.proimgUrl,this.imgBase64Arr);
                this.resNewValue = newCache;
              } else {
                if (res.data.message || res.data.msg) {
                  self.$message.error(res.data.message || res.data.msg);
                }
              }
            });
          }
        }

        setTimeout(() => {
          this.tinymceHtml = this.resNewValue;
        }, 400);

        // console.log(this.imgBase64Arr);
        // newVal = newVal.replace(resurl[a],"111")

      }

    },
    components: {Editor},
    methods: {
      getStr(str) {
        var result = str.match(/\".+?\"/g);
        return result.map(function(element){
          return element.replace(/\"/g, '');
        });
      },
      submitMath(){
        alert(this.tinymceHtml);
        let self = this;
        var postDate = {
          mathSubject:this.tinymceHtml
        };
        self.$axios.post(self.submitMathUrl, postDate).then((res) => {
          if (res.data.success) {
            self.$message.success(res.data.message);
          } else {
            if (res.data.message || res.data.msg) {
              self.$message.error(res.data.message || res.data.msg);
            }
          }
        });
      }

    }


  }
</script>
<style>

.tinymce{
  margin-top: 30px;
}
</style>
