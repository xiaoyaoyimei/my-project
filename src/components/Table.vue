<template>
    <div class="fixed-table-container">
        <div class="fixed-table-body">
            <table class="table table-striped table-hover table-bordered dataTable no-footer">
                <thead>
                    <tr role="row">
                        <th class="bs-checkbox" v-if="!!config.checkbox" style="text-align: center; vertical-align: middle; width: 36px;">
                            <div class="th-inner">
                                <input type="checkbox" v-check-all="[checklist.length, rows.length]" v-model="check_all" />
                            </div>
                        </th> 
                        <th style="text-align: center;" v-for="col in columns" v-show="col.visible">
                            <column :column="col" :sort-name="sort_name" :is-desc="is_desc" @sort-change="sortChange"></column>
                            <div class="fht-cell">
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-show="!loading">
                    <tr v-for="(row, index) in rows" :class="rowClass(row, index)" @click="row_click(row, index)">
                        <td style="text-align: center;" class="bs-checkbox" v-if="!!config.checkbox">
                            <input type="checkbox" v-model="checklist" :value="row" class="checkbox" />
                        </td>
                        <cell v-for="col in columns" v-show="col.visible"
                              :column="col" :row="row" :index="index">
                        </cell>
                    </tr>
                    <tr class="no-records-found" v-if="rows.length === 0">
                        <td colspan="999" class="text-center">没有找到匹配的记录</td>
                    </tr>
                </tbody>
                <tbody v-if="loading">
                    <tr>
                        <td colspan="999" class="text-center">正在加载数据 ... </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pager :page-no="pager.page_no"
               :page-size="pager.page_size"
               :total-result="total"
               @page-change="pageChange">
        </pager>
    </div>
</template>

<script>
    export default {
        props: {
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            rows: {
                type: Array,
                default: function () {
                    return []
                }
            },
            config: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            loading: Boolean,
            total: Number,
            pager: Object
        },
        data() {
            return {
                check_all: false,
                checklist: [],
                page_no: 1,
                page_size: 10,
                sort_name: null,
                is_desc: false,
            }
        },
        created() {
            if (this.pager) {
                this.is_desc = this.pager.is_desc
                this.sort_name = this.pager.sort_name
            }
        },
        methods: {
            /*******************************************************/
            sortChange(field, is_desc) {
                if (this.loading) return
                this.sort_name = field
                this.is_desc = is_desc
                this.$emit('sort-change', field, is_desc)
            },
            pageChange(pageNo, pageSize) {
                if (this.loading) return
                this.$emit('page-change', pageNo, pageSize)
            },
            /*******************************************************/
            row_click(row, index) {
                if (this.config.checkbox) {
                    let i = this.checklist.indexOf(row)

                    if (i >= 0) {
                        this.checklist.splice(i, 1)
                    }
                    else {
                        this.checklist.push(row)
                    }
                }
                this.$emit('row-click', row, index)
            },
            rowClass(item) {
                return item.$row_class || ''
            }
        },
        directives: {
            checkAll: require('../directives/checkAll.js')
        },
        components: {
            Cell: require('./Cell.js'),
            Column: require('./Column.vue'),
            Pager: require('./Pager.vue'),
        },
        watch: {
            check_all(val) {
                this.checklist = []

                if (val) {
                    this.rows.forEach(function (t) {
                        this.checklist.push(t)
                    }.bind(this))
                }
            },
            rows() {
                this.checklist = []
                this.check_all = false
            },
            checklist() {
                this.$emit('selection-change', this.checklist)
            }
        },
        beforeDestroy: function () {

        }
    }
</script>