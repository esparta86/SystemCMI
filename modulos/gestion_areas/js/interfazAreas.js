
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


Ext.define('areasModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idarea',type:'int'},
   {name:'nombrearea',type:'string'}
  ],
  idProperty:'company'


});

Ext.define('unidadesModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idunidad',type:'int'},
   {name:'idarea',type:'int'},
   {name:'nombrearea',type:'string'},
   {name:'unidad',type:'string'}
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


var storeAreas=Ext.create('Ext.data.JsonStore',{
  model:'areasModel',
   proxy:{
                type:'ajax',
                url:'procesos/areas_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});

var storeUnidades=Ext.create('Ext.data.JsonStore',{
  model:'unidadesModel',
   proxy:{
                type:'ajax',
                url:'procesos/unidades_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});

/*************************************** sm ***************************************************************************/

/************************************* sm ..             ***************************************/    
var smAreas=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showAreasForm(0);  
                     formAreas.getForm().loadRecord(record);
                        }
                    
                    
                    }
               }
               }); //fin del sm

var smUnidades=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showUnidadesForm(0);  
                     formUnidades.getForm().loadRecord(record);
                        }
                    
                    
                    }
               }
               }); //fin del sm


/************************************ LLAMADAS A STORES PRINCIPALES ****************************************************/
storeEmpresas.load();

