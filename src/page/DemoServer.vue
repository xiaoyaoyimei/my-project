﻿<template>
    <div class="bootstrap-table">
        <div class="fixed-table-toolbar">
            <div class="bars pull-left">
                <div>
                    <button class="btn btn-danger" @click="remove_all">
                        <i class="glyphicon glyphicon-remove"></i> Delete
                    </button>
                </div>
            </div>
            <div class="columns columns-right btn-group pull-right">
                <button class="btn btn-default" type="button" name="refresh" title="Refresh" @click="refresh">
                    <i class="glyphicon glyphicon-refresh icon-refresh"></i>
                </button>
                <show-columns :columns="columns"></show-columns>
            </div>
            <div class="pull-right search">
                <input class="form-control" type="text" placeholder="Search" v-model="q">
            </div>
        </div>
        <div class="fixed-table-container">
            <div class="fixed-table-body">
                <table-server :columns="columns"
                              :rows="items"
                              :total="pager.total"
                              :loading="loading"
                              :init-pager="pager"
                              :config="config"
                              @refresh="child_refresh"
                              @selection-change="selection_change">
                </table-server>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import ajax from '../service/base.js'
    import getcol from  '../components/columns.js'
    import col from '../utils/filterBy.js'
    import ShowColumns from '../components/ShowColumns.vue'
    import  TableServer from '../components/TableServer.vue'
    export default {
        data() {
            return {
                q: null,
                columns: [],
                rows: [],
                checklist: [],
                loading: false,
                config: {
                    checkbox: true
                },
                pager: {
                    page_no: 1,
                    page_size: 10,
                    sort_name: 'id',
                    is_desc: false,
                    total: 0
                }
            }
        },
        created() {
            this.btn_hub = new Vue()
            
            this.columns = getcol(this.btn_hub)

            this.btn_hub.$on('edit', this.edit)
            this.btn_hub.$on('remove', this.remove)
            this.refresh()
        },
        methods: {
    
            selection_change(val) {
                this.checklist = val
            },
            child_refresh(pager) {
                this.pager.page_no = pager.page_no
                this.pager.page_size = pager.page_size
                this.pager.sort_name = pager.sort_name
                this.pager.is_desc = pager.is_desc
                this.refresh()
            },
            refresh() {
                var params = {
                    page: this.pager.page_no,
                    per_page: this.pager.page_size,
                    sort: this.pager.sort_name,
                    is_desc: this.pager.is_desc,
                }

                this.loading = true

                ajax.ajax(params).then(function (rsp) {
                    rsp.data.forEach(t => t.$checked = false)
                    this.rows = rsp.data
                    this.pager.total = rsp.total
                    this.loading = false
                }.bind(this))
            },
            edit(row, index) {
                this.rows[index].name = new Date().getTime().toString()
            },
            remove(row) {
                const r = this.rows.find(t => t.id === row.id)
                const index = this.rows.indexOf(r)
                this.rows.splice(index, 1)
            },
            remove_all() {
                for (let i = 0; i < this.checklist.length; i++) {
                    const row = this.rows.find(t => t.id === this.checklist[i].id)
                    this.remove(row)
                }
            }
        },
        computed: {
            items() {
                return col(this.rows, this.columns, this.q)
            }
        },
        components: {
            ShowColumns,
            TableServer
        },
        beforeDestroy: function () {
             this.btn_hub.$off('edit', this.edit)
             this.btn_hub.$off('remove', this.remove)
        }
    }
</script>