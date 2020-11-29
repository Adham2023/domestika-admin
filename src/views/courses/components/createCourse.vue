<template>
  <form-wizard
    step-size="xs"
    color="#324157"
    title="New Course"
    subtitle=""
    class="frm-wzrd"
  >
    <tab-content class="tb-cnt" title="Initiate coure" icon="el-icon-folder-add">
      <stepOne />
    </tab-content>
    <tab-content class="tb-cnt" icon="el-icon-notebook-2" title="Add chaptes and units">
      <stepTwo />
    </tab-content>
    <tab-content class="tb-cnt" icon="el-icon-finished" title="Preview and Save">
      <stepThree />
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

// steps
import stepOne from './subComponents/stepOne'
import stepTwo from './subComponents/stepTwo'
import stepThree from './subComponents/stepThree'

export default {
  components: {
    FormWizard,
    TabContent,
    stepOne,
    stepTwo,
    stepThree
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
