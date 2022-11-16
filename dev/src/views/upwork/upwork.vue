<template>
    <div class="upwork">
        <tr v-for="(name, index) in form"
            :key="index">
            <td>
                <div>
                    <input
                        class="input"
                        :class="{
                'is-danger': hasErrorName[index] === true
                }"
                        @keyup.prevent="validateField('name',index)"
                        type="text"
                        v-model="name.description"
                    >
                </div>
                <span v-if="hasErrorName[index] === true"
                      class="help is-danger">
            {{ msgName[index] }}
          </span>
            </td>
        </tr>
    </div>
</template>

<script>
export default {
    name: "upwork",
    data() {
        return {
            form: {},
            hasErrorName: {},
            msgName: {},
        };
    },
    method: {
        validateField(field, index)
        {
            if (field === 'name') {
                if (!this.form[index].description) {
                    this.hasErrorName[index] = true;
                    this.msgName[index] = 'Name is required.';
                } else {
                    this.hasErrorName[index] = false;
                    this.msgName[index] = null;
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">

</style>