Ext.ns('form_metas');

form_metas.Panel={
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
     {name:'iniciativa', type:'string'}    
    ],
    idProperty:'company'
  });

  Ext.define('cargoModel',{
      extend:'Ext.data.Model',
      fields:[
        {name:'idcargo', type:'int'},
        {name:'cargo', type:'string'}
      ],
      idProperty:'company'
  });


Ext.define('actividadModel',{
    extend:'Ext.data.Model',
    fields:[
      {name:'idactividad',type:'int'},
      {name:'idcargo', type:'int'},
      {name:'actividad',type:'string'},
      {name:'resultadoE', type:'string'},
      {name:'medioV', type:'string'},
      {name:'recursosF', type:'string'},
      {name:'fechaI', type:'string'},
      {name:'fechaF',type:'string'},
      {name:'cargo', type:'string'},
      {name:'observacionA', type:'string'}

    ],
    idProperty:'company'
});


Ext.define('ResultadosMetaModel',{
    extend:'Ext.data.Model',
    fields:[
      {name:'idresultadometa',type:'int'},
      {name:'idmetaO', type:'int'},
      {name:'anioctrol',type:'int'},
      {name:'t1', type:'int'},
      {name:'t2', type:'int'},
      {name:'t3', type:'int'},
      {name:'t4', type:'int'}


    ],
    idProperty:'company'
});



Ext.define('AniosModel',{
      extend:'Ext.data.Model',
      fields:[
        {name:'anioctrol',type:'int'},
        {name:'anio', type:'string'}
       ],
       idProperty:'company'
  }); 


 Ext.define('MetaModel',{
    extend:'Ext.data.Model',
    fields:[
     {name:'idmetaO', type:'int'},
     {name:'metaO', type:'string'}    
    ],
    idProperty:'company'
  });



/***** store ******/


