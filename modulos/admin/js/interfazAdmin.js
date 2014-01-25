
Ext.onReady(function(){

/**************************** MODEL ******************************************/

Ext.define('empresasModel',{
  extend:'Ext.data.Model',
  fields:[
      {name:'idempresa',type:'int'},
      {name:'empresa',type:'string'}
  ],
  idProperty:'company'

});





Ext.define('usuariosModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idusuario',type:'int'},
   {name:'usuario',type:'string'},
   {name:'tipo',type:'int'},
   {name:'tipoU',type:'string'}
   
  ],
  idProperty:'company'


});




/**************************** STORES ******************************************/



var storeEmpresas=Ext.create('Ext.data.JsonStore',{

  model:'empresasModel',
  remoteSort:true,
     proxy:{
                type:'ajax',
                url:'procesos/empresas_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});


var storeUsuarios=Ext.create('Ext.data.JsonStore',{
  model:'usuariosModel',
   proxy:{
                type:'ajax',
                url:'procesos/usuarios_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});


   
var smUsuarios=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showUsuariosForm(0);  
                     var tip=record.get('tipo');
                     if(tip==1){
                      var radio=Ext.getCmp('tipousuariog');
                      radio.setValue({tipousuariog:"1"});

                     }
                     if(tip==2){
                      var radio=Ext.getCmp('tipousuariog');
                      radio.setValue({tipousuariog:"2"});                      

                     }
                     formUsuario.getForm().loadRecord(record);
                        }
                    
                    
                    }
               }
               }); //fin del sm


/************************************ LLAMADAS A STORES PRINCIPALES ****************************************************/
storeEmpresas.load();

/*********************** FORMULARIOS **********************************/
 
 function showUsuariosForm(accion){
    



                       formUsuario=Ext.widget('form',{

                      layout:{
                               type:'table',
                               columns:4,
                               tdAttrs:{
                                valign:'middle'
                               }
                        },
                        fieldDefaults: {
                                    labelWidth: 150,
                                    labelStyle: 'font-weight:bold'
                                },
                        defaults:{
                            frame:true,
                            border: true,
                            style: 'margin: 2px 10px 5px 10px;'

                        },
                        items:[
                                {
                                 xtype:'hiddenfield',
                                 id:'idusuario',
                                 colspan:4,
                                 name:'idusuario'                  
                                                    
                                },{
                                 xtype:'textfield',
                                 id:'usuario',
                                 name:'usuario',
                                 fieldLabel:'<b>Usuario</b>',
                                 allowBlank:false,
                                 colspan:4,
                                 width:300
                              },
                              {
                               xtype:'textfield',
                               fieldLabel:'<b>Password (minimo 8 caracteres)</b>',
                               allowBlank:false,
                               colspan:4,
                               id:'password',
                               allowBlank:true,
                               inputType:'password'
                              },
                              {
                                    xtype      : 'radiogroup',
                                    fieldLabel : '<b>Tipo de usuario.</b>',
                                    id:'tipousuariog',
                                    allowBlank:false,
                                    colspan:4,
                                    columns:1,
                                                      
                                    items:[
                                        {
                                            boxLabel  : 'Administrador',
                                            inputValue: '1',
                                            name:'tipousuariog'
                                           
                                        },
                                        {
                                            boxLabel  : 'Normal',
                                            name:'tipousuariog',
                                            inputValue: '2'
                                            
                                        }
                                    ]
                                   
                            }                              
                              

                          
                        ],
                        buttons:[
                          {
                            text:'<b>REGISTRAR</b>',
                            iconCls:'icon-OK',
                            width:150,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){
                                        var post_usuario=Ext.getCmp('usuario').getValue();
                                        var post_password=Ext.getCmp('password').getValue();
                                        var post_tipo=Ext.getCmp('tipousuariog').getChecked()[0].getGroupValue();
                                        var post_id_e=Ext.getCmp('dataempresa').getValue();
                                        
                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_usuario.php?ide='+post_id_e+'&usuario='+post_usuario+'&pass='+post_password+'&tipo='+post_tipo,
                                                           method:'POST',
                                                           success:function(result,request){

                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                          storeUsuarios.load({params:{ide:post_id_e}});
                                                                          Ext.MessageBox.show({
                                                                              title:'Exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.INFO
                                                                          });
                                                                      }
                                                                      if(bandera==2){
                                                                          Ext.MessageBox.show({
                                                                              title:'Sin exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.ERROR
                                                                          });

                                                                      }
                                                                       if(bandera==3){
                                                                          Ext.MessageBox.show({
                                                                              title:'Plan ya existe',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });

                                                                      }


                                                              }//fin de success

                                                          });

                                                     }
                                                     else{//actualizacion
                                                      var post_idusuario=Ext.getCmp('idusuario').getValue();

                                                       Ext.Ajax.request({
                                                          url:'procesos/modificar_usuario.php?usuario='+post_usuario+'&pass='+post_password+'&tipo='+post_tipo+'&iduser='+post_idusuario,
                                                          method:'POST',
                                                                success: function(result,request){
                                                                         var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                      
                                                                                             if (bandera==1) {
                                                                                                          storeUsuarios.load({params:{ide:post_id_e}});
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Exito',
                                                                                                           msg:msj,
                                                                                                           buttons:Ext.MessageBox.OK,
                                                                                                           icon: Ext.MessageBox.INFO
                                                                                                           });
                                                                                                          }
                                                      
                                                                                                  if(bandera==2) { 
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Sin exito',
                                                                                                          msg:msj,
                                                                                                          buttons:Ext.MessageBox.OK,
                                                                                                          icon: Ext.MessageBox.ERROR
                                                                                                          });
                                                      
                                                                                                                 }              
                                                        
                                                                },
                                                                  failure: function(result,request){
                                                                                   Ext.MessageBox.show({
                                                                                   title:'Subcategoria',
                                                                                   msg:'CONEXION AL SISTEMA INTERRUMPIDO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                                                   buttons:Ext.MessageBox.OK,
                                                                                   icon: Ext.MessageBox.WARNING
                                                                                    });
                                                                                                      
                                                                   }          
                                                      
                                                      
                                                          });
                                                      





                                                     }

                                this.up('form').getForm().reset();
                                this.up('window').destroy();

                                        
                              }//fin de valid
                              else{
                                Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                              }

                            }//fin del handler


                          },
                          {
                            text:'<b>CANCELAR</b>',
                            iconCls:'icon-CANCEL',
                            width:150,
                            handler:function(){
                                this.up('form').getForm().reset();
                                this.up('window').destroy();
                                }

                          }

                        ]


                     });

     
     


      var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE USUARIOS',
                closable: true,
                width: 350,
                height:250,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formUsuario
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showUsuarioForm


 


