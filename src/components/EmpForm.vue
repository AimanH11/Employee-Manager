<template>
  <div class="form-employee">

   <router-link :to= "{ path : '/'}" class="nav-link" > <ui-button
     color="gray"
     icon="arrow_back"
     size="normal"
     raised
     buttonType="button"
     > Back
    </ui-button></router-link>
     <ui-snackbar-container ref="submitSnackbar"></ui-snackbar-container>
    <form
      class="px-3 py-3"
      autocomplete="off"
      method="POST"
      @submit.prevent="isEdit ? onUpdate() : onSubmit()"
    >
      <div class="row mt-5">
        <div class="col-md-6 mt-3">
          <ui-textbox
            floating-label
            md-light
            icon="account_circle"
            label="Employee Name"
            placeholder="Enter employee name"
            type="text"
            data-vv-as="Employee Name"
            name="employee_name"
            v-validate="'required|alpha_spaces|min:3|max:15'"
            v-model="employee.employee_name"
          ></ui-textbox>
          <p class="text-danger" v-if="errors.has('employee_name')">
            {{ errors.first("employee_name") }}
          </p>
        </div>
        <div class="col-md-6 mt-3">
          <ui-textbox
            floating-label
            icon="contact_phone"
            label="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            v-validate="'required|numeric|min:10|max:10'"
            data-vv-as="Phone Number"
            name="phone_number"
            v-model="employee.phone_number"
          ></ui-textbox>
          <p class="text-danger" v-if="errors.has('phone_number')">
            {{ errors.first("phone_number") }}
          </p>
        </div>
      </div>
       <div class="row mt-5">
        <div class="col-md-6 mt-3">
          <ui-textbox
            floating-label
            icon="mail"
            label="Email Id"
            placeholder="Enter email id"
            type="email"
            data-vv-as="Email Id"
            name="email_id"
            v-validate="'required|email|max:150'"
            v-model="employee.email_id"
          ></ui-textbox>
          <p class="text-danger" v-if="errors.has('email_id')">
            {{ errors.first("email_id") }}
          </p>
        </div>
        <div class="col-md-6 mt-3">
          <ui-textbox
            floating-label
            icon="home"
            label="Address"
            placeholder="Enter Address"
            type="text"
            data-vv-as="Address"
            name="address"
            v-validate="'required|alpha_spaces|min:5|max:150'"
            v-model="employee.address"
          ></ui-textbox>
          <p class="text-danger" v-if="errors.has('address')">
            {{ errors.first("address") }}
          </p>
      </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12">
          <ui-button
            color="primary"
            icon="done"
            size="normal"
            raised
            >{{ isEdit ? "Update" : "Save" }}
          </ui-button>
          <ui-button
            color="red"
            icon="clear"
            size="normal"
            raised
            buttonType="button"
            @click="resetForm"
            >Clear</ui-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmployeeForm',
  props: ['isEdit'],
  data () {
    return {
      employee: {
        id: '',
        employee_name: '',
        phone_number: '',
        email_id: '',
        address: ''
      }
    }
  },
  mounted () {
    if (this.isEdit) {
      this.get_particular_data()
    }
  },
  methods: {
    generateUid () { // generating ID
      let uuid = Math.floor(Math.random() * 100)
      return uuid * 100
    },
    get_data_localStorage () {
      if (localStorage.getItem('employee_data')) {
        let data = JSON.parse(localStorage.getItem('employee_data'))
        return data
      }
    },
    get_particular_data () { // getting specific ID
      if (localStorage.getItem('employee_data')) {
        let data = JSON.parse(localStorage.getItem('employee_data'))
        let empId = this.$route.params.id
        let result = data.find((element) => element.id === empId)
        this.employee = result
      }
    },
    resetForm () {
      if (this.isEdit) {
        this.get_particular_data()
        return
      }
      this.employee.id = ''
      this.employee.employee_name = ''
      this.employee.phone_number = ''
      this.employee.email_id = ''
      this.employee.address = ''
      this.$validator.pause()
      this.$nextTick(() => {
        this.$validator.errors.clear()
        this.$validator.fields.items.forEach((field) => field.reset())
        this.$validator.fields.items.forEach((field) =>
          this.errors.remove(field)
        )
        this.$validator.resume()
      })
    },
    createSnackbar () {
      let snkMessage
      if (this.isEdit) {
        snkMessage = 'Employee details updated successfully!'
      } else {
        snkMessage = 'Employee details added successfully!'
      }
      this.$refs.submitSnackbar.createSnackbar({
        message: snkMessage,
        action: 'View',
        duration: 5000,
        actionColor: 'primary',
        onActionClick: () => {
          this.$router.push('/')
        }
      })
    },
    onSubmit () {
      this.$validator.validate().then((isValid) => {
        if (!isValid) {
          return
        }
        let jsonData = {}
        const form = event.target
        const formData = new FormData(form)
        for (const [key, value] of formData) {
          jsonData['id'] = this.generateUid()
          jsonData[key] = value
        }
        let dataSave
        if (localStorage.getItem('employee_data')) {
          dataSave = this.get_data_localStorage()
        } else {
          dataSave = new Array({})
        }
        dataSave.push(jsonData)
        localStorage.setItem('employee_data', JSON.stringify(dataSave)) // saving data into lS
        this.createSnackbar()
        this.resetForm()
      })
    },
    onUpdate () {
      this.$validator.validate().then((isValid) => {
        if (!isValid) {
          return
        }
        let jsonData = {}
        const form = event.target
        const formData = new FormData(form)
        for (const [key, value] of formData) {
          jsonData[key] = value
        }

        let employeeDataArray = this.get_data_localStorage()
        let empId = this.$route.params.id
        for (let i = 0; i < employeeDataArray.length; i++) {
          if (employeeDataArray[i].id === empId) {
            jsonData['id'] = empId
            employeeDataArray.splice(i, 1, jsonData)
            localStorage.setItem(
              'employee_data',
              JSON.stringify(employeeDataArray)
            )
          }
        }
        this.createSnackbar()
        this.get_data_localStorage()
      })
    }
  }
}
</script>
