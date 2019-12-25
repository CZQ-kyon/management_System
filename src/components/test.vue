<template>
    <div>
        <div id="box">
            <input type="button" @click="show" value="展示">
            <table>
                <tr v-for="a in test">
                    <td>{{a.id}}</td>
                    <td>{{a.password}}</td>
                    <td>{{a.money}}</td>
                    <td>{{a.child_name}}</td>
                    <td>{{a.count}}</td>
                    <td>{{a.study_time}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            test:{}
        }
    },
    methods:{
        show(){
            this.$http.get('api/parents_table/parents_table')
            .then((Response)=>{
                this.test = Response.data;
                console.log(Response.data);
            })
        }
    }
}
</script>