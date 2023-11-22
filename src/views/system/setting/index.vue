<template>
    <div style="padding: 30px;">
        <el-form
            :model="form"
            label-width="100px"
            label-position="top"
        >
            <el-form-item label="Register Gift">
                <el-switch v-model="form.isRegisterGift" />
            </el-form-item>
            <el-form-item label="Register Gift Count">
                <el-input-number v-model="form.registerGiftCount" />
            </el-form-item>
            <el-form-item label="Follow Gift">
                <el-switch v-model="form.isFollowGift" />
            </el-form-item>
            <el-form-item label="Follow Gift Count">
                <el-input-number v-model="form.followGiftCount" />
            </el-form-item>
            <el-form-item label="Invite Gift">
                <el-switch v-model="form.isInviteGift" />
            </el-form-item>
            <el-form-item label="Inviter Gift Count">
                <el-input-number v-model="form.inviteGiftCount" />
            </el-form-item>
            <el-form-item label="Invitee Gift Count">
                <el-input-number v-model="form.beInvitedGiftCount" />
            </el-form-item>
            <el-form-item label="Is InviteCode Required">
                <el-switch v-model="form.inviteCodeRequired" />
            </el-form-item>
            <el-form-item label="Points Sharing Ratio">
                <el-input-number v-model="form.pointsSharingRatio" /><span>%</span>
            </el-form-item>
            <el-form-item label="USDC Sharing Ratio">
                <el-input-number v-model="form.usdcSharingRatio" /><span>%</span>
            </el-form-item>
            <el-form-item label="Gift Points Count">
                <el-input v-model="form.giftPointsCount" />
            </el-form-item>
            <el-form-item label="Gift Usdc Min Count">
                <el-input v-model="form.giftUsdcMinCount" />
            </el-form-item>
            <el-form-item label="Gift Usdc Max Count">
                <el-input v-model="form.giftUsdcMaxCount" />
            </el-form-item>
            <el-form-item label="Special Gift Points Count">
                <el-input v-model="form.specGiftPointsCount" />
            </el-form-item>
            <el-form-item label="Special Gift Usdc Min Count">
                <el-input v-model="form.specGiftUsdcMinCount" />
            </el-form-item>
            <el-form-item label="Special Gift Usdc Max Count">
                <el-input v-model="form.specGiftUsdcMaxCount" />
            </el-form-item>
            <el-form-item label="Is Special Extra Gift">
                <el-switch v-model="form.isSpecExtraGift" />
            </el-form-item>
            <el-form-item label="Special Extra Gift Usdc Min Count">
                <el-input v-model="form.specExtraGiftUsdcMinCount" />
            </el-form-item>
            <el-form-item label="Special Extra Gift Usdc Max Count">
                <el-input v-model="form.specExtraGiftUsdcMaxCount" />
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button
                type="primary"
                @click="onSubmit()"
            >Submit</el-button>
        </div>
    </div>
</template>

<script setup>
import { getSetting, editSetting } from '@/api/system/setting'
import { onMounted } from 'vue'
import { $ref } from 'vue/macros'
import { ElMessage } from 'element-plus'

let form = $ref({})

onMounted(fetchSetting)

function fetchSetting() {
  getSetting().then(fillSetting)
}

function fillSetting(response) {
  form = {
    ...response.data
  }
}

function onSubmit() {
  editSetting({
    ...form
  }).then(showSuccessMessage)
}

function showSuccessMessage() {
  ElMessage.success('Success update setting')
}
</script>