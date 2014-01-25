
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





Ext.define('planesModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idplan',type:'int'},
   {name:'idempresa',type:'int'},
   {name:'vision',type:'string'},
   {name:'mision',type:'string'},
   {name:'valores',type:'string'},
   {name:'fechai',type:'string'},
   {name:'fechaf', type:'string'}
   
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


var storePlanes=Ext.create('Ext.data.JsonStore',{
  model:'planesModel',
   proxy:{
                type:'ajax',
                url:'procesos/planes_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});


/*************************************** sm ***************************************************************************/

/************************************* sm ..             ***************************************/    
var smPlanes=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showPlanesForm(0);  
                     formPlanes.getForm().loadRecord(record);
                        }
                    
                    
                    }
               }
               }); //fin del sm


/************************************ LLAMADAS A STORES PRINCIPALES ****************************************************/
storeEmpresas.load();

/*********************** FORMULARIOS **********************************/
 
 function showPlanesForm(accion){
                       formPlanes=Ext.widget('form',{

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
                                 id:'idplan',
                                 colspan:4,
                                 name:'idplan'                  
                                                    
                                },{
                                 xtype:'textareafield',
                                 id:'vision',
                                 fieldLabel:'<b>VISION</b>',
                                 allowBlank:false,
                                 colspan:4,
                                 width:800
                              },
                              {
                                 xtype:'textareafield',
                                 id:'mision',
                                 fieldLabel:'<b>MISION</b>',
                                 allowBlank:false,
                                 colspan:4,
                                 width:800
                              },/*
                                {
                                    xtype      : 'textareafield',
                                    fieldLabel : '<b>VALORES.</b>',
                                    id:'valores',
                                    allowBlank:false,
                                    colspan:4,
                                    width:700
                                   
                              },*/
                          {
                          xtype:'htmleditor',
                          enableSourceEdit:false,
                          enableColors:false,
                          enableLinks:false,
                          fontFamilies:["Arial","Tahoma","Verdana"],
                          id:'valores',
                          autoScroll:false,
                          grow:true,
                          fieldLabel:'<b>VALORES</b>',
                          colspan:4,
                          width:800,
                          //anchor:'60%',
                          allowBlank:false,
                          //height:200

                         } ,                             




                              {
                               xtype: 'datefield',
                              fieldLabel: '<b>Fecha Programada de Inicio</b>',
                              id: 'fechai',
                              format: 'd/m/Y',
                              colspan:2,
                              name: 'fechai',
                              allowBlank: false
                              },
                              {
                               xtype: 'datefield',
                              fieldLabel: '<b>Fecha Programada de Finalizacion</b>',
                              id: 'fechaf',
                              format: 'd/m/Y',
                              colspan:2,
                              name: 'fechaf',
                              allowBlank: false
                              }

                          
                        ],
                        buttons:[
                          {
                            text:'<b>REGISTRAR</b>',
                            scale:'large',
                            iconCls:'icon-OK',
                            width:175,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){
                                        var post_vision=Ext.getCmp('vision').getValue();
                                        var post_mision=Ext.getCmp('mision').getValue();
                                        var post_valores=Ext.getCmp('valores').getValue();
                                        var post_fechai=Ext.util.Format.date(Ext.getCmp('fechai').getValue(),'Y-m-d');
                                        var post_fechaf=Ext.util.Format.date(Ext.getCmp('fechaf').getValue(),'Y-m-d');
                                        var post_id_e=Ext.getCmp('dataempresa').getValue();
                                        
                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_plan.php?ide='+post_id_e+'&vision='+post_vision+'&mision='+post_mision+'&valores='+post_valores+'&inicio='+post_fechai+'&fin='+post_fechaf,
                                                           method:'POST',
                                                           success:function(result,request){

                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                          storePlanes.load({params:{ide:post_id_e}});
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
                                                      var post_idplan=Ext.getCmp('idplan').getValue();

                                                       Ext.Ajax.request({
                                                          url:'procesos/modificar_plan.php?ide='+post_id_e+'&vision='+post_vision+'&mision='+post_mision+'&valores='+post_valores+'&inicio='+post_fechai+'&fin='+post_fechaf+'&idp='+post_idplan,
                                                          method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                      
                                                                                             if (bandera==1) {
                                                                                                          storePlanes.load({params:{ide:post_id_e}});
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
                            scale:'large',
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
                width: 850,
                height:550,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formPlanes
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showUsuarioForm


 


/**************************** DATA GRIDS ******************************************/

var gridPlanes=Ext.create('Ext.grid.Panel',{
 	store:storePlanes,
 	stateful:true,
 	collapsible:false,
 	selModel:smPlanes,
 	multiSelect:true,
 	stateId:'stateGrid',

 	columns:[
        {
          text:'ID_PLAN',
          sortable:false,
          dataIndex:'idplan',
          hidden:true
        },
        {
          text:'ID_EMPRESA',
          sortable:false,
          dataIndex:'idempresa',
          hidden:true
        }        
        ,
        {
 			text:'<b> VISION</b>',
 			sortable:true,
 			flex:1,
      dataIndex:'vision'
 		   }
       ,
 		
 		{
 			text:'<b>MISION</b>',
 			sortable:true,
 			flex:1,
 			dataIndex:'mision'
 		},
    {
      text:'<b>VALORES</b>',
      sortable:true,
      flex:1,
      dataIndex:'valores'
    },
    
    {
      text:'<b>FECHA INICIO</b>',
      sortable:true,
      flex:1,
      dataIndex:'fechai'
    },
 {
      text:'<b>FECHA FIN</b>',
      sortable:true,
      flex:1,
      dataIndex:'fechaf'
    }    
  





        ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                text: '<b>Agregar Plan</b>',
                id: 'btnaddPlan',
                disabled:true,
                
                handler:function(){
                  showPlanesForm(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                text: '<b>Borrar Plan</b>',
                id: 'btndeletePlan',
                disabled:true,
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿Desea borrar los planes seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridPlanes.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idplan');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_plan.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                 var post_ide=Ext.getCmp('dataempresa').getValue();
                                                                 storePlanes.load({params:{ide:post_ide}});
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
                    fieldLabel: '<b>SELECCIONE UNA EMPRESA (*)</b>',
                    labelWidth:200,
                    width:450,
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UNA EMPRESA',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                                               
                         storePlanes.load({params:{ide:newVal}});
                         Ext.getCmp('btnaddPlan').setDisabled(false);
                         Ext.getCmp('btndeletePlan').setDisabled(false);
                         

                     }
          }
                
            },
           

	 gridPlanes
	 ]


});

/***     CONTENEDOR   ***/
    
  var main_panel=new Ext.Panel({
      renderTo:'interfazGestionPlanes',
      iconCls:'icon-userconfig',
     width:'97%',
      collapsible:false,  
        items:[
        panel_central
        ]

  })

});