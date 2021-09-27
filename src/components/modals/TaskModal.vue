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
            <div class="row">
              <div class="col-4">
                <div class="image-plug"></div>
              </div>
              <div class="col-8">
                <form>
                  <div class="form-group col-12">
                    <input v-model="formData.title" type="text" class="form-control" placeholder="Title">
                  </div>
                </form>
              </div>
            </div>
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
  export default {
    name: "TaskModal",
    data() {
      return {
        formData: { title: '' }
      }
    },
    methods: {
      addTask() {
        this.$store.commit('addTask', this.formData);
        this.formData = {};
      }
    }
  }
</script>

<style>
  .image-plug {
    width: 200px;
    height: 200px;
    background-color: gray;
  }
</style>