var storeAnios=Ext.create('Ext.data.JsonStore',{
  model:'AniosModel',
   proxy:{
                type:'ajax',
                url:'procesos/anios_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});



var storeResultadosMetas=Ext.create('Ext.data.JsonStore',{
  model:'ResultadosMetaModel',
   proxy:{
                type:'ajax',
                url:'procesos/resultadosMetas_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});




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



var storeMetaO=Ext.create('Ext.data.JsonStore',{
   model:'MetaModel',
   proxy:{
           type:'ajax',
           url:'procesos/metas_json.php',
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

 var storeActividad=Ext.create('Ext.data.JsonStore',{
 model:'actividadModel',
 proxy:{
          type:'ajax',
          url:'procesos/actividades_json.php',
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


var smActividades=new Ext.selection.CheckboxModel({
       listeners:{
              selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];
                    if(record!=undefined){
                       var idi=record.get('idactividad');
                       if(idi!=0){
                        form_metas.getForm().loadRecord(record);
                       }

                    }
              }
       }
});

var smResultadosMetas=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     
                     var idR=record.get('idresultadometa');
                    if(idR!=0){
                     form_resultadosMetas.getForm().loadRecord(record);
                                         
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



  form_metas=Ext.widget('form',{

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
                                 id:'idactividad',
                                 colspan:6,
                                 name:'idactividad',
                                 value:0                 
                                                    
                                },
                                {
                                  html:'<img src="../../recursos/img/metasO.png" width="100" height="75">',
                                  colspan:2,
                                  border:false
                                },
                                {
                                 xtype:'hiddenfield',
                                 colspan:4
                                                    
                                }, 
                               {
                                 xtype:'textareafield',
                                 id:'actividad',
                                 fieldLabel:'<b>Actividad</b>',
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
                                  id : 'idcargo',
                                 store : storeCargos,
                                  displayField:'cargo',
                                 forceSelection : false,
                                 triggerAction : 'all',
                                 queryMode:'local',
                                 disabled:false,
                                 selectOnFocus : false,
                                 valueField:'idcargo',
                                 hiddenName : 'idcargo',
                                 fieldLabel: '<b>Cargo de Responsable</b>',
                                 labelWidth:200,
                                 width:600,
                                 colspan:4,
                                 allowBlank: false,
                                 emptyText : 'Seleccione un cargo',
                                 listeners: {
                                             change: function(field, newVal, oldVal) {
                                                        // storeUnidades.load({params:{ida:newVal}})
                                                           }
                                                       }
                                              
                            },
                               {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                                                    
                                }, 
                                {
                                 xtype:'textareafield',
                                 id:'resultadoE',
                                 fieldLabel:'<b>Resultado esperado</b>',
                                 labelWidth:200,
                                 allowBlank:false,
                                 colspan:4,
                                 width:600
                                }                                                          
                                ,
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                },                            
                                {
                                  xtype:'textareafield',
                                  id:'medioV',
                                  fieldLabel:'<b>Medio de verificacion</b>',
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
                                xtype: 'numberfield',
                                id:'recursosF',
                                width:400,
                                labelWidth:200,
                                fieldLabel:'<b> Recursos financiero ($) </b>',
                                hideTrigger: false,
                                keyNavEnabled: true,
                                mouseWheelEnabled: true,
                                allowBlank:false,
                                colspan:6,
                                minValue:0
                                } ,                                                               
                                {
                                 xtype: 'datefield',
                                fieldLabel: '<b>Fecha de Inicio</b>',
                                id: 'fechaI',
                                format: 'd/m/Y',
                                colspan:6,
                                name: 'fechaI',
                                allowBlank: false,
                                labelWidth:200,
                               },
                               {
                                 xtype: 'datefield',
                                fieldLabel: '<b>Fecha de Finalizacion</b>',
                                id: 'fechaF',
                                format: 'd/m/Y',
                                labelWidth:200,
                                colspan:6,
                                name: 'fechaF',
                                allowBlank: false
                              },
                                {
                                  xtype:'textareafield',
                                  id:'observacionA',
                                  fieldLabel:'<b>Observaciones</b>',
                                  labelWidth:200,
                                  allowBlank:false,
                                  colspan:6,
                                  width:600
                                }                 
                        
                        ],

                        buttons:[
                        {
                          text:'<b>Limpiar Formulario</b>',
                          width:175,
                             handler:function(){
                                  this.up('form').getForm().reset();
                                  
                             }
                        },                       

                          {
                            text:'<b>Registrar</b>',
                            iconCls:'icon-OK',
                            width:175,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){
                                      var accion=Ext.getCmp('idactividad').getValue();
                                      var post_actividad=Ext.getCmp('actividad').getValue();
                                      var post_resultadoE=Ext.getCmp('resultadoE').getValue();
                                      var post_medioV=Ext.getCmp('medioV').getValue();
                                      var post_financiero=Ext.getCmp('recursosF').getValue();
                                      var post_cargo=Ext.getCmp('idcargo').getValue();
                                      var post_observacion=Ext.getCmp('observacionA').getValue();
                                      var post_fechai=Ext.util.Format.date(Ext.getCmp('fechaI').getValue(),'Y-m-d');
                                      var post_fechaf=Ext.util.Format.date(Ext.getCmp('fechaF').getValue(),'Y-m-d');
                                      var post_idiniciativa=Ext.getCmp('idiniciativa').getValue();



                                       if(accion==0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_actividad.php?actividad='+post_actividad+'&resultado='+post_resultadoE+'&medio='+post_medioV+'&financiero='+post_financiero+'&cargo='+post_cargo+'&observacion='+post_observacion+'&fechai='+post_fechai+'&fechaf='+post_fechaf+'&iniciativaid='+post_idiniciativa,
                                                           method:'POST',
                                                           success:function(result,request){
                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;
                                                                    if (bandera==1) {
                                                                        var id=Ext.getCmp('idiniciativa').getValue();
                                                                        storeActividad.load({params:{idA:id}});
                                                                        storeMetaO.load({params:{idI:id}});



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
                                                     else
													 {//actualizacion
                                                      var post_idactividad=Ext.getCmp('idactividad').getValue();
                                                      

                                                      Ext.Ajax.request({
                                                       url:'procesos/modificar_actividad.php?actividad='+post_actividad+'&resultado='+post_resultadoE+'&medio='+post_medioV+'&financiero='+post_financiero+'&cargo='+post_cargo+'&observacion='+post_observacion+'&fechai='+post_fechai+'&fechaf='+post_fechaf+'&iniciativaid='+post_idiniciativa+'&idactividad='+post_idactividad,
                                                       method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                                                             if (bandera==1) {
                                                                                                        var idAc=Ext.getCmp('idiniciativa').getValue();
                                                                                                        storeActividad.load({params:{idA:idAc}});
                                                                                                                                                                                  
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



  form_resultadosMetas=Ext.widget('form',{

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
                                 id:'idresultadometa',
                                 colspan:6,
                                 name:'idresultadometa',
                                 value:0                 
                                                    
                                }
                                                             
                          

                                ,
                               {
                                  xtype : 'combo',
                                  id : 'anioctrol',
                                 store : storeAnios,
                                  displayField:'anio',
                                 forceSelection : false,
                                 triggerAction : 'all',
                                 queryMode:'local',
                                 disabled:false,
                                 selectOnFocus : false,
                                 valueField:'anioctrol',
                                 hiddenName : 'anioctrol',
                                 fieldLabel: '<b>Año(*)</b>',
                                 labelWidth:200,
                                 width:400,
                                 colspan:4,
                                 allowBlank: false,
                                 emptyText : 'Seleccione un año',                                                                 
                              },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                                                    
                                },                             
                            
                               {
                                xtype: 'numberfield',
                                id:'t1',
                                width:300,
                                fieldLabel:'Primer trimestre',
                                labelWidth:200,
                                height:'100%',
                                hideTrigger: false,
                                keyNavEnabled: true,
                                mouseWheelEnabled: true,
                                colspan:4,
                                allowBlank:false
                                                       
                                }                                                          
                                ,
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                },                            
                                {
                                xtype: 'numberfield',
                                id:'t2',
                                width:300,
                                height:'100%',
                                labelWidth:200,
                                fieldLabel:'Segundo trimestre',
                                hideTrigger: false,
                                keyNavEnabled: true,
                                mouseWheelEnabled: true,
                                allowBlank:false,
                                colspan:4,                                

                                },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                },
                                {
                                xtype: 'numberfield',
                                id:'t3',
                                width:300,
                                height:'100%',
                                labelWidth:200,
                                fieldLabel:'tercer trimestre',
                                hideTrigger: false,
                                keyNavEnabled: true,
                                mouseWheelEnabled: true,
                                colspan:4, 
                                allowBlank:false                                 
                                },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                }                                          
                                ,
                                {
                                 xtype: 'numberfield',
                                id:'t4',
                                width:300,
                                height:'100%',
                                labelWidth:200,
                                fieldLabel:'cuarto trimestre',
                                hideTrigger: false,
                                keyNavEnabled: true,
                                mouseWheelEnabled: true,
                                colspan:4,
                                allowBlank:false
                               }
                                      
                        
                        ],

                        buttons:[
                        {
                          text:'<b>Limpiar Formulario</b>',
                          width:175,
                             handler:function(){
                                  this.up('form').getForm().reset();
                                  
                             }
                        },                       

                          {
                            text:'<b>Registrar</b>',
                            iconCls:'icon-OK',
                            width:175,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){
                                      var accion=Ext.getCmp('idresultadometa').getValue();
                                      var post_anio=Ext.getCmp('anioctrol').getValue();
                                      var post_meta=Ext.getCmp('idmetaO').getValue();
                                      var post_t1=Ext.getCmp('t1').getValue();
                                      var post_t2=Ext.getCmp('t2').getValue();
                                      var post_t3=Ext.getCmp('t3').getValue();
                                      var post_t4=Ext.getCmp('t4').getValue();

                                       if(accion==0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guarda_resultadosmetas.php?anio='+post_anio+'&idmeta='+post_meta+'&t1='+post_t1+'&t2='+post_t2+'&t3='+post_t3+'&t4='+post_t4,
                                                           method:'POST',
                                                           success:function(result,request){
                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;
                                                                    if (bandera==1) {
                                                                        var id=Ext.getCmp('idmetaO').getValue();
                                                                        storeResultadosMetas.load({params:{idM:id}});

                                                                          Ext.MessageBox.show({
                                                                              title:'Exito',
                                                                              msg:msj,
                                                                              width:400,
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
                                                                              title:'mas de un resultado',
                                                                              msg:msj,
                                                                              width:300,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });

                                                                      }


                                                              }//fin de success

                                                          });

                                                     }
                                                     else{//actualizacion
                                                      var post_idresultadometa=Ext.getCmp('idresultadometa').getValue();

                                                       Ext.Ajax.request({
                                                       url:'procesos/modificar_resultadosmetas.php?anio='+post_anio+'&idmeta='+post_meta+'&t1='+post_t1+'&t2='+post_t2+'&t3='+post_t3+'&t4='+post_t4+'&idR='+post_idresultadometa,
                                                       method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                                                             if (bandera==1) {
                                                                                                      var id=Ext.getCmp('idmetaO').getValue();
                                                                                                      storeResultadosMetas.load({params:{idM:id}});
                                                                                                                                                                                  
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Exito',
                                                                                                           msg:msj,
                                                                                                           width:300,
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
storeAnios.load();




var gridActividad=Ext.create('Ext.grid.Panel',{
  store:storeActividad,
  stateful:true,
  collapsible:false,
  selModel:smActividades,
  multiSelect:true,
  stateId:'stateGrid',
  title:'Metas operativas',
  height:200,
  width:'95%',
  columns:[
        {
          text:'IDACTIVIDAD',
          sortable:false,
          dataIndex:'idactividad',
          hidden:true
        },
        {
          text:'IDCARGO',
          sortable:false,
          dataIndex:'idcargo',
          hidden:true
        },
          {
          text:'<b> ACTIVIDAD OPERATIVA </b>',
          sortable:true,
          flex:1,
          dataIndex:'actividad'
           }
       ,
        {
        text:'<b>RESULTADO ESPERADO</b>',
        sortable:true,
        flex:1,
        dataIndex:'resultadoE'
        },
        {
          text:'<b>MEDIO VERIFICACION</b>',
          sortable:false,
          flex:1,
          dataIndex:'medioV'
        },
        {
          text:'<b>RECURSOS FINANCIEROS ($)</b>',
          sortable:true,
          flex:1,
          dataIndex:'recursosF'

        },
        {
          text:'<b>INICIO</b>',
          sortable:false,
          flex:1,
          dataIndex:'fechaI'
        },
        {
          text:'<b>FINALIZACION</b>',
          sortable:false,
          flex:1,
          dataIndex:'fechaF'
        },
        {
          text:'<b>CARGO RESPONSABLE</b>',
          sortable:false,
          flex:1,
          dataIndex:'cargo'
        },
        {
          text:'<b>OBSERVACIONES</b>',
          sortable:false,
          flex:1,
          dataIndex:'observacionA',
          hidden:true
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
                      Ext.MessageBox.confirm('Borrado de actividades','¿borrar los seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridActividad.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idactividad');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_actividad.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                    var idAc=Ext.getCmp('idiniciativa').getValue();
                                                                    storeActividad.load({params:{idA:idAc}});  
                                                                    form_metas.getForm().reset();                                                               
                                                                  }
                                                                  if (bandera==2||bandera==3) 
                                                                  {

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




var gridResultadosMetas=Ext.create('Ext.grid.Panel',{
  store:storeResultadosMetas,
  stateful:true,
  collapsible:false,
  selModel:smResultadosMetas,
  multiSelect:true,
  stateId:'stateGrid',
  title:'Resultados de metas operativas',
  height:200,
  width:'95%',
  columns:[
        {
          text:'IDRESULTADOMETA',
          sortable:false,
          dataIndex:'idresultadometa',
          hidden:true
        },
        {
          text:'IDMETAO',
          sortable:false,
          dataIndex:'idmetaO',
          hidden:true
        },
          {
          text:'<b> AÑO  </b>',
          sortable:true,
          flex:1,
          dataIndex:'anioctrol'
           }
       ,
        {
        text:'<b>Trimestre 1</b>',
        sortable:true,
        flex:1,
        dataIndex:'t1'
        },
        {
          text:'<b>Trimestre 2</b>',
          sortable:false,
          flex:1,
          dataIndex:'t2'
        },
        {
          text:'<b>Trimestre 3</b>',
          sortable:true,
          flex:1,
          dataIndex:'t3'

        },
        {
          text:'<b>Trimestre 4</b>',
          sortable:false,
          flex:1,
          dataIndex:'t4'
        }
      ],
        tbar:[
            '->','-',
                         
                    {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                id: 'btndeleterESULTADO',
                handler:function(){
                      Ext.MessageBox.confirm('Borrado de Resultados','¿borrar los seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridResultadosMetas.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idresultadometa');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_resultadosmetas.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                    var id=Ext.getCmp('idmetaO').getValue();
                                                                    storeResultadosMetas.load({params:{idM:id}});                                                                      
                                                                    form_resultadosMetas.getForm().reset();                                                               
                                                                  }
                                                                  if (bandera==2||bandera==3) 
                                                                  {

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
                                                            Ext.getCmp('idiniciativa').clearValue();
                                                            storeIniciativa.clearFilter();
                                                            storeIniciativa.load({params:{idI:newVal}});


                                                           }
                                                       }
                                              },
                                                       {
                                                               xtype:'combo',
                                                               id:'idiniciativa',
                                                               store:storeIniciativa,
                                                               displayField:'iniciativa',
                                                               forceSelection:false,
                                                               triggerAction:'all',
                                                               queryMode:'local',
                                                               disabled:false,
                                                               selectOnFocus:false,
                                                               valueField:'idiniciativa',
                                                               hiddenName:'idiniciativa',
                                                               fieldLabel:'<b> Iniciativa estrategica  </b>',
                                                               labelWidth:200,
                                                               width:700,
                                                               colspan:4,
                                                               allowBlank:false,
                                                               emptyText:'Selecciones iniciativa',
                                                               listeners:{
                                                                      change:function(field,newVal,oldVal)
                                                                      {
                                                                          Ext.getCmp('idcargo').clearValue();
                                                                          storeCargos.clearFilter();
                                                                          storeCargos.load({params:{idI:newVal}});
                                                                          storeActividad.load({params:{idA:newVal}});
                                                                          storeMetaO.load({params:{idI:newVal}});

                                                                      }
                                                               }
                                                        },    


    form_metas
    ]
 });



var panel_medio2=new Ext.Panel({
  id:'panelmedio2',
  name:'panelmedio2',
  width:'100%',
  collapsible:false,
  border:false,
    items:[ 
{
                                  xtype : 'combo',
                                  id : 'idmetaO',
                                 store : storeMetaO,
                                  displayField:'metaO',
                                 forceSelection : false,
                                 triggerAction : 'all',
                                 queryMode:'local',
                                 disabled:false,
                                 selectOnFocus : false,
                                 valueField:'idmetaO',
                                 hiddenName : 'idmetaO',
                                 fieldLabel: '<b>Meta Operativa</b>',
                                 labelWidth:200,
                                 width:600,
                                 colspan:6,
                                 allowBlank: false,
                                 emptyText : 'Seleccione una meta operativa',
                                 listeners: {
                                             change: function(field, newVal, oldVal) {
                                                        // storeUnidades.load({params:{ida:newVal}})
                                                        storeResultadosMetas.load({params:{idM:newVal}});
                                                           }
                                             }
                                              
                            },        
        form_resultadosMetas
     ]
   }); 

 var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE PLAN DE ESTRATEGIAS [ Actividades operativas ] ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                  defaults:{
                            frame:false,
                            border: false,
                            style: 'margin: 10px 10px 10px 10px;'

                        },                    
                    items    :[
                    panel_medio,
                    gridActividad,
                    panel_medio2,
                    gridResultadosMetas
                    ],
                    renderTo:'contenido-metas',
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

Ext.onReady(form_metas.Panel.init,form_metas.Panel);
