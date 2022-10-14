<template>
    <div class="oneKeyOperation">
        <header class="search">
            <div class="column">
                <div class="search-field">
                    <span class="search-field-name">事件标题</span>
                    <el-input
                        class="search-field-value"
                        v-model="search.eventTitle"
                        placeholder="请输入"
                        size="medium"></el-input>
                </div>
                <div class="search-field">
                    <span class="search-field-name">事件级别</span>
                    <el-select class="search-field-value" multiple clearable placeholder="请选择" size="medium"
                               :value="search.eventLevel"
                               @change="checkSelectAll(search.eventLevel, eventLevels, `['search']['eventLevel']`)"
                        >
                        <el-option
                            v-for="item in eventLevels"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="column">
                <div class="search-field">
                    <span class="search-field-name">事发地区</span>
                    <el-select class="search-field-value" multiple clearable placeholder="请选择" size="medium"
                        v-model="search.eventArea"
                    >
                        <el-option v-for="item in eventAreas" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="search-field">
                    <span class="search-field-name">事件类型</span>
                    <el-select class="search-field-value" multiple clearable size="medium" placeholder="请选择"
                        v-model="search.eventType"
                       >
                        <el-option v-for="item in eventTypes" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="column">
                <div class="search-field">
                    <span class="search-field-name">事发时间</span>
                    <el-date-picker
                        class="search-field-value date-picker"
                        size="medium"
                        v-model="search.dateRange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="search-field">
                    <span class="search-field-name">事件状态</span>
                    <el-select class="search-field-value short" multiple clearable size="medium" placeholder="请选择"
                               v-model="search.eventState"
                    >
                        <el-option
                            v-for="item in eventStates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="column">
                <el-button type="primary">查询</el-button>
                <el-button @click="resetSearch(search)">重置</el-button>
            </div>
        </header>
        <div class="tableContainer">
            <div class="title">事件调度列表</div>
            <!--  事件调度列表-BEGIN-  -->
            <el-table :data="tableData" border>
                <el-table-column v-for="column in columns" align="center"
                    :prop="column.prop"
                    :label="column.label"
                    :width="column.width"
                    :min-width="column.minWidth"
                    :show-overflow-tooltip="!column.ellips">
                    <template slot-scope="scope">
                        <component
                            v-if="column.component"
                            :is="column.component"
                            :row="scope.row"
                            :prop="column.prop" />
                        <span v-else>{{ scope.row[column.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--  事件调度列表-END-  -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes, ->, prev, pager, next, jumper"
                :current-page="currentPage"
                :page-sizes="[8, 16, 32, 64]"
                :total="38">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import search from "../mixins/search"
import page from "../mixins/page"
import href from './components/href'
import dateTime from './components/dateTime'
import eventLevel from './components/eventLevel'
import editRow from './components/editRow'
import mock from '../mock/oneKeyOperation'
export default {
    mixins:[ search, page ],
    mounted(){

    },
    data() {
      return {
        columns:[
          { label:'事件标题', prop:'title', width:150 },
          { label:'事件级别', prop:'level', width:110, component: eventLevel },
          { label:'事发地区', prop:'address', width:80 },
          { label:'事件类型', prop:'type', width:100  },
          { label:'事件状态', prop:'state', width:80 },
          { label:'事发时间', prop:'eventTime', width:95, component: dateTime },
          { label:'报送单位', prop:'until', minWidth:80  },
          { label:'报送时间', prop:'upTime', width: 95, component: dateTime },
          { label:'上报人', prop:'person', width: 70  },
          { label:'上报时间', prop:'time', width: 95, component: dateTime },
          { label:'预案名称', prop:'name', minWidth:80, component: href, ellips: true},
          { label:'处理人', prop:'handlePerson', width: 70 },
          { label:'处理单位', prop:'handleUntil', minWidth:110 },
          { label:'操 作', minWidth:110, component: editRow },
        ],
        search:{
              eventTitle:'',
              eventLevel:'',
              eventArea:'',
              eventType:'',
              dateRange:'',
              eventState:''
          },
          eventLevels: mock.options,
          eventAreas: mock.options,
          eventTypes: mock.options,
          eventStates: mock.options,
          tableData: mock.tableData,
      }
    },
    watch:{
        // 'search.eventLevel': function(val){
        //     console.log(val)
        // }
    },
    methods:{
        checkSelectAll(currentValue, items, model){
            // if(currentValue.includes('全选')){
            //     console.log(this[model])
            //     this[model] = []
            //     items.forEach(item => {
            //         this[model].push(item)
            //     })
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'scss';
</style>
