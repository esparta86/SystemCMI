Ext.ns('form_perspectivas');

form_perspectivas.Panel={
   init:function()
   {
    Ext.form.Field.prototype.msgTarget='side';

/**model**/
Ext.define('perspectivaModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idperspectiva',type:'int'},
   {name:'nombrep',type:'string'},
   {name:'descripcionp',type:'string'}
  ],
  idProperty:'company'
});


/***** store ******/

var storePerspectiva=Ext.create('Ext.data.JsonStore',{
  model:'perspectivaModel',
   proxy:{
                type:'ajax',
                url:'procesos/perspectiva_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});

var smPerspectivas=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showPerspectivasForm(0);  
                     formPerspectiva.getForm().loadRecord(record);
                        }
                    
                    
                    }
               }
               }); //fin del sm




/**************** formularios *************************/

 function showPerspectivasForm(accion){
                       formPerspectiva=Ext.widget('form',{

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
                            frame:false,
                            border: false,
                            style: 'margin: 2px 10px 5px 10px;'

                        },
                        items:[
                                {
                                 xtype:'hiddenfield',
                                 id:'idperspectiva',
                                 colspan:4,
                                 name:'idplan'                  
                                                    
                                },
                                {
                                  html:'<img src="../../recursos/img/perpectiva.png" width="75" height="75">',
                                  colspan:2,
                                  border:false
                                },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                    
                                },                                
                                {
                                 xtype:'textfield',
                                 id:'nombrep',
                                 fieldLabel:'<b>Nombre Perspectiva</b>',
                                 allowBlank:false,
                                 colspan:4,
                                 width:500
                              },
                              {
                                 xtype:'textareafield',
                                 id:'descripcionp',
                                 fieldLabel:'<b>Descripcion de la perspectiva</b>',
                                 allowBlank:false,
                                 colspan:4,
                                 width:500
                              }
                                                        
                        ],
                        buttons:[
                          {
                            text:'<b>REGISTRAR</b>',
                            iconCls:'icon-OK',
                            width:175,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){
                                        
                                        var post_perspectiva=Ext.getCmp('nombrep').getValue();
                                        var post_descripcion=Ext.getCmp('descripcionp').getValue();

                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_perspectiva.php?nombre='+post_perspectiva+'&descrip='+post_descripcion,
                                                           method:'POST',
                                                           success:function(result,request){

                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                        storePerspectiva.load();
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
                                                                              title:'Perspectiva ya existe',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });

                                                                      }


                                                              }//fin de success

                                                          });

                                                     }
                                                     else{//actualizacion
                                                      var post_idp=Ext.getCmp('idperspectiva').getValue();

                                                       Ext.Ajax.request({
                                                          url:'procesos/modificar_perspectiva.php?nombre='+post_perspectiva+'&descrip='+post_descripcion+'&id='+post_idp,
                                                          method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                      
                                                                                             if (bandera==1) {
                                                                                                          storePerspectiva.load();
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
                            width:175,
                            handler:function(){
                                this.up('form').getForm().reset();
                                this.up('window').destroy();
                                }

                          }

                        ]


                     });

     
     


      var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE PERSPECTIVAS',
                closable: true,
                width: 600,
                height:300,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formPerspectiva
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showUsuarioForm






storePerspectiva.load();

var gridPerspectivas=Ext.create('Ext.grid.Panel',{
  store:storePerspectiva,
  stateful:true,
  collapsible:false,
  selModel:smPerspectivas,
  multiSelect:true,
  stateId:'stateGrid',

  columns:[
        {
          text:'ID_PERSPECTIVA',
          sortable:false,
          dataIndex:'idperspectiva',
          hidden:true
        },
        {
      text:'<b> NOMBRE DE PERSPECTIVA </b>',
      sortable:true,
      width:300,
      dataIndex:'nombrep'
       }
       ,
    
    {
      text:'<b> DESCRIPCION DE PERSPECTIVA</b>',
      sortable:true,
      flex:1,
      dataIndex:'descripcionp'
    }
      ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                text: '<b>Nueva Perspectiva</b>',
                id: 'btnaddPlan',
                               
                handler:function(){
                  showPerspectivasForm(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                text: '<b>Borrar Perspectiva</b>',
                id: 'btndeletePlan',
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿borrar las perspectivas seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridPerspectivas.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idperspectiva');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_perspectiva.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                   storePerspectiva.load();
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


 var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE PLAN DE ESTRATEGIAS [ Perspectivas ] ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                    items    :[gridPerspectivas],
                    renderTo:'contenido-perspectivas',
                    width:'95%',
                    bbar:[{text:'<center><b><font size="2">AVANCE Y DESEMPE&Ntilde;O S.A. de C.V </font></b><b><font size="1"> &copy; DERECHOS RESERVADOS '+ new Date().getFullYear()+'</font></b></center>'}]
            });   


var Plogout=new Ext.FormPanel({
          id:'idlogout',
          width:125,
          //renderTo:'logout',

          items:[
          {
            xtype:'button',
            text:'<b>Cerrar Session</b>',
            width:125
          }
          ]

        });

   }/*fin del init*/

};/*fin de for_perpectivas*/

Ext.onReady(form_perspectivas.Panel.init,form_perspectivas.Panel);
