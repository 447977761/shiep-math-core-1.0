<template>
  <div class="table">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="题目">
        <el-input v-model="formInline.mathSubject" placeholder="请输入题目" style="width: 300px"></el-input>
      </el-form-item>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">入库题目</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" v-loading='loadingData' element-loading-text='加载中...'>
      <el-table-column prop="mathSubjectFormat"  label="题目简介" show-overflow-tooltip="true"/>
      <el-table-column prop="mathType"  label="题目类型" width="150"/>
      <el-table-column prop="subjectOrigin" label="题目出处" width="120"/>
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
  </div>
</template>

<script>

export default {
  data() {
    return {

      listMathSubjectUrl:'/mathSubject/subjects/listMathSubject',

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
      total:0,
      filter: {
        per_page: 10, // 页大小
        page: 1 // 当前页
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
      loadingData: false,
    }
  },
  mounted () {

  },

  created() {
    this.listMathSubject();
  },
  methods: {
    listMathSubject(){
      let self = this;
      var postDate = {
        mathSubject: self.formInline.mathSubject,
        mathType: self.formInline.mathType,
        subjectTag: self.formInline.subjectTag,
        subjectOrigin: self.formInline.subjectOrigin,
        subjectProvince: self.formInline.subjectProvince,
        subjectCity: self.formInline.subjectCity,
        subjectArea: self.formInline.subjectArea,
        subjectYear: self.formInline.subjectYear,
        pageNum: self.filter.page,
        pageSize: self.filter.per_page
      };
      self.loadingData = true;
      self.$axios.post(self.listMathSubjectUrl,postDate).then((res) => {
        self.loadingData = false;
        if (res.data.success) {
          self.tableData = res.data.result.list;
          self.total = res.data.result.total;
        } else {
          if (res.data.message || res.data.msg) {
            self.tableData = [];
            self.$message.error(res.data.message || res.data.msg);
          }
        }
      });
    },
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.filter.per_page = val;
      this.listMathSubject()
    },
    pageCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.filter.page = val;
      this.listMathSubject()
    },
  }
}
</script>

<style>
  .table{
    margin-left: 10px;
    margin-top: 10px;
    width: 100%;
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
