<template>
  <div class="backdrop d-flex justify-content-center align-items-center">
    <div
      v-bind:class="{ show: modalOpen }"
      class="card p-2">

      <div class="dialog-header d-flex justify-content-between">
        <h4>Add new task</h4>
        <button
          @click="$emit('close')"
          type="button" class="btn-close"></button>
      </div>

      <div class="dialog-body container-fluid px-0">
        <form>
          <div class="row">
            <div class="col-4">
              <div class="image-plug"></div>
              <!--                    <div class="form-group">-->
              <!--                      <input @change="imageUpload" type="file" class="form-control-file">-->
              <!--                    </div>-->
            </div>
            <div class="col-8">
              <form>
                <div class="form-group col-12 mb-2">
                  <input
                    v-model="formData.title"
                    type="text"
                    class="form-control"
                    placeholder="Title">
                </div>
                <div class="row mb-2">
                  <div class="form-group col-6">
                    <select
                      v-model="formData.taskType"
                      class="form-control">
                      <option disabled value="">Task type</option>
                      <option>{{this.constants.taskType.completed}}</option>
                      <option>{{this.constants.taskType.pointsOfTotal}}</option>
                      <option disabled >{{this.constants.taskType.pointsOfTotalForTime}}</option>
                    </select>
                  </div>
                  <div class="form-group col-6">
                    <input
                      v-model="formData.pointValue"
                      type="text"
                      class="form-control"
                      placeholder="Point value"
                    >
                  </div>
                </div>
                <div
                  v-if="formData.taskType !== this.constants.taskType.completed &&
                        formData.taskType !== ''"
                  class="row mb-2">
                  <div
                    :class="{ 'col-6': formData.taskType === this.constants.taskType.pointsOfTotalForTime,
                              'col-12': formData.taskType !== this.constants.taskType.pointsOfTotalForTime }"
                    class="form-group"
                  >
                    <input
                      v-model="formData.totalPoints"
                      type="text"
                      class="form-control"
                      placeholder="Total points">
                  </div>
                  <!--                      <div class="form-group col-6">-->
                  <!--                        <input-->
                  <!--                          v-if="formData.taskType === this.constants.taskType.pointsOfTotalForTime"-->
                  <!--                          type="text"-->
                  <!--                          class="form-control"-->
                  <!--                          placeholder="For time">-->
                  <!--                      </div>-->
                </div>
              </form>
            </div>
          </div>
        </form>
      </div>

      <div class="dialog-footer d-flex justify-content-end">
        <button
          @click="$emit('close')"
          type="button"
          class="btn btn-secondary mx-2"
        >Close</button>
        <button
          @click="addTask"
          type="button"
          class="btn btn-primary"
        >Save changes</button>
      </div>
    </div>
  </div>

</template>

<script>
  import { modalConstants } from "../../assets/constants";
  export default {
    name: "TaskModal",
    props: { modalOpen: Boolean, initialValues: Object },
    data() {
      return {
        formData: {},
      }
    },
    created() {
      this.constants = modalConstants;
      this.formData = this.initialValues;
      document.querySelector('body').classList.add('modal-open');
    },
    methods: {
      addTask() {
        this.$store.commit('addTask', {...this.formData, id: this.getId()});
        this.formData = {};
        this.$emit('close');
      },
      getId() {
        return '_' + Math.random().toString(36).substr(2, 9);
      }
      // imageUpload(e) {
      //   this.formData.image = e.target.files[0];
      // }
    }
  }
</script>

<style scoped>
  .backdrop {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .image-plug {
    width: 200px;
    height: 100%;
    background-color: gray;
  }
</style>