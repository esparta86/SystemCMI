Ext.ns('form_indicador');

form_indicador.Panel={
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


Ext.define('PeriodoModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idperiodo',type:'int'},
   {name:'periodo',type:'string'}
  ],
  idProperty:'company'
});



  Ext.define('IndicadorModel',{
  extend:'Ext.data.Model',
    fields:[
      {name:'idindicador', type:'int'},
      {name:'idperspectiva', type:'int'},
      {name:'idobj', type:'int'},
      {name:'idarea', type:'int'},
      {name:'correlativo', type:'int'},
      {name:'indicador', type:'string'},
      {name:'formulaI', type:'string'},
      {name:'unidadI', type:'string'},
      {name:'direccion',type:'int'},
      {name:'direccions', type:'string'},
      {name:'lineabase',type:'string'},
      {name:'checkbase', type:'int'},
      {name:'idperiodo',type:'int'},
      {name:'periodo',type:'string'},
      {name:'calculo', type:'int'}
      ],
      idProperty:'company'

  });

  Ext.define('controlModel',{
  extend:'Ext.data.Model',
    fields:[
          {name:'idcontrol', type:'int'},
          {name:'anioctrol', type:'int'},
          {name:'limitecontrol', type:'string'},
          {name:'observacioncontrol', type:'string'},
          {name:'meta', type:'string'},
          {name:'observacionmeta', type:'string'}
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

 Ext.define('AniosModel',{
      extend:'Ext.data.Model',
      fields:[
        {name:'anioctrol',type:'int'},
        {name:'anio', type:'string'}
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


var storePeriodo=Ext.create('Ext.data.JsonStore',{
  model:'IndicadorModel',
   proxy:{
                type:'ajax',
                url:'procesos/periodo_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});


storeControl=Ext.create('Ext.data.JsonStore',{
  model:'controlModel',
  proxy:{
          type:'ajax',
          url:'procesos/control_json.php',
          reader:{
              type:'json',
              root:'data'
          }
        }
});

var smControl=new Ext.selection.CheckboxModel({
      listeners:{
                  selectionchange:function(selectionModel,selected,options){
                     var record=selected[0];
                      if(record!=undefined){
                            var idc=record.get('idcontrol');
                            if(idc!=0){
                            formControl.getForm().loadRecord(record);                              

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
});
var smPerspectivas=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     var base=record.get('checkbase');
                     var direcc=record.get('direccion');
                     var idIn=record.get('idindicador');
                     var tipoCalculo=record.get('calculo');
                    if(idIn!=0){
                     formIndicadores.getForm().reset();
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
                     if(tipoCalculo==1)
                     {
                      Ext.getCmp('calculo').setValue({calculo:'1'});
                     }
                     if(tipoCalculo==2)
                     {
                      Ext.getCmp('calculo').setValue({calculo:'2'});
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

/**************** formularios *************************/

  formIndicadores=Ext.widget('form',{

                      layout:{
                               type:'table',
                               columns:4,
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
                            style: 'margin: 2px 10px 5px 10px;'

                        },
                        items:[
                                {
                                 xtype:'hiddenfield',
                                 id:'idindicador',
                                 colspan:4,
                                 name:'idindicador',
                                 value:0                 
                                                    
                                },
                                {
                                  html:'<img src="../../recursos/img/KPIs.png" width="100" height="75">',
                                  colspan:2,
                                  border:false
                                },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                    
                                }, 
                                {
                                xtype: 'numberfield',
                                id: 'correlativo',
                                colspan:4,
                                width:400,
                                fieldLabel:'Correlativo',
                                labelWidth:200,
                                name: 'correlativo',
                                maxValue: 20,
                                minValue: 1,
                                allowBlank: false
                                
                              },
                              {
                                 xtype:'textfield',
                                 id:'indicador',
                                 fieldLabel:'<b>Nombre del indicador</b>',
                                 labelWidth:200,
                                 allowBlank:false,
                                 colspan:4,
                                 width:600
                              },                              
                              {
                                 xtype:'textareafield',
                                 id:'formulaI',
                                 fieldLabel:'<b>Formula</b>',
                                 labelWidth:200,
                                 allowBlank:false,
                                 colspan:4,
                                 width:600
                              },
                              {
                                 xtype: 'checkboxfield',
                                 id: 'lineacheck', 
                                 name: 'lineacheck',                                
                                 boxLabel: '<b>¿Linea Base?</b>',
                                 inputValue: 'true',
                                 labelWidth:50,
                                 colspan:2,
                                 handler: function(field, value) {
                                  if (value) {
                                    Ext.getCmp('lineabase').setDisabled(false);
                                  } else {
                                    Ext.getCmp('lineabase').setDisabled(true);
                                    
                                  }            
                                }
                              },
                              {
                                 xtype:'textfield',
                                 id:'lineabase',
                                 allowBlank:false,
                                 labelWidth:50,
                                 colspan:2,
                                 width:300,
                                 disabled:true
                              },
                            {
                                  xtype : 'combo',
                                  id : 'idperiodo',
                                 store : storePeriodo,
                                  displayField:'periodo',
                                 forceSelection : false,
                                 triggerAction : 'all',
                                 queryMode:'local',
                                 disabled:false,
                                 selectOnFocus : false,
                                 valueField:'idperiodo',
                                 hiddenName : 'idperiodo',
                                 fieldLabel: '<b>Periocidad (*)</b>',
                                 labelWidth:200,
                                 width:400,
                                 colspan:4,
                                 value:1,
                                 allowBlank: false,
                                 emptyText : 'Seleccione un periodo',
                                 listeners: {
                                             change: function(field, newVal, oldVal) {
                                                         
                                                           }
                                                       }
                                              
                            },
                              {
                                 xtype:'textfield',
                                 id:'unidadI',
                                 allowBlank:false,
                                 fieldLabel:'Unidad de medida',
                                 labelWidth:200,
                                 colspan:4,
                                 width:300,
                                 disabled:false
                              },
                            {
                                xtype      : 'radiogroup',
                                fieldLabel : 'Direccionamiento.',
                                labelWidth:200,
                                id:'direccion',
                                allowBlank:false,
                                colspan:4,
                                columns:2,
                                bodyPadding:10,                                
                                width:400,
                                items:[
                                    {
                                        boxLabel  : '(+)',
                                        inputValue: '1',
                                        name:'direccion'
                                        
                                    },
                                    {
                                        boxLabel  : '(-)',
                                        name:'direccion',
                                        inputValue: '-1'
                                        
                                    }
                                ]
                               
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
                                 emptyText : 'Seleccione un area',
                                 listeners: {
                                             change: function(field, newVal, oldVal) {
                                                         
                                                           }
                                                       }
                                              
                            },
                            {
                                xtype      : 'radiogroup',
                                fieldLabel : 'Tipo de calculo: ',
                                labelWidth:200,
                                id:'calculo',
                                allowBlank:false,
                                colspan:4,
                                columns:1,
                                bodyPadding:10,                                
                                width:400,
                                items:[
                                    {
                                        boxLabel  : 'por promedio',
                                        inputValue: '1',
                                        name:'calculo'
                                        
                                    },
                                    {
                                        boxLabel  : 'por acumulacion',
                                        name:'calculo',
                                        inputValue: '2'
                                        
                                    }
                                ]
                               
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
                                        var accion=Ext.getCmp('idindicador').getValue();
                                        var post_idobj=Ext.getCmp('idobj').getValue();
                                        var post_corr=Ext.getCmp('correlativo').getValue();
                                        var post_indicador=Ext.getCmp('indicador').getValue();
                                        var post_formula=Ext.getCmp('formulaI').getValue();
                                        var post_idperiodo=Ext.getCmp('idperiodo').getValue();
                                        var post_unidad=Ext.getCmp('unidadI').getValue();
                                        var post_direccion=Ext.getCmp('direccion').getChecked()[0].getGroupValue();
                                        var post_calculo=Ext.getCmp('calculo').getChecked()[0].getGroupValue();
                                        var post_idarea=Ext.getCmp('idarea').getValue();
                                        var post_check=Ext.getCmp('lineacheck').getValue();
                                        var post_lineabase='';
                                        if(post_check){
                                              post_lineabase=Ext.getCmp('lineabase').getValue();
                                          }


                                        if(accion==0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_indicador.php?idarea='+post_idarea+'&idobj='+post_idobj+'&periodo='+post_idperiodo+'&correlativo='+post_corr+'&indicador='+post_indicador+'&formula='+post_formula+'&unidad='+post_unidad+'&direccion='+post_direccion+'&checkbase='+post_check+'&calculo='+post_calculo+'&lineab='+post_lineabase,
                                                           method:'POST',
                                                           success:function(result,request){
                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;
                                                                    if (bandera==1) {
                                                                        var idob=Ext.getCmp('idobj').getValue();
                                                                        storeIndicador.load({params:{idobj:idob}});
                                                                        storeIndicadores.clearFilter();
                                                                        Ext.getCmp('indicadorid').clearValue();                                                                     
                                                                        storeIndicadores.load({params:{idobj:idob}});

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
                                                      var post_idindicador=Ext.getCmp('idindicador').getValue();
                                                       Ext.Ajax.request({
                                                       url:'procesos/actualizar_indicador.php?idarea='+post_idarea+'&idobj='+post_idobj+'&periodo='+post_idperiodo+'&correlativo='+post_corr+'&indicador='+post_indicador+'&formula='+post_formula+'&unidad='+post_unidad+'&direccion='+post_direccion+'&checkbase='+post_check+'&lineab='+post_lineabase+'&idindicador='+post_idindicador+'&calculo='+post_calculo,
                                                       method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                                                             if (bandera==1) {
                                                                                                        var idob=Ext.getCmp('idobj').getValue();
                                                                                                        storeIndicador.load({params:{idobj:idob}});
                                                                                                                                                                                  
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



formControl=Ext.widget('form',{
                      layout:{
                               type:'table',
                               columns:4,
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
                            style: 'margin: 2px 10px 5px 10px;'
                        },
                        items:[
                                {
                                 xtype:'hiddenfield',
                                 id:'idcontrol',
                                 colspan:4,
                                 name:'idcontrol',
                                 value:0                 
                                                    
                                },
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
                                 emptyText : 'Seleccione un periodo',
                                 listeners: {
                                             change: function(field, newVal, oldVal) {
                                                         
                                                           }
                                                       }
                                              
                            },                                
                                
                              {
                                 xtype:'textfield',
                                 id:'limitecontrol',
                                 fieldLabel:'<b>Limite de control</b>',
                                 labelWidth:200,
                                 allowBlank:false,
                                 colspan:4,
                                 width:600
                              },                              
                              {
                                 xtype:'textareafield',
                                 id:'observacioncontrol',
                                 fieldLabel:'<b>Observacion limite</b>',
                                 labelWidth:200,
                                 allowBlank:true,
                                 colspan:4,
                                 width:600
                              },
                              {
                                 xtype:'textfield',
                                 id:'meta',
                                 allowBlank:false,
                                 fieldLabel:'Meta',
                                 labelWidth:200,
                                 colspan:4,
                                 width:600,
                                 
                              },
                              {
                                 xtype:'textareafield',
                                 id:'observacionmeta',
                                 allowBlank:true,
                                 labelWidth:200,
                                 fieldLabel:'Observacion de meta',
                                 colspan:4,
                                 width:600,
                                 
                              },                             
                            
                            
                                                                                                                                                                 

                                                        
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
                                    var accion=Ext.getCmp('idcontrol').getValue();
                                        var post_indicadorid=Ext.getCmp('indicadorid').getValue();
                                        var post_anioid=Ext.getCmp('anioctrol').getValue();
                                        var post_control=Ext.getCmp('limitecontrol').getValue();
                                        var post_obsctrol=Ext.getCmp('observacioncontrol').getValue();
                                        var post_meta=Ext.getCmp('meta').getValue();
                                        var post_obsmeta=Ext.getCmp('observacionmeta').getValue();
                                        if(accion==0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_control.php?anio='+post_anioid+'&control='+post_control+'&obsctrol='+post_obsctrol+'&meta='+post_meta+'&obsmeta='+post_obsmeta+'&idindicador='+post_indicadorid,
                                                           method:'POST',
                                                           success:function(result,request){
                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;
                                                                    if (bandera==1) {
                                                                        var idctrol=Ext.getCmp('indicadorid').getValue();
                                                                        storeControl.load({params:{id:idctrol}});
                                                                          Ext.MessageBox.show({
                                                                              title:'Exito',
                                                                              width:400,
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.INFO
                                                                          });
                                                                      }
                                                                      if(bandera==2){
                                                                          Ext.MessageBox.show({
                                                                              title:'Sin exito',
                                                                              msg:msj,
                                                                              width:400,
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
                                                       var post_idcontrol=accion;

                                                       
                                                       Ext.Ajax.request({
                                                       url:'procesos/modificar_control.php?anio='+post_anioid+'&control='+post_control+'&obsctrol='+post_obsctrol+'&meta='+post_meta+'&obsmeta='+post_obsmeta+'&idcontrol='+post_idcontrol,
                                                       method:'POST',
                                                                success: function(result,request){
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                                                             if (bandera==1) {
                                                                                                  var idctrol=Ext.getCmp('indicadorid').getValue();
                                                                                                  storeControl.load({params:{id:idctrol}});
                                                                                                                                                                                                                                                          
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Exito',
                                                                                                           msg:msj,
                                                                                                           width:400,
                                                                                                           buttons:Ext.MessageBox.OK,
                                                                                                           icon: Ext.MessageBox.INFO
                                                                                                           });
                                                                                                          }
                                                      
                                                                                                  if(bandera==2) { 
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Sin exito',
                                                                                                          width:400,
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
                                //this.up('window').destroy();

                                        
                              }//fin de valid
                              else{
                                Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                              }

                            }//fin del handler


                          }
                        

                        ]


                     });



storePerspectiva.load();
storePeriodo.load();
storeArea.load();
storeAnios.load();

var gridIndicadores=Ext.create('Ext.grid.Panel',{
  store:storeIndicador,
  stateful:true,
  collapsible:false,
  selModel:smPerspectivas,
  multiSelect:true,
  stateId:'stateGrid',
  //title:'Indicadores',
  height:200,
  width:'95%',
  columns:[
        {
          text:'IDPERSPECTIVA',
          sortable:false,
          dataIndex:'idperspectiva',
          hidden:true
        },
        {
          text:'TIPOCALCULO',
          sortable:false,
          dataIndex:'calculo',
          hidden:true
        },        
        {
          text:'IDOBJ',
          sortable:false,
          dataIndex:'idobj',
          hidden:true
        },
        {
          text:'DIRECCION',
          sortable:false,
          dataIndex:'direccion',
          hidden:true
        },
        {
          text:'AREA',
          sortable:false,
          dataIndex:'idarea',
          hidden:true
        },                
               
        {
          text:'<b> CORRELATIVO </b>',
          sortable:true,
          width:125,
          dataIndex:'correlativo'
           }
       ,{
          text:'IDINDICADOR',
          sortable:false,
          dataIndex:'idindicador',
          hidden:true
        },
        {
        text:'<b>INDICADOR</b>',
        sortable:true,
        flex:1,
        dataIndex:'indicador'
        },
        {
          text:'<b>FORMULA</b>',
          sortable:false,
          flex:1,
          dataIndex:'formulaI'
        },
        {
          text:'<b>DIRECCION</b>',
          sortable:true,
          width:100,
          renderer:changecolor,
          dataIndex:'direccions'
        },
        {
           text:'<b>UNIDAD MEDIDA</b>',
           sortable:false,
           flex:1,
           dataIndex:'unidadI'
        },
        {
          text:'LINEABASE',
          sortable:false,
          dataIndex:'checkbase',
          hidden:true
        },
        {
          text:'<B>LINEA BASE</B>',
          sortable:false,
          dataIndex:'lineabase',
          flex:1
        },
        {
          text:'<b>PERIOCIDAD</b>',
          sortable:true,
          dataIndex:'periodo',
          flex:1
        },
        {
          text:'IDPERIODO',
          sortable:false,
          dataIndex:'idperiodo',
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
                      Ext.MessageBox.confirm('Borrado de indicadores','¿borrar los seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridIndicadores.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idindicador');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_indicador.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                       var idob=Ext.getCmp('idobj').getValue();   
                                                                       storeIndicador.load({params:{idobj:idob}});
                                                                       storeIndicadores.clearFilter();
                                                                       Ext.getCmp('indicadorid').clearValue();                                                                        
                                                                       storeIndicadores.load({params:{idobj:idob}}); 

                                                                       formIndicadores.getForm().reset();                                                              
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



var gridControl=Ext.create('Ext.grid.Panel',{
 store:storeControl,
  stateful:true,
  collapsible:false,
  selModel:smControl,
  multiSelect:true,
  stateId:'stateGrid',
  title:'Controles',
  height:200,
  width:'95%',
  columns:[
        {
          text:'IDCONTROL',
          sortable:false,
          dataIndex:'idcontrol',
          hidden:true
        },
        {
          text:'<b> AÑO </b>',
          sortable:true,
          flex:1,
          dataIndex:'anioctrol'
           }
       ,{
          text:'LIMITE CONTROL',
          sortable:true,
          dataIndex:'limitecontrol',
          flex:1
        },
        {
        text:'<b>OBSERVACION CONTROL</b>',
        sortable:false,
        flex:1,
        dataIndex:'observacioncontrol'
        },
        {
          text:'<b> META </b>',
          sortable:true,
          flex:1,
          dataIndex:'meta'
        },
        {
           text:'<b>OBSERVACION META</b>',
           sortable:false,
           flex:1,
           dataIndex:'observacionmeta'
        }
      ],
        tbar:[
            '->','-',
                         
                    {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                id: 'btndeletecontrol',
                handler:function(){
                      Ext.MessageBox.confirm('Borrado de controles','¿borrar los seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridControl.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idcontrol');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_control.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                  var idctrol=Ext.getCmp('indicadorid').getValue();
                                                                  storeControl.load({params:{id:idctrol}}); 
                                                                  formControl.getForm().reset();                                                                      
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
                                                  width:600,
                                                  colspan:4,
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
                                                  width:600,
                                                  colspan:4,
                                                  allowBlank: false,
                                                  emptyText : 'Seleccione un objetivo',
                                                  listeners: {
                                                 change: function(field, newVal, oldVal) {
                                                          Ext.getCmp('lineacheck').reset();
                                                           storeIndicador.load({params:{idobj:newVal}})
                                                           storeIndicadores.clearFilter();
                                                           Ext.getCmp('indicadorid').clearValue();
                                                           storeIndicadores.load({params:{idobj:newVal}});
                                                           storeControl.load({params:{id:0}});
                                                           }
                                                       }
                                              },     
    formIndicadores
    ]
 });


 var panel_bajo=new Ext.Panel({
  id:'panel_bajo',
  name:'panel_bajo',
  width:'100%',
  collapsible:false,
  border:false,
    items:[
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
                                                  fieldLabel: '<b>Indicadores(*)</b>',
                                                  labelWidth:200,
                                                  width:600,
                                                  colspan:4,
                                                  allowBlank: false,
                                                  emptyText : 'Seleccione un indicador',
                                                  listeners: {
                                                 change: function(field, newVal, oldVal) {
                                                    storeControl.load({params:{id:newVal}});
                                                           }
                                                       }
                                              
                                              },formControl 
    ]

 });

 var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE PLAN DE ESTRATEGIAS [ Indicadores ] ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                  defaults:{
                            frame:false,
                            border: false,
                            style: 'margin: 10px 10px 10px 10px;'

                        },                    
                    items    :[
                    panel_medio,
                    gridIndicadores,
                    panel_bajo,
                    gridControl                                
 
                    ],
                    renderTo:'contenido-indicadores',
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

Ext.onReady(form_indicador.Panel.init,form_indicador.Panel);
