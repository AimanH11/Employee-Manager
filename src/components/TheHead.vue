<template>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
          <div class="navbar-brand">
                <router-link :to= "{ path : '/'}"  class="nav-link"> <b>Employee Manager</b> </router-link>
            </div>
          <div class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link :to="{ name: 'Create' }" class="nav-link"><ui-button icon="add" color="primary">Add</ui-button></router-link>
      </li>
    </div>
        </nav>
</template>
<script>
export default {
  name: 'TheHead'
}
</script>
