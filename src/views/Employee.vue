<template>
 <div class="container">
       <div style="text-align:center;">
        <h2> <b> Employee Details</b></h2>
       </div>
      <ui-snackbar-container ref="snackbarContainer" ></ui-snackbar-container>
      <ui-confirm
        confirm-button-icon="delete"
        confirm-button-text="Delete"
        deny-button-text="Cancel"
        ref="deleteConfirm"
        title="Delete"
        type="danger"
        @confirm="onConfirmDelete">
        Are you sure you want to delete the employee details?
      </ui-confirm>
      <div class="row mt-3">
        <div class="table-responsive">
          <table class="table table-bordered table-dark table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th> <ui-icon icon="account_circle"></ui-icon> Name</th>
                <th><ui-icon icon="mail"></ui-icon> Email</th>
                <th><ui-icon icon="contact_phone"></ui-icon> Phone</th>
                <th><ui-icon icon="home"></ui-icon> Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="employee_list && employee_list.length > 0">
              <tr v-for="(employee, index) in employee_list" :key="employee.id">
                <td>{{ employee_list.length - index }}</td>
                <td>{{ employee.employee_name }}</td>
                <td>{{ employee.email_id }}</td>
                <td>{{ employee.phone_number }}</td>
                <td>{{ employee.address }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'Edit',
                      params: { id: employee.id },
                    }"
                    ><ui-button
                      color="primary"
                      icon="edit"
                      size="normal"
                      tooltip="Edit"
                      tooltip-position="top"
                      @click="isEmployeeEdit = true"
                    >Edit</ui-button>
                  </router-link>

                  <ui-button
                    color="red"
                    icon="delete"
                    size="normal"
                    tooltip="Delete"
                    tooltip-position="top"
                    @click="showConfirm('deleteConfirm', employee.id)"
                  >Delete</ui-button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td  colspan="8">No data found! Click on add button to add data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'EmployeeDetail',
  data: function () {
    return {
      employee_list: [],
      selectedId: ''
    }
  },
  mounted () {
    this.get_data_list()
  },
  methods: {
    get_data_list () {
      this.employee_list = this.get_data_localStorage()
    },
    get_data_localStorage () { // getting data
      if (localStorage.getItem('employee_data')) {
        let data = JSON.parse(localStorage.getItem('employee_data'))
        return data.reverse()
      }
    },
    showConfirm (ref, id) {
      this.selectedId = id
      this.$refs[ref].open()
    },
    onConfirmDelete () { // deleting data using splice
      let employeeArray = this.get_data_localStorage()
      for (let i = 0; i < employeeArray.length; i++) {
        if (employeeArray[i].id === this.selectedId) {
          employeeArray.splice(i, 1)
          localStorage.setItem(
            'employee_data',
            JSON.stringify(employeeArray)
          )
        }
      }
      this.$refs.snackbarContainer.createSnackbar({
        message: 'Employee details are deleted successfully!!!',
        action: '',
        duration: 7000
      })
      this.get_data_list()
    }
  }
}
</script>
