'use strict'

const Database = use('Database');
const Error = {code:-1,message:{}};
const Success = {code:1,message:{}};

class PublicController{
    async parent({ session }){
        if(session.get('login')){
            return true;
        }
        else{
            return false;
        }
    }
}

class IndexController extends PublicController{
    randomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (var i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }
    index({ view }){
        if(Database){
            const posts = [
                {title:'one',content:'this is number one'},
                {title:'two',content:'this is number two'},
                {title:'three',content:'this is number three'}
            ]
            return view.render('index',{
                title:'12321',
                posts:posts
            })
            // return Database.table('users').select('*')
        }
        else{
            return "连接数据库失败"
        }
    }
    login({ view,session }){
        // constthis.parent({ session }).then(
        //     // console.log(123)
        //     return view.render('index');
        // );
        var status = await this.parent({ session });
        if(status){
            return view.render('index');
        }
        else{
            return view.render('login');
        }
    }
    async do_login({ request, response,session }){
        var post = request.only(['name', 'password']);
        if(post.name==null) {
            Error.message = {data:"用户名不能为空"}
            return Error;
        }
        if(post.password==null) {
            Error.message = {data:"登录密码不能为空"}
            return Error;
        }
        var result = await Database.table('users').where({'username':post.name,'password':post.password});
        if(result.length>0){
            var login_session = this.randomString(32);
            session.put('login', login_session);
            Success.message = {data:'成功登录'};
            return Success;
        }
        else{
            var result = await Database.table('users').where({'username':post.name});
            if(result.length>0){
                Error.message = {data:"登录密码不正确"};
                return Error;
            }
            else{
                Error.message = {data:"用户名不正确"};
                return Error;
            }
        }
    }
}

module.exports = IndexController
