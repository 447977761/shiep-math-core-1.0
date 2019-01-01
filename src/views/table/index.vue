<template>
  <div class="table">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="题目">
        <el-input v-model="formInline.mathSubject" placeholder="请输入题目" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 1630px" v-loading='loadingData' element-loading-text='加载中...'>
      <el-table-column prop="mathSubjectFormat"  label="题目简介" show-overflow-tooltip="true"/>
      <el-table-column prop="mathType"  label="题目类型" width="150"/>
      <el-table-column prop="mathOrigin" label="题目出处" width="120"/>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-badge :value="scope.row.selectValue" :max="1" class="item">
            <el-button class="select-bt" size="small"
                       @click="handleSelect(scope.$index, scope.row)">选题</el-button>
          </el-badge>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background
                     :current-page="filter.page"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="filter.per_page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="pageSizeChange"
                     @current-change="pageCurrentChange">
      </el-pagination>
    </div>



    <!-- 查看详细-->
    <el-dialog title="编辑题目" :visible.sync="dialogUpdateVisible"  :close-on-click-modal="false" :close-on-press-escape="false" >
      <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMath">确 定</el-button>
      </div>
    </el-dialog>

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
  data() {
    return {
      list: null,
      listLoading: true,
      getResultUrl: '/test/testWordProcess/getResult',
      saveSubject: '/test/testWordProcess/saveSubject',
      tinymceHtml:'',
      selectValue: '',
      tableData:[],
      selectSubject:[],
      loadingData: false,
      dialogUpdateVisible:false,
      formInline: {
        mathSubject: ''
      },
      filter: {
        per_page: 10, // 页大小
        page: 1 // 当前页
      },
      total: 0,
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

    }
  },
  mounted () {
    tinymce.init({});
  },
  components: {Editor},
  created() {
    this.fetchData();
  },
  methods: {
    handleSelect(index,row){
      if(row.selectValue === ''){
        this.selectSubject.push(row.id);
        row.selectValue = 1;
      }else{
        for(var i =0 ;i<this.selectSubject.length;i++){
          if(this.selectSubject[i] === row.id){
            this.selectSubject.splice(i,1);
          }
        }
        row.selectValue = '';
      }


      let self = this;
      var postDate = {
        id:this.selectSubject
      };
      self.$axios.post(self.saveSubject,postDate).then((res) => {});

      console.log(this.selectSubject);
    },
    fetchData() {
      let self = this;
      var postDate = {
        mathSubject: self.formInline.mathSubject,
        pageNum: self.filter.page,
        pageSize: self.filter.per_page
      };
      self.$axios.post(self.getResultUrl,postDate).then((res) => {
        if (res.data.success) {
          self.tableData = res.data.result;
          console.log(self.tableData)
        } else {
          if (res.data.message || res.data.msg) {
            self.tableData = [];
            self.$message.error(res.data.message || res.data.msg);
          }
        }
      });
    },
    handleEdit(index,row){
      let self = this;
      this.tinymceHtml = row.mathSubject;
      self.dialogUpdateVisible=true;
    },
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.filter.per_page = val;
      this.getData();
    },
    pageCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.filter.page = val;
      this.getData();
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
    margin-right: 40px;
    margin-bottom: 10px;
  }

  .select-bt{
    height: 33px;
    margin-left:3px;
  }
</style>
