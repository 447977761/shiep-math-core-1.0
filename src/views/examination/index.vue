<template>
  <div>
    <div v-html='tinymceHtml' style="margin-left: 20px;margin-top: 10px"></div>
    <el-button type="primary" style="margin-left: 20px" @click="getWord">生成word</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      id:'',
      getSubjectUrl:'/test/testWordProcess/getSubject',
      getWordUrl: '/test/testWordProcess/getWord',
      tableData:[],
      postImgBase64:[],
      tinymceHtml:'',
    }
  },
  mounted () {

  },

  created() {
    this.getSubject();
  },
  methods: {
    getSubject(){
      let self = this;
      self.$axios.post(self.getSubjectUrl).then((res) => {
        if(res.data.success){
          self.tinymceHtml = res.data.result;
          console.log(self.tableData)
        }
      });
    },
    getWord(){
      let self = this;
      this.postImgBase64 = self.processPic();
      var posDate = {
        content:self.tinymceHtml,
        imgBase64:this.postImgBase64
      };
      self.$axios.post(self.getWordUrl,posDate).then((res) => {
        if(res.data.success){
          self.$message.success(res.data.message);
        }else{
          self.$message.error(res.data.message);
        }
      });
    },
    processPic(){
      var imgBase64 = this.getStr(this.tinymceHtml);
      console.log(imgBase64);
      for(var i=0;i<imgBase64.length;i++){
        if(imgBase64[i].indexOf("data:image/png;base64,") !== -1){
            this.postImgBase64.push(imgBase64[i]);
        }
      }
      return this.postImgBase64;
    },
    getStr(str) {
      var result = str.match(/\".+?\"/g);
      return result.map(function(element){
        return element.replace(/\"/g, '');
      });
    },
  }
}
</script>

<style>
  .table{
    margin-left: 10px;
    margin-top: 10px;
  }

  .item {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 40px;
  }

  .select-bt{
    height: 33px;
    margin-left:3px;
  }

</style>
