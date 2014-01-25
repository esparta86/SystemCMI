
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

Ext.define('areasModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idarea',type:'int'},
   {name:'nombrearea',type:'string'}
  ],
  idProperty:'company'


});


Ext.define('unidadModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idunidad',type:'int'},
   {name:'unidad',type:'string'}
  ],
  idProperty:'company'

});


Ext.define('cargoModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idcargo',type:'int'},
   {name:'cargo',type:'string'}
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

var storeUnidad=Ext.create('Ext.data.JsonStore',{
  model:'unidadModel',
  proxy:{
           type:'ajax',
           url:'procesos/unidades_json.php',
           reader:{
               type:'json',
               root:'data'
           }
  }
});


var storeCargos=Ext.create('Ext.data.JsonStore',{
  model:'cargoModel',
   proxy:{
                type:'ajax',
                url:'procesos/cargos_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});


   
var smCargos=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined)
                        {
                        var id=record.get('idcargo');
                        if(id!=0)
                          {
                           showCargoForm(0);  
                           formCargo.getForm().loadRecord(record);
                          }else{
                            Ext.Msg.alert('Warning', "Sin datos."); 
                          }
                        }
                    
                    
                    }
               }
               }); //fin del sm


/************************************ LLAMADAS A STORES PRINCIPALES ****************************************************/
storeEmpresas.load();

/*********************** FORMULARIOS **********************************/
 
 function showCargoForm(accion){
    



                       formCargo=Ext.widget('form',{

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
                                 id:'idcargo',
                                 colspan:4,
                                 name:'idcargo'                  
                                                    
                                },{
                                 xtype:'textfield',
                                 id:'cargo',
                                 name:'cargo',
                                 fieldLabel:'<b>Cargo:</b>',
                                 allowBlank:false,
                                 colspan:4,
                                 width:400
                              },
                              
                                                         
                              

                          
                        ],
                        buttons:[
                          {
                            text:'<b>REGISTRAR</b>',
                            iconCls:'icon-OK',
                            width:150,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){
                                        var post_cargo=Ext.getCmp('cargo').getValue();
                                        var post_idunidad=Ext.getCmp('idunidad').getValue();                                        
                                        
                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_cargo.php?cargo='+post_cargo+'&unidadId='+post_idunidad,
                                                           method:'POST',
                                                           success:function(result,request){

                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                          var idU=Ext.getCmp('idunidad').getValue();
                                                                          storeCargos.load({params:{id:idU}});
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
                                                      var post_idcargo=Ext.getCmp('idcargo').getValue();
                                                       Ext.Ajax.request({
                                                          url:'procesos/modificar_cargo.php?cargo='+post_cargo+'&unidadId='+post_idunidad+'&cargoid='+post_idcargo,
                                                          method:'POST',
                                                                success: function(result,request){
                                                                         var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                      
                                                                                             if (bandera==1) {
                                                                                                          var idU=Ext.getCmp('idunidad').getValue();
                                                                                                          storeCargos.load({params:{id:idU}});
                                                                                                                                                                                   
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
                title: 'REGISTRO Y MODIFICACION DE CARGOS',
                closable: true,
                width: 450,
                height:120,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formCargo
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showUsuarioForm


 


/**************************** DATA GRIDS ******************************************/

var gridCargos=Ext.create('Ext.grid.Panel',{
 	store:storeCargos,
 	stateful:true,
 	collapsible:false,
 	selModel:smCargos,
 	multiSelect:true,
 	stateId:'stateGrid',
  width:700,

 	columns:[
        {
          text:'IDCARGO',
          sortable:false,
          dataIndex:'idcargo',
          hidden:true
        },
       
 		
 		{
 			text:'<b>CARGO</b>',
 			sortable:true,
 			flex:1,
 			dataIndex:'cargo'
 		}

        ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                text: '<b>Agregar cargo</b>',
                id: 'btnaddPlan',
                disabled:true,
                
                handler:function(){
                  showCargoForm(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                text: '<b>Borrar cargo</b>',
                id: 'btndeletePlan',
                disabled:true,
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿Desea los usuarios seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridCargos.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idcargo');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_cargo.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                          var idU=Ext.getCmp('idunidad').getValue();
                                                                          storeCargos.removeAll();
                                                                          storeCargos.load({params:{id:idU}});                                                                       
                                                                       
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
                    fieldLabel: '<b>Empresa </b>',
                    labelWidth:200,
                    width:550,
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'seleccione una empresa',
                    listeners: 
                    {
                         change: function(field, newVal, oldVal) 
                         {
                          storeAreas.clearFilter();
                          Ext.getCmp('idarea').clearValue();
                          storeAreas.load({params:{ide:newVal}});
                          storeUnidad.clearFilter();
                          Ext.getCmp('idunidad').clearValue();
                          storeCargos.removeAll();
                         }
                     }
                
            },
            {
                   xtype:'combo',
                   id:'idarea',
                   store:storeAreas,
                   displayField:'nombrearea',
                   forceSelection:false,
                   triggerAction:'all',
                   queryMode:'local',
                   disabled:false,
                   selectOnFocus:false,
                   valueField:'idarea',
                   hiddenName:'idempresa',
                   fieldLabel:'<b>Area </b>',
                   labelWidth:200,
                   width:550,
                   allowBlank:false,
                   emptyText:'Seleccione area de empresa',
                   listeners:{
                          change:function(field,newVal,oldVal)
                          {
                          storeUnidad.clearFilter();
                          Ext.getCmp('idunidad').clearValue();                          
                          storeUnidad.load({params:{area:newVal}});
                          storeCargos.removeAll();

                          }
                   }
            },
                       {
                               xtype:'combo',
                               id:'idunidad',
                              store:storeUnidad,
                               displayField:'unidad',
                               forceSelection:false,
                               triggerAction:'all',
                               queryMode:'local',
                               disabled:false,
                               selectOnFocus:false,
                               valueField:'idunidad',
                               hiddenName:'idunidad',
                               fieldLabel:'<b>Unidad organizativa</b>',
                               labelWidth:200,
                               width:550,
                               allowBlank:false,
                               emptyText:'seleccione unidad organizativa',
                               listeners:{
                                      change:function(field,newVal,oldVal)
                                      {
                                      storeCargos.load({params:{id:newVal}});
                                      Ext.getCmp('btnaddPlan').setDisabled(false);
                                      Ext.getCmp('btndeletePlan').setDisabled(false);                                        
            
                                      }
                               }
                        },    
           

	 gridCargos
	 ]


});

/***     CONTENEDOR   ***/
    
  var main_panel=new Ext.Panel({
      renderTo:'interfazGestionPlanes',
      iconCls:'icon-userconfig',
     width:'97%',
      collapsible:false, 
      title:'Administracion  de cargos por empresa' ,
        items:[
        panel_central
        ]

  })

});