/**************************** DATA GRIDS ******************************************/

var gridUsuarios=Ext.create('Ext.grid.Panel',{
 	store:storeUsuarios,
 	stateful:true,
 	collapsible:false,
 	selModel:smUsuarios,
 	multiSelect:true,
 	stateId:'stateGrid',

 	columns:[
        {
          text:'IDUSUARIO',
          sortable:false,
          dataIndex:'idusuario',
          hidden:true
        },
       {
          text:'TIPO',
          sortable:false,
          dataIndex:'tipo',
          hidden:true
        },        
       {
 			text:'<b>USUARIO</b>',
 			sortable:true,
 			flex:1,
      dataIndex:'usuario'
 		   }
       ,
 		
 		{
 			text:'<b>TIPO DE USUARIO</b>',
 			sortable:true,
 			flex:1,
 			dataIndex:'tipoU'
 		}

        ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                text: '<b>Agregar Usuario</b>',
                id: 'btnaddPlan',
                disabled:true,
                
                handler:function(){
                  showUsuariosForm(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                text: '<b>Borrar Usuario</b>',
                id: 'btndeletePlan',
                disabled:true,
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿Desea los usuarios seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridUsuarios.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idusuario');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_usuario.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                       var post_ide=Ext.getCmp('dataempresa').getValue();
                                                                       storeUsuarios.load({params:{ide:post_ide}});
                                                                  }
                                                                  if (bandera==2||bandera==3) {

                                                                       Ext.MessageBox.show({
                                                                              title:'Sin Exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });//fin de msj

                                                                  }


                                            }//fin del success
                                        });
                                        
                                      });
                                    }//fin del yes

                      });


                }//fin del handler

                
              }


            ]


 	});



/************ PANELES ***********/

var panel_central=new Ext.Panel({
	 //title:'DATOS',
	 collapsible:false,
   //iconCls:'icon-datos',
   width:'100%',
   padding:10,
	 items:[
	 {
                
                    xtype : 'combo',
                    id : 'dataempresa',
                    store : storeEmpresas,
                    displayField:'empresa',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idempresa',
                    hiddenName : 'idempresa',
                    fieldLabel: '<b>SELECCIONE EMPRESA (*)</b>',
                    labelWidth:200,
                    width:450,
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE  EMPRESA',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                                               
                         storeUsuarios.load({params:{ide:newVal}});
                         Ext.getCmp('btnaddPlan').setDisabled(false);
                         Ext.getCmp('btndeletePlan').setDisabled(false);
                         

                     }
          }
                
            },
           

	 gridUsuarios
	 ]


});

/***     CONTENEDOR   ***/
    
  var main_panel=new Ext.Panel({
      renderTo:'interfazGestionPlanes',
      iconCls:'icon-userconfig',
     width:'97%',
      collapsible:false, 
      title:'Administracion de los Usuarios del sistema' ,
        items:[
        panel_central
        ]

  })

});