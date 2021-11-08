<template>
  <div class="backdrop d-flex justify-content-center align-items-center">
    <div
      :class="{ show: modalOpen }"
      class="card p-2 w-50">
      <div class="dialog-header d-flex justify-content-between">
        <h4>{{titles.modalTitle}}</h4>
        <button
          @click="$emit('close')"
          type="button" class="btn-close"></button>
      </div>

      <div class="dialog-body container-fluid px-0">
        <form
          id="modalForm"
          @submit.prevent="saveChanges"
        >
          <div class="row">
            <div class="col-4">
              <div class="form-group">
                <img v-if="formData.imageUrl" :src="formData.imageUrl" class="mb-2 imgPreview"/>
                <input
                  @change="imageUpload"
                  type="file"
                  accept="image/jpeg"
                  class="form-control-file">
              </div>
            </div>
            <div class="col-8">
              <form>
                <div class="form-group col-12 mb-2">
                  <input
                    v-model="formData.title"
                    type="text"
                    class="form-control"
                    placeholder="Title"
                    :class="{ invalid: ($v.formData.title.$dirty && !$v.formData.title.required) || ($v.formData.title.$dirty && !$v.formData.title.required) }">
                </div>
                <div 
                  class="invalid-validation"
                  v-if="$v.formData.title.$dirty && !$v.formData.title.required">
                  Please enter a title for your task!
                </div>
                <div class="row mb-2">
                  <div class="form-group col-6">
                    <select
                      v-model="formData.taskType"
                      class="form-control"
                      :class="{ invalid: $v.formData.taskType.$dirty && !$v.formData.taskType.required }">
                      <option disabled value="">Task type</option>
                      <option>{{this.constants.taskType.completed}}</option>
                      <option>{{this.constants.taskType.pointsOfTotal}}</option>
                      <option disabled >{{this.constants.taskType.pointsOfTotalForTime}}</option>
                    </select>
                    <div 
                      class="invalid-validation"
                      v-if="$v.formData.taskType.$dirty && !$v.formData.taskType.required">
                      Please choose one of the type!
                    </div>
                  </div>
                  <div class="form-group col-6">
                    <input
                      v-model="formData.pointValue"
                      type="text"
                      class="form-control"
                      placeholder="Point value"
                      :class="{ invalid: ($v.formData.pointValue.$dirty && !$v.formData.pointValue.required) || ($v.formData.pointValue.$dirty && !$v.formData.pointValue.between) }"
                    >
                    <div 
                      class="invalid-validation"
                      v-if="$v.formData.pointValue.$dirty && !$v.formData.pointValue.required">
                      Please enter amount of points!
                    </div>
                    <div 
                      class="invalid-validation"
                      v-else-if="$v.formData.pointValue.$dirty && !$v.formData.pointValue.between">
                      Please enter correct amount of points!
                    </div>
                  </div>
                </div>
                <div
                  v-if="formData.taskType !== this.constants.taskType.completed &&
                        formData.taskType !== ''"
                  class="row mb-2">
                  <div class="form-group col-6">
                    <input
                      v-model="formData.totalPoints"
                      type="text"
                      class="form-control"
                      placeholder="Total points"
                      :class="{ invalid: ($v.formData.totalPoints.$dirty && !$v.formData.totalPoints.required) }"
                    >
                    <div 
                      class="invalid-validation"
                      v-if="$v.formData.totalPoints.$dirty && !$v.formData.totalPoints.required">
                      Please enter amount of total points!
                    </div>
                    <div 
                      class="invalid-validation"
                      v-else-if="$v.formData.totalPoints.$dirty && !$v.formData.totalPoints.between">
                      Please enter correct amount of total points!
                    </div>
                  </div>
                  <div class="form-group col-6">
                    <input
                      v-model="formData.pointName"
                      type="text"
                      class="form-control"
                      placeholder="Point name"
                      :class="{ invalid: $v.formData.pointName.$dirty && !$v.formData.pointName.required}"
                    >
                    <div 
                      class="invalid-validation"
                      v-if="$v.formData.pointName.$dirty && !$v.formData.pointName.required">
                      Please enter name for points!
                    </div>
                  </div>
                  <!--<div class="form-group col-6">-->
                  <!--<input-->
                  <!--v-if="formData.taskType === this.constants.taskType.pointsOfTotalForTime"-->
                  <!--type="text"-->
                  <!--class="form-control"-->
                  <!--placeholder="For time">-->
                  <!--</div>-->
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
          form="modalForm"
          class="btn btn-secondary mx-2"
        >Close</button>
        <button
          type="submit"
          form="modalForm"
          class="btn btn-primary"
        >{{titles.buttonTitle}}</button>
      </div>
    </div>
  </div>

</template>

<script>
  import { modalConstants } from "../../assets/constants";
  import { required, between, requiredIf } from "vuelidate/lib/validators"

  export default {
    name: "TaskModal",
    props: { modalOpen: Boolean, initialValues: Object },
    data() {
      return {
        formData: {},
        titles: {},
        errors: []
      }
    },
    validations: {
      formData: {
        title: {required},
        pointValue: {
          required,
          between: between(0, 100)
        },
        taskType: {
          required
        },
        totalPoints: {
          required: requiredIf(function () {
            return this.formData.taskType === 'Points / total';
          }),
          between: between(0, 100)
        },
        pointName: {
          required: requiredIf(function() {
            return this.formData.taskType === 'Points / total';
          })
        }
      }
    },
    created() {
      this.constants = modalConstants;
      this.formData = {...this.initialValues};
      this.formData.id ? this.titles = modalConstants.titles.editMode : this.titles = modalConstants.titles.addMode;
      document.querySelector('body').classList.add('modal-open');
    },
    methods: {
      saveChanges() {
        this.formData.id ? this.editTask() : this.addTask();
      },
      addTask() {
        if(this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        this.$store.commit('addTask', {...this.formData, id: this.getId()});
        this.$emit('close');
      },
      editTask() {
        this.$store.commit('editTask', this.formData);
        this.$emit('close');
      },
      getId() {
        return '_' + Math.random().toString(36).substr(2, 9);
      },
      async imageUpload(e) {
        this.formData.imageUrl = await new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.readAsDataURL(e.target.files[0]);
          fr.onload = () => {
            resolve(fr.result);
          };
          fr.onerror = reject;
        });
      }
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
    z-index: 1;
  }

  .imgPreview {
    max-height:75%;
    max-width:75%;
    height:auto;
    width:auto;
  }

  .invalid {
    border-bottom: 2px solid red;
  }

  .invalid:focus {
    box-shadow: 0 0 0 0.25rem rgb(255 0 0 / 25%);
  }

  .invalid-validation {
    color: red;
    margin: 10px 0;
  }
</style>