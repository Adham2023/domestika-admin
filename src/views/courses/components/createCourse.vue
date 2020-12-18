<template>
  <div>
    <form-wizard
      ref="formWizardRef"
      step-size="xs"
      color="#324157"
      title="New Course"
      subtitle=""
      class="frm-wzrd"
      @on-complete="onComplete"
    >
      <tab-content
        :before-change="checkStepOne"
        class="tb-cnt"
        title="Initiate coure"
        icon="el-icon-folder-add"
      >
        <stepOne ref="stepOneRef" />
      </tab-content>
      <tab-content
        class="tb-cnt"
        icon="el-icon-notebook-2"
        title="Create chaptes"
        :before-change="checkStepTwo"
      >
        <stepTwo ref="stepTwoRef" />
      </tab-content>
      <tab-content
        class="tb-cnt"
        icon="el-icon-document-add"
        title="Add units"
        :before-change="inStepThree"
      >
        <stepThree />
      </tab-content>
      <tab-content
        class="tb-cnt"
        icon="el-icon-finished"
        title="Preview and Save"
      >
        <stepFour />
      </tab-content>
      <el-button
        v-if="counter > 0"
        slot="custom-buttons-left"
        size="medium"
        type="danger"
        @click="resetAllForms()"
      >Cancel
      </el-button>

      <el-dialog title="" :visible.sync="cancelDialogVisible" width="30%">
        <span>Are you sure want to cancel new course creation?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialogVisible = false">No</el-button>
          <el-button type="primary" @click="confirmed()">Yes</el-button>
        </span>
      </el-dialog>
    </form-wizard>
    <!-- <Progress :index="0" /> -->
    <finish ref="finishAllRef" @resetAllW="confirmed()" />
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// import Progress from '@/components/Progress'
// steps
import stepOne from './subComponents/stepOne'
import stepTwo from './subComponents/stepTwo'
import stepThree from './subComponents/stepThree'
import stepFour from './subComponents/stepFour'
// import stepFive from "./subComponents/stepFive";
import finish from './subComponents/finish'

export default {
  components: {
    finish,
    // Progress,
    FormWizard,
    TabContent,
    stepOne,
    stepTwo,
    stepThree,
    stepFour
    // stepFive,
  },
  data() {
    return {
      cancelDialogVisible: false,
      counter: 0
    }
  },
  methods: {
    onComplete() {
      this.$store.commit('newCourse/SET_ALL_RESOURCES')
      this.$store.commit('newCourse/SET_FINISHING_DIALOG', true)
    },
    confirmed() {
      this.cancelDialogVisible = false
      this.$refs.formWizardRef.reset()
      this.$store.commit('newCourse/RESET_CHAPTERS')
      this.$refs.stepOneRef.resetFields()
      this.counter = 0
    },
    resetAllForms() {
      this.cancelDialogVisible = true
    },
    checkStepOne() {
      this.counter++
      return new Promise((resolve, reject) => {
        resolve(this.$refs.stepOneRef.validateForm())
      })
    },
    checkStepTwo() {
      return new Promise((resolve, reject) => {
        resolve(this.$refs.stepTwoRef.validateStepTwo())
      })
    },
    inStepThree() {
      return new Promise((resolve, reject) => {
        this.$store.commit('newCourse/prepareData')
        resolve(true)
      })
    }
  }
}
</script>

<style >
.frm-wzrd {
  /* border: 1px solid red; */
  height: 100%;
}
.wizard-title {
  font-weight: bolder !important;
  font-size: 18px !important;
}

.app-cntr {
  /* border: 1px solid green; */
  height: calc(100vh - 69px);
}

.tb-cnt {
  /* border: 1px solid blue; */
  height: calc(100vh - 290px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
