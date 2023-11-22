<template>
    <el-descriptions
        style="margin-bottom: 30px"
        title="New Member Statistics"
        direction="vertical"
        :column="4"
        :border="true"
    >
        <el-descriptions-item label="Today">{{
            statistics.dailySignUp
        }}</el-descriptions-item>
        <el-descriptions-item label="Last 24 hours">{{
            statistics.recentDailySignUp
        }}</el-descriptions-item>
        <el-descriptions-item label="This month">{{
            statistics.monthSignUp
        }}</el-descriptions-item>
        <el-descriptions-item label="Last 30 days">{{
            statistics.recentMonthSignUp
        }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions
        style="margin-bottom: 30px"
        title="Active Member Statistics"
        direction="vertical"
        :column="5"
        :border="true"
    >
        <el-descriptions-item label="DAU(Today)">{{
            statistics.dailyAccess
        }}</el-descriptions-item>
        <el-descriptions-item label="Daily Visit (Today)">{{
            statistics.dailyVisit
        }}</el-descriptions-item>
        <el-descriptions-item label="MAU(This month)">{{
            statistics.monthAccess
        }}</el-descriptions-item>
        <el-descriptions-item label="Monthly Visit (This Month)">{{
            statistics.monthVisit
        }}</el-descriptions-item>
        <el-descriptions-item label="Total Visit">{{
            statistics.totalVisit
        }}</el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import { $ref } from 'vue/macros'
import { onMounted } from 'vue'
import { getMemberStatistics } from '@/api/member/member'

let statistics = $ref({})

onMounted(reloadStatistics)

function reloadStatistics() {
  getMemberStatistics({}).then(response => {
    statistics = { ...response.data }
  })
}
</script>