Ext.ns('form_iniciativa');

form_iniciativa.Panel={
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


Ext.define('involucradasModel',{
  extend:'Ext.data.Model',
  fields:[
    {name:'idunidad',type:'int'},
    {name:'unidad',type:'string'}
  
  ],
  idProperty:'company'
});


Ext.define('objetivosModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idobj',type:'int'},
   {name:'objE',type:'string'}
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
   {name:'unidad',type:'string'}
  ],
  idProperty:'company'
});


  Ext.define('IndicadoresModel',{
      extend:'Ext.data.Model',
      fields:[
        {name:'indicadorid',type:'int'},
        {name:'indicador', type:'string'}
       ],
       idProperty:'company'
  });

  Ext.define('iniciativaModel',{
    extend:'Ext.data.Model',
    fields:[
     {name:'idiniciativa', type:'int'},
     {name:'correlativoI',type:'int'},
     {name:'iniciativa', type:'string'},
     {name:'idarea', type:'int'},
     {name:'idunidad', type:'int'},
     {name:'unidadText', type:'string'}
    ],
    idProperty:'company'
  });




/***** store ******/

var storeIndicadores=Ext.create('Ext.data.JsonStore',{
  model:'IndicadoresModel',
   proxy:{
                type:'ajax',
                url:'procesos/indicador_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});





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


var storeObjetivos=Ext.create('Ext.data.JsonStore',{
  model:'objetivosModel',
   proxy:{
                type:'ajax',
                url:'procesos/objetivos_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});

var storeArea=Ext.create('Ext.data.JsonStore',{
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


var storeInvolucrados1=Ext.create('Ext.data.JsonStore',{
 model:'involucradasModel',
   proxy:{
              type:'ajax',
              url:'procesos/involucradas_json.php',
              reader:{
                   type:'json',
                   root:'data'
              }
         }
});

var storeIndicador=Ext.create('Ext.data.JsonStore',{
  model:'IndicadorModel',
   proxy:{
                type:'ajax',
                url:'procesos/indicadores_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});




var storeIniciativa=Ext.create('Ext.data.JsonStore',{
   model:'iniciativaModel',
   proxy:{
           type:'ajax',
           url:'procesos/iniciativa_json.php',
           reader:{
              type:'json',
              root:'data'
           }
   }
});

 
storeUnidad=Ext.create('Ext.data.JsonStore',{
 model:'involucradasModel',
  proxy:{
           type:'ajax',
           url:'procesos/involucradas_json.php',
           reader:{
                type:'json',
                root:'data'
           }
        }

});

var storeInvolucrados2=Ext.create('Ext.data.JsonStore',{
 model:'involucradasModel',
 proxy:{
           type:'ajax',
           url:'procesos/unidadesActuales_json.php',
           reader:{
                type:'json',
                root:'data'
           }
        } 

});

var smIniciativas=new Ext.selection.CheckboxModel({
       listeners:{
              selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];
                    if(record!=undefined){
                       var idi=record.get('idiniciativa');
                       if(idi!=0){
                        storeUnidad.removeAll();
                        storeUnidad.load({params:{iniciativaid:idi}});
                        storeInvolucrados2.removeAll();
                        storeInvolucrados2.load({params:{iniciativaid:idi}});
                        formIniciativas.getForm().loadRecord(record);
                       }

                    }
              }
       }
});

var smPerspectivas=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     var base=record.get('checkbase');
                     var direcc=record.get('direccion');
                     var idIn=record.get('idindicador');
                    if(idIn!=0){
                     formIndicadores.getForm().loadRecord(record);
                     if(base==1){
                      Ext.getCmp('lineacheck').setValue(true);
                     }else{
                      Ext.getCmp('lineacheck').setValue(false);
                         Ext.getCmp('lineabase').setDisabled(true);
                     }
                     if(direcc==-1){
                      Ext.getCmp('direccion').setValue({direccion:'-1'});
                     }
                     if(direcc==1){
                      Ext.getCmp('direccion').setValue({direccion:'1'});
                     }
                   }else{
                Ext.MessageBox.show({
                                     title:'Sin registros',
                                     msg:'No existen datos para mostrar',
                                     width:300,
                                     buttons:Ext.MessageBox.OK,
                                     icon: Ext.MessageBox.ERROR
                                   });                    
                   }
                      }
                    }
               }
           }); //fin del sm



 function changecolor(val) {
        if (val == '(+)') {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val == '(-)') {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }


var gridunidades=Ext.create('Ext.grid.Panel',{
    viewConfig:{
    plugins:{
       ptype: 'gridviewdragdrop',
      dragGroup: 'gridunidadesDDGroup',
      dropGroup: 'gridunidadesInvolucradasDDGroup'

     },    
     listeners:{
         drop: function(node, data, dropRec, dropPosition) {
                    var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('idunidad') : ' on empty view';
                    //console.log(dropRec.get('idunidad'));
                   Ext.example.msg("unidad no seleccionada como involucrada", 'no seleccionada ' + data.records[0].get('idunidad') + dropOn);

                }

         }
  },
  store: storeUnidad,
  stripeRows: true,
  width:500,
  height:300,
  border:true,
  title:'Unidades',
 columns:[
      {
        text:'IDUNIDAD',
        sortable: false,
        dataIndex:'idunidad',
        hidden:true
      },
      {
        text:'<B>UNIDAD</B>',
        sortable:true,
        dataIndex:'unidad',
        flex:1
      }
   
    ]

});


var gridunidadesInvolucradas=Ext.create('Ext.grid.Panel',{
    viewConfig:{
    plugins:{
       ptype: 'gridviewdragdrop',
       dragGroup: 'gridunidadesInvolucradasDDGroup',
       dropGroup: 'gridunidadesDDGroup'

     },    
     listeners:{
         drop: function(node, data, dropRec, dropPosition) {
                    var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('idunidad') : ' on empty view';
                    Ext.example.msg("Unidad seleccionada", 'involucrada ' + data.records[0].get('idunidad') + dropOn);
                    
                }

         }
  },
  store: storeInvolucrados2,
  stripeRows: true,
  width:500,
  height:300,
  border:true,
  title:'Unidades Involucradas' ,
 columns:[
 {
        text:'IDUNIDAD',
        sortable: false,
        dataIndex:'idunidad',
        hidden:true
      },
      {
        text:'<B>UNIDAD</B>',
        sortable:true,
        dataIndex:'unidad',
        flex:1
      }
  

    ]

});
/**************** formularios *************************/

/*panel=Ext.create('Ext.panel.Panel', {
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
                                      columns: 2, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    }); 
panel.add(gridunidades,gridunidadesInvolucradas);*/



  formIniciativas=Ext.widget('form',{

                      layout:{
                               type:'table',
                               columns:6,
                               tdAttrs:{
                                valign:'middle'
                               }
                        },
                        fieldDefaults: {
                                    //labelWidth: 150,
                                    labelStyle: 'font-weight:bold'
                                },
                        defaults:{
                            frame:false,
                            border: false,
                            //colspan:2,
                            style: 'margin: 2px 10px 5px 10px;'

                        },
                        items:[
                                {
                                 xtype:'hiddenfield',
                                 id:'idiniciativa',
                                 colspan:6,
                                 name:'idiniciativa',
                                 value:0                 
                                                    
                                },
                                {
                                  html:'<img src="../../recursos/img/iniciativaE.png" width="100" height="75">',
                                  colspan:2,
                                  border:false
                                },
                                {
                                 xtype:'hiddenfield',
                                 colspan:4
                                                    
                                }, 
                                {
                                xtype: 'numberfield',
                                id: 'correlativoI',
                                colspan:4,
                                width:400,
                                fieldLabel:'<b>Correlativo</b>',
                                labelWidth:200,
                                name: 'correlativoI',
                                maxValue: 20,
                                minValue: 1,
                                allowBlank: false
                                
                              },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                                                    
                                },                              
                                                            
                              {
                                 xtype:'textareafield',
                                 id:'iniciativa',
                                 fieldLabel:'<b>Iniciativas</b>',
                                 labelWidth:200,
                                 allowBlank:false,
                                 colspan:4,
                                 width:600
                              },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                                                    
                                },                             
                            
                            {
                                  xtype : 'combo',
                                  id : 'idarea',
                                 store : storeArea,
                                  displayField:'nombrearea',
                                 forceSelection : false,
                                 triggerAction : 'all',
                                 queryMode:'local',
                                 disabled:false,
                                 selectOnFocus : false,
                                 valueField:'idarea',
                                 hiddenName : 'idarea',
                                 fieldLabel: '<b>Area (*)</b>',
                                 labelWidth:200,
                                 width:600,
                                 colspan:4,
                                 allowBlank: false,
                                 emptyText : 'Seleccione un Area',
                                 listeners: {
                                             change: function(field, newVal, oldVal) {
                                                         storeUnidades.load({params:{ida:newVal}})
                                                           }
                                                       }
                                              
                            },
                               {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                                                    
                                },                           
                              
                           
                            {
                                  xtype : 'combo',
                                  id : 'idunidad',
                                 store : storeUnidades,
                                  displayField:'unidad',
                                 forceSelection : false,
                                 triggerAction : 'all',
                                 queryMode:'local',
                                 disabled:false,
                                 selectOnFocus : false,
                                 valueField:'idunidad',
                                 hiddenName : 'idunidad',
                                 fieldLabel: '<b>Unidad Organizativa</b>',
                                 labelWidth:200,
                                 width:600,
                                 colspan:4,
                                 allowBlank: false,
                                 emptyText : 'Seleccione una unidad',
                                 listeners: {
                                             change: function(field, newVal, oldVal) {
                                                         
                                                           }
                                                       }
                                              
                            },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                }
                                ,                            
                            {
                              padding:10,
                              html:'<b>Unidades involucradas:</b>',
                              colspan:6

                            },
                            gridunidades,
                            gridunidadesInvolucradas

                                                                                                                                                                     

                        
                        ],

                        buttons:[
                        {
                          text:'<b>Limpiar Formulario</b>',
                          width:175,
                             handler:function(){
                                  this.up('form').getForm().reset();
                                  storeInvolucrados2.removeAll();
                                  storeUnidad.load({params:{iniciativaid:0}});
                             }
                        },                       

                          {
                            text:'<b>Registrar</b>',
                            iconCls:'icon-OK',
                            width:175,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){
                                      
                                      var unidadesinvolucradas=new Array();
                                      
                                      storeInvolucrados2.each(function(record){
                                        var idunidad=record.get('idunidad');
                                        unidadesinvolucradas.push(idunidad);
                                      });

                                       var accion=Ext.getCmp('idiniciativa').getValue();
                                       var post_correlativo=Ext.getCmp('correlativoI').getValue();
                                       var post_iniciativa=Ext.getCmp('iniciativa').getValue();
                                       var post_idunidad=Ext.getCmp('idunidad').getValue();
                                       var post_idunidades=Ext.encode(unidadesinvolucradas);
                                       var post_idindicador=Ext.getCmp('indicadorid').getValue();
                                       var post_idarea=Ext.getCmp('idarea').getValue();


                                       if(accion==0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_iniciativa.php?correlativo='+post_correlativo+'&iniciativa='+post_iniciativa+'&idunidad='+post_idunidad+'&idinvolucradas='+post_idunidades+'&idindicador='+post_idindicador+'&idarea='+post_idarea,
                                                           method:'POST',
                                                           success:function(result,request){
                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;
                                                                    if (bandera==1) {
                                                                        var idindicador=Ext.getCmp('indicadorid').getValue();
                                                                        storeIniciativa.load({params:{idI:idindicador}});

                                                                        storeInvolucrados2.removeAll();
                                                                        storeUnidad.load({params:{iniciativaid:0}}); 
                                                                        storeUnidades.removeAll();                                                                     

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
                                                      var post_idiniciativa=Ext.getCmp('idiniciativa').getValue();
                                                       Ext.Ajax.request({
                                                       url:'procesos/modificar_iniciativa.php?correlativo='+post_correlativo+'&iniciativa='+post_iniciativa+'&idunidad='+post_idunidad+'&idinvolucradas='+post_idunidades+'&idindicador='+post_idindicador+'&idarea='+post_idarea+'&iniciativaid='+post_idiniciativa,
                                                       method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                                                             if (bandera==1) {
                                                                                                        var idindicador=Ext.getCmp('indicadorid').getValue();
                                                                                                        storeIniciativa.load({params:{idI:idindicador}});

                                                                                                        storeInvolucrados2.removeAll();
                                                                                                        storeUnidad.load({params:{iniciativaid:0}}); 
                                                                                                        storeUnidades.removeAll();                                                                                                        

                                                                                                                                                                                  
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
                               

                                        
                              }//fin de valid
                              else{
                                Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                              }

                            }//fin del handler


                          }
                        

                        ]


                     });





storePerspectiva.load();
storeInvolucrados1.load({params:{iniciativaid:0}});
storeUnidad.load({params:{iniciativaid:0}});
storeInvolucrados2.load({params:{iniciativaid:0}});
storeArea.load();
//storeAnios.load();



var gridIniciativa=Ext.create('Ext.grid.Panel',{
  store:storeIniciativa,
  stateful:true,
  collapsible:false,
  selModel:smIniciativas,
  multiSelect:true,
  stateId:'stateGrid',
  title:'Iniciativas Estrategicas',
  height:200,
  width:'95%',
  columns:[
        {
          text:'IDINICIATIVA',
          sortable:false,
          dataIndex:'idiniciativa',
          hidden:true
        },
        {
          text:'IDAREA',
          sortable:false,
          dataIndex:'idarea',
          hidden:true
        },
        {
          text:'IDUNIDAD',
          sortable:false,
          dataIndex:'idunidad',
          hidden:true
        },
        {
          text:'<b> CORRELATIVO </b>',
          sortable:true,
          width:125,
          dataIndex:'correlativoI'
           }
       ,
        {
        text:'<b>INICIATIVA</b>',
        sortable:true,
        flex:1,
        dataIndex:'iniciativa'
        },
        {
          text:'<b>UNIDAD RESPONSABLE</b>',
          sortable:false,
          flex:1,
          dataIndex:'unidadText'
        }
      ],
        tbar:[
            '->','-',
                         
                    {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                id: 'btndeletePlan',
                handler:function(){
                      Ext.MessageBox.confirm('Borrado de Iniciativas','¿borrar los seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridIniciativa.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idiniciativa');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_iniciativa.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                    var i=Ext.getCmp('indicadorid').getValue();
                                                                      storeIniciativa.load({params:{idI:i}}); 
                                                                      formIniciativas.getForm().reset();
                                                                      storeUnidad.removeAll();
                                                                      storeUnidad.load({params:{iniciativaid:0}});
                                                                      storeInvolucrados2.removeAll();
                                                                      storeInvolucrados2.load({params:{iniciativaid:0}});

                                                                  }
                                                                  if (bandera==2||bandera==3) {

                                                                       Ext.MessageBox.show({
                                                                              title:'Sin Exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });//fin de msj

                                                                  }


                                            }
                                        });
                                        
                                      });
                                    }//fin del yes

                      });


                }//fin del handler

                
              }


            ]


  });




 var panel_medio=new Ext.Panel({
  id:'panelmedio',
  name:'panelmedio',
  width:'100%',
  collapsible:false,
  border:false,
    items:[
                                 {
                                                  xtype : 'combo',
                                                  id : 'idperspectiva',
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
                                                  width:700,
                                                  colspan:4,
                                                  padding:10,
                                                  allowBlank: false,
                                                  emptyText : 'Seleccione una perspectiva',
                                                  listeners: {
                                                 change: function(field, newVal, oldVal) {
                                                          storeObjetivos.clearFilter();
                                                          Ext.getCmp('idobj').clearValue();
                                                           storeObjetivos.load({params:{idp:newVal}});
                                                           }
                                                       }
                                              
                                              } , 
                                           {
                                                  xtype : 'combo',
                                                  id : 'idobj',
                                                  store : storeObjetivos,
                                                  displayField:'objE',
                                                  forceSelection : false,
                                                  triggerAction : 'all',
                                                  queryMode:'local',
                                                  disabled:false,
                                                  selectOnFocus : false,
                                                  valueField:'idobj',
                                                  hiddenName : 'idobj',
                                                  fieldLabel: '<b>Objetivo Estrategico (*)</b>',
                                                  labelWidth:200,
                                                  width:700,
                                                  colspan:4,
                                                  padding:10,
                                                  allowBlank: false,
                                                  emptyText : 'Seleccione un objetivo',
                                                  listeners: {
                                                 change: function(field, newVal, oldVal) {
                                                          Ext.getCmp('indicadorid').clearValue();
                                                           storeIndicadores.clearFilter();
                                                           storeIndicadores.load({params:{idobj:newVal}});
                                                          
                                                           }
                                                       }
                                              }, 
                                              {
                                                  xtype : 'combo',
                                                  id : 'indicadorid',
                                                  store : storeIndicadores,
                                                  displayField:'indicador',
                                                  forceSelection : false,
                                                  triggerAction : 'all',
                                                  queryMode:'local',
                                                  disabled:false,
                                                  selectOnFocus : false,
                                                  valueField:'indicadorid',
                                                  hiddenName : 'indicadorid',
                                                  fieldLabel: '<b>Indicador (*)</b>',
                                                  labelWidth:200,
                                                  width:700,
                                                  colspan:4,
                                                  padding:10,
                                                  allowBlank: false,
                                                  emptyText : 'Seleccione un indicador',
                                                  listeners: {
                                                 change: function(field, newVal, oldVal) {
                                                            storeIniciativa.load({params:{idI:newVal}});
                                                           }
                                                       }
                                              },                                                                                               
    formIniciativas
    ]
 });


 

 var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE PLAN DE ESTRATEGIAS [ Iniciativas ] ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                  defaults:{
                            frame:false,
                            border: false,
                            style: 'margin: 10px 10px 10px 10px;'

                        },                    
                    items    :[
                    panel_medio,
                    gridIniciativa
                    ],
                    renderTo:'contenido-iniciativas',
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

Ext.onReady(form_iniciativa.Panel.init,form_iniciativa.Panel);
