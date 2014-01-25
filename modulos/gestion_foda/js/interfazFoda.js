Ext.ns('form_foda');

form_foda.Panel={
   init:function()
   {
    Ext.form.Field.prototype.msgTarget='side';

/**model**/
Ext.define('perspectivaModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idperspectiva',type:'int'},
   {name:'perspectiva',type:'string'}
  ],
  idProperty:'company'
});


Ext.define('FactoresModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idfoda',type:'int'},
   {name:'descripfoda',type:'string'}
  ],
  idProperty:'company'
});




/***** store ******/

var storePerspectiva=Ext.create('Ext.data.JsonStore',{
  model:'perspectivaModel',
   proxy:{
                type:'ajax',
                url:'procesos/perspectivas_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});


var storeFortalezas=Ext.create('Ext.data.JsonStore',{
  model:'FactoresModel',
   proxy:{
                type:'ajax',
                url:'procesos/foda_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});



var storeDebilidades=Ext.create('Ext.data.JsonStore',{
  model:'FactoresModel',
   proxy:{
                type:'ajax',
                url:'procesos/foda_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});


var storeOportunidades=Ext.create('Ext.data.JsonStore',{
  model:'FactoresModel',
   proxy:{
                type:'ajax',
                url:'procesos/foda_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});


var storeAmenazas=Ext.create('Ext.data.JsonStore',{
  model:'FactoresModel',
   proxy:{
                type:'ajax',
                url:'procesos/foda_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});

var smFortalezas=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showFactoresForm(0,1);  
                     formFactores.getForm().loadRecord(record);
                        }
                    }
               }
               }); //fin del sm

var smDebilidades=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showFactoresForm(0,2);  
                     formFactores.getForm().loadRecord(record);
                        }
                    }
               }
               }); //fin del sm

var smOportunidades=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showFactoresForm(0,4);  
                     formFactores.getForm().loadRecord(record);
                        }
                    }
               }
               }); //fin del sm

var smAmenazas=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showFactoresForm(0,3);  
                     formFactores.getForm().loadRecord(record);
                        }
                    }
               }
               }); //fin del sm


