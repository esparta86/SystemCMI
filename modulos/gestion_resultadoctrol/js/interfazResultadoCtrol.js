Ext.ns('form_resultados');

form_resultados.Panel={
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

  Ext.define('IndicadoresModel',{
      extend:'Ext.data.Model',
      fields:[
        {name:'indicadorid',type:'int'},
        {name:'indicador', type:'string'}
       ],
       idProperty:'company'
  });

  Ext.define('controlesModel',{
    extend:'Ext.data.Model',
    fields:[
     {name:'idcontrol', type:'int'},
     {name:'control', type:'string'}    
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




var storeControl=Ext.create('Ext.data.JsonStore',{
   model:'controlesModel',
   proxy:{
           type:'ajax',
           url:'procesos/control_json.php',
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
                        form_resultados.getForm().loadRecord(record);
                       }

                    }
              }
       }
});

/**************** formularios *************************/

Ext.define('Ext.ux.FormControl',{
  extend:'Ext.form.Panel',
  initComponent:function()
    {
      Ext.apply(this,{
        autoScroll:true,
        border:false,
        items:[
                {
                   xtype:'form',
                   id:'formControl',
                   padding:10,
                   items:[
                          {
                        padding:5,
                        html:'<font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:14px;">Ud. Ingresara los resultados alcanzados para el control seleccionado <br> '+
                         ' los resultados se muestran de acuerdo a la periocidad segun el indicador </font>',
                        width:'70%',
                        height:80,
                        border:false                            
                          }
                         ]
                }

              ]
      });/*fin de apply*/

      this.callParent(arguments);


    }/*fin de init component*/
    ,
    set_control:function(idcontrol){
       this.loadComponentes(idcontrol);
    },
    loadComponentes:function(idcontrol){
        Ext.Ajax.request
                  ({
                      url:'procesos/componentes_json.php?idC='+idcontrol,
                      reader:{
                                type:'json',
                                root:'data'
                             },
                            success:this.onLoad,
                            scope:this          
                  });      

    },
    onLoad:function(response)
    {
      var jsonResponse=Ext.decode(response.responseText);
      if(jsonResponse.success)
         {

                    panel=Ext.create('Ext.panel.Panel', 
                                   {
                                      width: '80%',
                                      defaults: {
                                              frame:false,
                                              height: 25,
                                              border: true,
                                              style: 'margin: 10px 10px 3px 5px;'
                                                },
                                      layout: 
                                       {
                                         type: 'table',
                                         columns: 2, 
                                         tdAttrs: 
                                          {
                                           valign: 'middle'
                                          }
                                       }
                                    });

                  var elementos=jsonResponse.data.length;

                  for(var i=0;i<elementos;i++)
                  {
                    resultados=jsonResponse.data[i];
                    panel.add(
                              
                               {
                                        xtype: 'numberfield',
                                        id:'C_'+resultados.correlativo,
                                        name:'C_'+resultados.correlativo,
                                        value:''+resultados.correlativo,
                                        fieldLabel:'<b>Correlativo :</b>',
                                        colspan:1,
                                        width:200,
                                        maxValue: 100,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        minValue: 1,
                                        readOnly:true,
                                        allowBlank:true
                                        


                                },
                                {
                                   xtype:'textfield',
                                   id:'R_'+resultados.correlativo,
                                   name:'R_'+resultados.correlativo,
                                   fieldLabel:'<b>Alcanzado :</b>',
                                   value:''+resultados.resultado,
                                   allowBlank:false,
                                   colspan:1,
                                   width:300
                                }                                
                            );  

                        
                            
                  }

                  panel.add(
                                {
                                 xtype: 'button',
                                 text: '<b>REGISTRAR</b>',
                                 iconCls: 'icon-OK',
                                 width:200,
                                 colspan:2,
                                  handler:function(){
                                        this.submit_formulario(jsonResponse);

                                   },scope:this

                                                                                                
                               }
                                                              
                                                            
                          );     
                          this.add(panel);             


         }/*fin de exito*/
    },
    submit_formulario:function(jsonResponse)
    {
       var longitud=jsonResponse.data.length, resultado;
       var verificar=true;
       var myResultados=new Array();
       for (var i = 0; i < longitud; i++) 
            {
             resultado=jsonResponse.data[i];
             myResultados[i]=Ext.getCmp('C_'+resultado.correlativo).getValue()+'_'+Ext.getCmp('R_'+resultado.correlativo).getValue();
             var validar=Ext.getCmp('R_'+resultado.correlativo).getValue();            
                if(validar==null||validar==0)
                {
                  verificar=false;
                }
            }

            if(verificar==true)
            {/*enviar*/
              var post_resultados=Ext.encode(myResultados);
              var post_idcontrol=Ext.getCmp('idcontrol').getValue();

                  Ext.Ajax.request({
                  url:'procesos/guardar_resultadocontrol.php?idcontrol='+post_idcontrol+'&resultadosControl='+post_resultados,
                  method:'POST',
                        success: function(result,request){
              
                                     var jsonData=JSON.parse(result.responseText);
                                                          var bandera=jsonData[0].bandera;
                                                          var msj=jsonData[0].msg;
              
                                                     if (bandera==1) {
                                                                  
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
                                                              
                           } //fin de failure         
              
              
                  });//fin de request
              

            }else{/*no enviar*/
 
 Ext.MessageBox.show({
                      title:'status',
                      msg:'Por favor complete el formulario.',
                      buttons:Ext.MessageBox.OK,
                      icon: Ext.MessageBox.INFO
                     });               

            }

    }

});


storePerspectiva.load();


 var  panel_control=new Ext.Panel({
   id:'panelcontrol',
   name:'panelcontrol',
   width:'100%',
   collapsible:false,
   border:false,
   items:[

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
                                                            Ext.getCmp('idcontrol').clearValue();
                                                            storeControl.clearFilter();
                                                            storeControl.load({params:{idI:newVal}});


                                                           }
                                                       }
                                              },
                                                       {
                                                               xtype:'combo',
                                                               id:'idcontrol',
                                                               store:storeControl,
                                                               displayField:'control',
                                                               forceSelection:false,
                                                               triggerAction:'all',
                                                               queryMode:'local',
                                                               disabled:false,
                                                               selectOnFocus:false,
                                                               valueField:'idcontrol',
                                                               hiddenName:'idcontrol',
                                                               fieldLabel:'<b> Controles  </b>',
                                                               labelWidth:200,
                                                               width:700,
                                                               colspan:4,
                                                               allowBlank:false,
                                                               emptyText:'Seleccione un control',
                                                               listeners:{
                                                                      change:function(field,newVal,oldVal)
                                                                      {
                                                                         panel_control.removeAll(true);
                                                                         var formulario= new Ext.ux.FormControl();
                                                                         formulario.set_control(newVal);
                                                                         panel_control.add(formulario);
                                                                         panel_control.doLayout();
                                                                         panel_control.update();

                                                                      }
                                                               }
                                                        }, 
                                                        panel_control   


    
    ]
 });


 

 var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE PLAN DE ESTRATEGIAS [ Resultados - control ] ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                  defaults:{
                            frame:false,
                            border: false,
                            style: 'margin: 10px 10px 10px 10px;'

                        },                    
                    items    :[
                    panel_medio
                   // gridActividad
                    ],
                    renderTo:'contenido-resultados',
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

Ext.onReady(form_resultados.Panel.init,form_resultados.Panel);
