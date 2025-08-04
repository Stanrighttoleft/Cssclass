<template>
    <div class="d-flex justify-content-center align-items-center row loginForm">
        <div class="col-sm-8">
            <form action="">
            <div class="shadow p-5 rounded-4">
                
                    <label class="form-label" for="acName">帳號：</label>
                    <input class="form-control" type="text" name="acName">
                    <br>
                    <br>
                    <label class="form-label" for="acPassword">密碼：</label>
                    <input class="form-control" type="password" name="acPassword">
                    <br>
                    <br>

                    <div class="d-flex justify-content-end gap-3">
                        <button type="submit" class="btn btn-primary">提交</button>
                        <button type="reset" class="btn btn-primary">清除</button>
                    </div>
     
            
                
            </div>
            </form>
            <div>
    
            </div>
        </div>
    </div>
    
  
</template>

<script setup>

</script>

<style scoped>




.loginForm{
    height: 600px;
}

</style>