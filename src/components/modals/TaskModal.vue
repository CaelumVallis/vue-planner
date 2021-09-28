<template>
  <div class="modal" id="taskModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add new task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
                  data-bs-target="#taskModal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
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
                      <input v-model="formData.title" type="text" class="form-control" placeholder="Title">
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
                        <input v-model="formData.pointName"
                          v-if="formData.taskType !== this.constants.taskType.completed &&
                                formData.taskType !== ''"
                          type="text"
                          class="form-control"
                          placeholder="Point name">
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-6">
                        <input v-model="formData.pointValue" type="text" class="form-control" placeholder="Point value">
                      </div>
                      <div
                        v-if="formData.taskType === this.constants.taskType.pointsOfTotalForTime"
                        class="form-group col-6">
                        <input type="text" class="form-control" placeholder="For time">
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="addTask" type="button" data-bs-dismiss="modal"
                  data-bs-target="#taskModal" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                  data-bs-target="#taskModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { modalConstants } from "../../assets/constants";
  export default {
    name: "TaskModal",
    data() {
      return {
        formData: {
          title: '',
          taskType: '',
          pointName: '',
          pointValue: '',
          image: ''
        }
      }
    },
    created() {
      this.constants = modalConstants;
    },
    methods: {
      addTask() {
        this.$store.commit('addTask', this.formData);
        this.formData = {};
      },
      // imageUpload(e) {
      //   this.formData.image = e.target.files[0];
      // },
      logChange(args) {
        console.log(args);
      }
    }
  }
</script>

<style>
  .image-plug {
    width: 200px;
    height: 100%;
    background-color: gray;
  }
</style>