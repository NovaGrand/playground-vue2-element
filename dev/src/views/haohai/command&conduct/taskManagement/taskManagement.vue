<template>
    <div class="">
        <div class="search">
            <div class="search-item" >
                <div class="search-content">任务名称</div>
                <el-input v-model="input" placeholder="请输入"></el-input>
            </div>
            <div class="search-item" >
                <div class="search-content">事件标题</div>
                <el-input v-model="input" placeholder="请输入"></el-input>
            </div>
            <div class="search-time">
                <span class="search-content">事发时间</span>
                <el-date-picker
                    v-model="value2"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
        </div>
        <div class="table">
            <div class="opertion">
                <el-button type="primary">新增</el-button>
                <el-button>模板选择</el-button>
                <el-button>导出</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="任务名称"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="事件标题">
                </el-table-column>
                <el-table-column
                    prop="dispatchState"
                    width="80"
                    label="调度状态">
                </el-table-column>
                <el-table-column
                    prop="auditingState"
                    width="80"
                    label="审核状态">
                </el-table-column>
                <el-table-column
                    prop="auditingPerson"
                    width="80"
                    label="审核人">
                </el-table-column>
                <el-table-column
                    prop="dispatchPerson"
                    width="80"
                    label="调度人">
                </el-table-column>
                <el-table-column
                    prop="dispatchTime"
                    label="调度时间">
                </el-table-column>
                <el-table-column
                    width="160"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">审批</el-button>
                        <el-button type="text" size="small">删除</el-button>
                        <el-button type="text" size="small">查看流程</el-button>
                        <el-button type="text" size="small">审批历史</el-button>
                        <el-button type="text" size="small">调度进展</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'taskManagement',
    data(){
        return{
            tableData:[
                {
                    name:'根据其泄漏和燃烧特点,迅速有效地排除引爆点。',
                    createTime:'2020-09-17 18:56:34',
                    title:'李村公园发生水灾',
                    dispatchState:'已调度',
                    auditingState:'已通过',
                    auditingPerson: '李四',
                    dispatchPerson: '王武',
                    dispatchTime: '2020-09-17 18:56:34',
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    flex-wrap:wrap;
    .search-item {
        height: 50px;
        display: flex;
        align-items: center;
        .search-content {
            font-size: 18px;
            width:80px;
            margin-left: 15px;
            flex:none;
            color: #28272a;
        }
        .el-input--medium{
            width: 280px !important;
        }
    }
    .search-items{
        display: flex;
        height: 50px;
        align-items: center;
        .search-content{
            font-size: 18px;
            margin-left: 15px;
        }
        .el-select {
            margin-left: 10px !important;
        }
    }
    .search-time{
        display: flex;
        height: 50px;
        align-items: center;
        .search-content{
            font-size: 18px;
            margin-left: 15px;
        }
        .el-range-editor--medium.el-input__inner{
            margin-left: 10px;
        }
    }
    .el-button--primary {
        height: 45px !important;
        margin-left: 30px !important;
    }
    .el-button+.el-button{
        height: 45px;
    }
}
.table{
    margin-top: 15px;
    .opertion{
        display: flex;
        justify-content: flex-end;
    }
}
</style>