/*********************** FORMULARIOS **********************************/


 function showUnidadesForm(accion){
                       formUnidades=Ext.widget('form',{

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
                                 id:'idunidad',
                                 colspan:4,
                                 name:'idunidad'                  
                                                    
                                },
                                 {
                                 xtype : 'combo',
                                    id : 'idarea',
                                   store:storeAreas,
                                    displayField:'nombrearea',
                                    forceSelection : false,
                                    triggerAction : 'all',
                                    queryMode:'local',
                                    disabled:false,
                                    selectOnFocus : false,
                                    valueField:'idarea',
                                    hiddenName : 'idarea',
                                    fieldLabel: 'Area (*)',
                                    width:500,
                                    colspan:4,
                                    allowBlank: false,
                                    emptyText : 'Seleccione un area'
                                 },
                                {
                                 xtype:'textfield',
                                 id:'unidad',
                                 fieldLabel:'<b>Nombre de la unidad </b>',
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
                                        var post_idarea=Ext.getCmp('idarea').getValue();
                                        var post_unidad=Ext.getCmp('unidad').getValue();


                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_unidad.php?idarea='+post_idarea+'&unidad='+post_unidad,
                                                           method:'POST',
                                                           success:function(result,request){

                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                          var post_idempresa=Ext.getCmp('dataempresa').getValue();
                                                                          storeUnidades.load({params:{ide:post_idempresa}});
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
                                                      var post_idunidad=Ext.getCmp('idunidad').getValue();
                                                       Ext.Ajax.request({
                                                                url:'procesos/modificar_unidad.php?idarea='+post_idarea+'&unidad='+post_unidad+'&idu='+post_idunidad,
                                                                method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                      
                                                                                             if (bandera==1) {
                                                                                                var post_idempresa=Ext.getCmp('dataempresa').getValue();
                                                                                                storeUnidades.load({params:{ide:post_idempresa}});                                                                                                          
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
                title: 'REGISTRO Y MODIFICACION DE UNIDADES',
                closable: true,
                width: 550,
                height:150,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formUnidades
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showAreasForm
 
 function showAreasForm(accion){
                       formAreas=Ext.widget('form',{

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
                                 id:'idarea',
                                 colspan:4,
                                 name:'idplan'                  
                                                    
                                },{
                                 xtype:'textfield',
                                 id:'nombrearea',
                                 fieldLabel:'<b>Nombre del area </b>',
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
                                        var post_idempresa=Ext.getCmp('dataempresa').getValue();
                                        var post_area=Ext.getCmp('nombrearea').getValue();
                                        
                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_area.php?idempresa='+post_idempresa+'&area='+post_area,
                                                           method:'POST',
                                                           success:function(result,request){

                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                          storeAreas.load({params:{ide:post_idempresa}});
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
                                                      var post_idarea=Ext.getCmp('idarea').getValue();
                                                       Ext.Ajax.request({
                                                                url:'procesos/modificar_area.php?idempresa='+post_idempresa+'&area='+post_area+'&idarea='+post_idarea,
                                                                method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                      
                                                                                             if (bandera==1) {
                                                                                                          storeAreas.load({params:{ide:post_idempresa}});
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
                title: 'REGISTRO Y MODIFICACION DE PLANES ESTRATEGICOS',
                closable: true,
                width: 550,
                height:100,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formAreas
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showAreasForm


 


/**************************** DATA GRIDS ******************************************/

var gridAreas=Ext.create('Ext.grid.Panel',{
  store:storeAreas,
 	stateful:true,
 	collapsible:false,
 	selModel:smAreas,
 	multiSelect:true,
 	stateId:'stateGrid',
  title:'Areas de la empresa',
  width:600,
  height:400,
  border:true,
 	columns:[
        {
          text:'ID_AREA',
          sortable:false,
          dataIndex:'idarea',
          hidden:true
        },
 		{
 			text:'<b> AREAS</b>',
 			sortable:true,
 			flex:1,
 			dataIndex:'nombrearea'
 		}
        ],
        tbar:[
            '->','-',
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                id: 'btnaddArea',
                disabled:true,
                
                handler:function(){
                  showAreasForm(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                id: 'btndeleteArea',
                disabled:true,
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿borrar las areas seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridAreas.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idarea');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_areas.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                 var post_ide=Ext.getCmp('dataempresa').getValue();
                                                                 storeAreas.load({params:{ide:post_ide}});
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


var gridUnidades=Ext.create('Ext.grid.Panel',{
  store:storeUnidades,
  stateful:true,
  collapsible:false,
  selModel:smUnidades,
  multiSelect:true,
  stateId:'stateGrid',
  title:'Unidades de la empresa',
  width:600,
  height:400,
  border:true,
  columns:[
        {
          text:'ID_UNIDAD',
          sortable:false,
          dataIndex:'idunidad',
          hidden:true
        },
{
          text:'IDAREA',
          sortable:false,
          dataIndex:'idarea',
          hidden:true
        },

    {
      text:'<b>AREA</b>',
      sortable:true,
      flex:1,
      dataIndex:'nombrearea'
    },
    {
      text:'<b> UNIDAD</b>',
      sortable:true,
      flex:1,
      dataIndex:'unidad'
    }
        ],
        tbar:[
            '->','-',
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                id: 'btnaddUnidad',
                disabled:true,
                
                handler:function(){
                  showUnidadesForm(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                id: 'btndeleteUnidad',
                disabled:true,
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿Borrar las unidades seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridUnidades.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idunidad');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_unidad.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                 var post_ide=Ext.getCmp('dataempresa').getValue();
                                                                 storeUnidades.load({params:{ide:post_ide}});
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
panelGrid=Ext.create('Ext.panel.Panel', {
                                      width: '100%',
                                      defaults: {
                                          
                                              frame:false,
                                              border: false,
                                              style: 'margin: 3px 50px 3px 3px;',
                                              colspan:1,

                                      },
                                     layout: {
                                      type: 'table',
                                      columns: 2, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    });

panelGrid.add(gridAreas,gridUnidades);




var panel_central=new Ext.Panel({
	 title:'Gestion de area y unidades de la empresa',
	 collapsible:false,
   //iconCls:'icon-datos',
   width:'100%',
   renderTo:'interfazGestionAreas',
   defaults:{
      padding:20
   },
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
                    fieldLabel: '<b>SELECCIONE UNA EMPRESA (*)</b>',
                    labelWidth:200,
                    width:450,
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UNA EMPRESA',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                                               
                         storeAreas.load({params:{ide:newVal}});
                         storeUnidades.load({params:{ide:newVal}});
                         Ext.getCmp('btnaddArea').setDisabled(false);
                         Ext.getCmp('btndeleteArea').setDisabled(false);
                         Ext.getCmp('btnaddUnidad').setDisabled(false);
                         Ext.getCmp('btndeleteUnidad').setDisabled(false);                         


                         

                     }
          }
                
            },
           

	 panelGrid
	 ]


});

/***     CONTENEDOR   ***/

 




});