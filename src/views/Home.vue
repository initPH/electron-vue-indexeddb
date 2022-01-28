<template>
  <el-button size="mini" @click="handleAddData">添加</el-button>
  <el-table :data="tableData" border>
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="性别" prop="sex"></el-table-column>
    <el-table-column label="手机号" prop="phone"></el-table-column>
  </el-table>
  <el-dialog center title="新增数据" v-model="addFormVisible">
    <el-form :model="form">
      <el-form-item label="姓名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleAddConfirm">添加</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import indexedDB from '@/modules/indexeddb';

export default defineComponent({
  name: 'Home',
  setup() {
    let form = reactive({
      name: '',
      sex: 1,
      phone: '',
    });
    let tableData = ref([]);
    let addFormVisible = ref(false);

    getTableData();

    function getTableData() {
      tableData.value = [];
    }

    function handleAddData() {
      addFormVisible.value = true;
    }

    function handleAddConfirm(storename = 'userinfo') {
      indexedDB.openDB((db: IDBDatabase) => {
        console.log(form);
        
        indexedDB.addData(db, storename, {name: '112123'});
      });
    }
    return {
      form,
      tableData,
      addFormVisible,
      handleAddData,
      handleAddConfirm,
    };
  },
});
</script>