/**************** formularios *************************/

 function showFactoresForm(accion,tipo){
                       formFactores=Ext.widget('form',{

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
                                 id:'idfoda',
                                 colspan:4,
                                 name:'idfoda'                  
                                                    
                                },
                                {
                                  html:'<img src="../../recursos/img/foda2.png" width="75" height="75">',
                                  colspan:2,
                                  border:false
                                },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                    
                                },                                
                               
                              {
                                 xtype:'textareafield',
                                 id:'descripfoda',
                                 fieldLabel:'<b>Descripcion</b>',
                                 labelWidth:100,
                                 allowBlank:false,
                                 colspan:4,
                                 width:600
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
                                        var post_descripcion=Ext.getCmp('descripfoda').getValue();
                                        var post_perspectiva=Ext.getCmp('dataperspectiva').getValue();
                                        var post_tipo=tipo;
                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_elementofoda.php?idp='+post_perspectiva+'&tipo='+post_tipo+'&descrip='+post_descripcion,
                                                           method:'POST',
                                                           success:function(result,request){
                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;
                                                                    if (bandera==1) {
                                                                        
                                                                        if(post_tipo==1){
                                                                            storeFortalezas.load({params:{id:post_perspectiva,tip:1}});
                                                                        }
                                                                        if(post_tipo==2){
                                                                            storeDebilidades.load({params:{id:post_perspectiva,tip:2}});   
                                                                        }
                                                                        if(post_tipo==3){
                                                                            storeAmenazas.load({params:{id:post_perspectiva,tip:3}});
                                                                        }
                                                                        if(post_tipo==4){
                                                                            storeOportunidades.load({params:{id:post_perspectiva,tip:4}}); 
                                                                        }

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
                                                      var post_idfoda=Ext.getCmp('idfoda').getValue();
                                                       Ext.Ajax.request({
                                                          url:'procesos/modificar_elementofoda.php?descrip='+post_descripcion+'&idfoda='+post_idfoda,
                                                          method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                                                             if (bandera==1) {

                                                                                                          if(post_tipo==1){
                                                                                                              storeFortalezas.load({params:{id:post_perspectiva,tip:1}});
                                                                                                          }
                                                                                                          if(post_tipo==2){
                                                                                                              storeDebilidades.load({params:{id:post_perspectiva,tip:2}});   
                                                                                                          }
                                                                                                          if(post_tipo==3){
                                                                                                              storeAmenazas.load({params:{id:post_perspectiva,tip:3}});
                                                                                                          }
                                                                                                          if(post_tipo==4){
                                                                                                              storeOportunidades.load({params:{id:post_perspectiva,tip:4}}); 
                                                                                                          }
                                                                                                          

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
                title: 'REGISTRO Y MODIFICACION DEL FLOA',
                closable: true,
                width: 650,
                height:300,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formFactores
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showUsuarioForm






storePerspectiva.load();

var gridFortalezas=Ext.create('Ext.grid.Panel',{
  store:storeFortalezas,
  stateful:true,
  collapsible:false,
  selModel:smFortalezas,
  multiSelect:true,
  stateId:'stateGrid',
  width:500,
  height:300,
  title:'Fortalezas',

  columns:[
        {
          text:'IDFODA',
          sortable:false,
          dataIndex:'idfoda',
          hidden:true
        },       
          
    {
      text:'<b>FORTALEZAS</b>',
      sortable:true,
      flex:1,
      dataIndex:'descripfoda'
    }
      ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                                              
                handler:function(){
                  showFactoresForm(1,1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿Eliminar Fortalezas seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridFortalezas.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idfoda');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_elementofoda.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                  var post_perspectiva=Ext.getCmp('dataperspectiva').getValue();
                                                                  storeFortalezas.load({params:{id:post_perspectiva,tip:1}}); 
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

var gridDebilidades=Ext.create('Ext.grid.Panel',{
  store:storeDebilidades,
  stateful:true,
  collapsible:false,
  selModel:smDebilidades,
  multiSelect:true,
  stateId:'stateGrid',
  width:500,
  height:300,
  title:'Limitaciones',

  columns:[
        {
          text:'IDFODA',
          sortable:false,
          dataIndex:'idfoda',
          hidden:true
        },       
          
    {
      text:'<b>LIMITACIONES</b>',
      sortable:true,
      flex:1,
      dataIndex:'descripfoda'
    }
      ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                handler:function(){
                  showFactoresForm(1,2);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿borrar limitaciones seleccionadas?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridDebilidades.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idfoda');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_elementofoda.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                  var post_perspectiva=Ext.getCmp('dataperspectiva').getValue();
                                                                  storeDebilidades.load({params:{id:post_perspectiva,tip:2}});                                                                    
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


var gridOportunidades=Ext.create('Ext.grid.Panel',{
  store:storeOportunidades,
  stateful:true,
  collapsible:false,
  selModel:smOportunidades,
  multiSelect:true,
  stateId:'stateGrid',
  width:500,
  height:300,
  title:'Oportunidades',

  columns:[
        {
          text:'IDFODA',
          sortable:false,
          dataIndex:'idfoda',
          hidden:true
        },       
          
    {
      text:'<b>OPORTUNIDADES</b>',
      sortable:true,
      flex:1,
      dataIndex:'descripfoda'
    }
      ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                               
                handler:function(){
                  showFactoresForm(1,4);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿borrar oportunidades seleccionadas?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridOportunidades.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idfoda');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_elementofoda.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                  var post_perspectiva=Ext.getCmp('dataperspectiva').getValue();
                                                                  storeOportunidades.load({params:{id:post_perspectiva,tip:4}});                                                                    
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

var gridAmenazas=Ext.create('Ext.grid.Panel',{
  store:storeAmenazas,
  stateful:true,
  collapsible:false,
  selModel:smAmenazas,
  multiSelect:true,
  stateId:'stateGrid',
  width:500,
  height:300,
  title:'Amenazas',

  columns:[
        {
          text:'IDFODA',
          sortable:false,
          dataIndex:'idfoda',
          hidden:true
        },       
          
    {
      text:'<b>AMENAZAS</b>',
      sortable:true,
      flex:1,
      dataIndex:'descripfoda'
    }
      ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                               
                handler:function(){
                  showFactoresForm(1,3);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿borrar amenazas seleccionadas?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridAmenazas.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idfoda');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_elementofoda.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                  var post_perspectiva=Ext.getCmp('dataperspectiva').getValue();
                                                                  storeAmenazas.load({params:{id:post_perspectiva,tip:3}});                                                                    
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

panelMatrizFoda=Ext.create('Ext.panel.Panel', {
                                      width: '100%',
                                      defaults: {
                                          
                                              frame:false,
                                              //height: 25,
                                              border: false,
                                              style: 'margin: 3px 3px 3px 3px;',
                                              colspan:1,

                                      },
                                     layout: {
                                      type: 'table',
                                      columns: 3, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    });  

panelMatrizFoda.add(
     {
                            
                            width: 150,
                            html: '<font class="signi"> <br><br><br><br>Interno </font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                            height:300,
                            border:false,
                            bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'padding': '10px',
                                      'text-shadow': '1px 1px 1px #777'
                                      
                                    }                            



    },
    gridFortalezas,
    gridDebilidades,

 {
                            
                            width: 150,
                            html: '<font class="signi"><br><br><br><br>Externo </font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                            height:300,
                            border:false,
                            bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'padding': '10px',
                                      'text-shadow': '1px 1px 1px #777'
                                      
                                    }                            



    },
    gridOportunidades,
    gridAmenazas


  );




 var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE PLAN DE ESTRATEGIAS [ Analisis FLOA ] ' ,
                    border:false,
                    bodyStyle: 'padding:20px;',
                    defaults:{
                      padding:20
                    },
                    items    :[
                       {
                
                    xtype : 'combo',
                    id : 'dataperspectiva',
                    store : storePerspectiva,
                    displayField:'perspectiva',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idperspectiva',
                    hiddenName : 'idperspectiva',
                    fieldLabel: '<b>Perspectiva (*)</b>',
                    labelWidth:200,
                    width:500,
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'Seleccione una perspectiva',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                             storeFortalezas.load({params:{id:newVal,tip:1}});
                             storeDebilidades.load({params:{id:newVal,tip:2}});
                             storeAmenazas.load({params:{id:newVal,tip:3}});
                             storeOportunidades.load({params:{id:newVal,tip:4}});
                            
                             }
                         }
                
                },

                   panelMatrizFoda  ],
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

Ext.onReady(form_foda.Panel.init,form_foda.Panel);
