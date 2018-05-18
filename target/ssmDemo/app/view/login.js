/**
 * Created by Administrator on 2018/5/16 0016.
 */
var uname = new Ext.form.TextField( {
    margin:"10px",
    width:"100%",
    id :'uname',
    fieldLabel : '用户名',
    name : 'name',//元素名称
    anchor:'95%',//也可用此定义自适应宽度
    allowBlank : false,//不允许为空
    value : "admin",
    blankText : '用户名不能为空'//错误提示内容
});
var pwd = new Ext.form.TextField( {
    width:"100%",
    margin:"10px",
    id : 'pwd',
    //xtype: 'textfield',
    inputType : 'password',
    fieldLabel : '密　码',
    anchor:'95%',
    maxLength : 10,
    name : 'password',
    allowBlank : false,
    value : "12345",
    blankText : '密码不能为空'
});
Ext.onReady(function() {
    //使用表单提示
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';

    //定义表单
    var simple = new Ext.FormPanel( {

        labelWidth : 75,
        defaults : {
            width : 150
        },
        defaultType : 'textfield',//默认字段类型
        bodyStyle : 'background: #cdcdcd;padding:30 0 0 20;',
        border : false,
        buttonAlign : 'center',
        border : false,
        id : "form",
        //定义表单元素
        items : [ uname, pwd ],
        buttons : [ {
            text : '登录',
            type : 'submit',
            id : 'sb',
            //定义表单提交事件
            handler : save
        }, {
            text : '重置',
            handler : function() {
                simple.form.reset();
            }
        } ],
        keys : [ {
            key : Ext.EventObject.ENTER,
            fn : save,
            scope : this
        } ]
    });
    function save() {
        var name = uname.getValue();
        var password = pwd.getValue();
        //验证合法后使用加载进度条
        if (simple.form.isValid()) {
            //提交到服务器操作
            simple.form.submit({
                waitMsg : '正在进行登陆验证,请稍后...',
                url : 'login/login',
                method : 'post',
                params : {
                    userName : name,
                    userPass : password
                },
                //提交成功的回调函数
                success : function(form, action) {
                    if (action.result.msg == 'OK') {
                        console.log("hello ");
                        window.location.href="index.html"
                    }else if(action.result.msg == 'ERROR') {
                        window.location.href="index.html";
                    }
                },
                //提交失败的回调函数
                failure : function(form, action) {
                    console.log(action.result.msg);
                    switch (action.failureType) {
                        case Ext.form.Action.CLIENT_INVALID:
                            Ext.Msg.alert('错误提示', '表单数据非法请核实后重新输入！');
                            break;
                        case Ext.form.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('错误提示', '网络连接异常！');
                            break;
                        case Ext.form.Action.SERVER_INVALID:
                            Ext.Msg.alert('错误提示', "您的输入用户信息有误，请核实后重新输入！");

                    }
                }
            });
        }
    };
    //定义窗体
    var win = new Ext.Window({
        id : 'win',
        layout : 'fit', //自适应布局
        align : 'center',
        width : 330,
        height : 182,
        resizable : false,
        draggable : false,
        border : false,
        bodyStyle : 'padding:5px;background:gray',
        maximizable : false,//禁止最大化
        closeAction : 'close',
        closable : false,//禁止关闭,
        items : simple
        //将表单作为窗体元素嵌套布局
    });
    win.show();//显示窗体
    pwd.focus(false, 100);
});
